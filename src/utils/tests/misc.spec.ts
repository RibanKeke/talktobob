import { rangeStep } from "../misc";

describe('Test rangeStep', () => {
    const minError = 'Error: rangeStep - min 6 > max 3'
    test('SHOULD FAIL: Should fail min > max', () => {
        let err:Error;
        try {
            const range = rangeStep(6,3,1);
            console.log(range);
        } catch (error) {
            err = error;
        }
        expect(err.message).toEqual(minError)
    });

    test('SHOULD FAIL: Should succeed', () => {
        const range = rangeStep(1,6,2);
        expect(range).toEqual([1,3,5])
    });
});