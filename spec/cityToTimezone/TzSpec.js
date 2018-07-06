describe("cityToTimezone", () => {

    let { cityToTimezoneId } = require('../../cityToTimezone');
    let unexpectedPromiseResolve = new Error('Promise should not be resolved');

    it("should throw if city is wrong", (done) => {
        let promise = cityToTimezoneId('Bолга');
        promise.then(() => done(unexpectedPromiseResolve), err => done());
    });

    it("should throw if no results", (done) => {
        let promise = cityToTimezoneId('Что');
        promise.then(() => done(unexpectedPromiseResolve), err => done());
    });

    it("should not throw for kind=locality", async () => {
        let tzId = await cityToTimezoneId('Киев');
        expect(tzId).toBe('Europe/Kiev');
    });
});
