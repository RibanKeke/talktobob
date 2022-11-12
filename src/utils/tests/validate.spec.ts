import { type } from "superstruct";
import { CustomError } from "../error";
import { genericPattern, validateStruct } from "../validate";


describe('Test generic pattern validator', () => {
    const testPattern = /^[0-9]*$/;
    const testStruct = type({
        month: genericPattern(testPattern)
    })
    test('SHOULD PASS: Expect valid month', () => {
        const valid = validateStruct({month:"05"},testStruct,'test');
        expect(valid.month).toEqual("05");
    });
});

describe('Test validateStruct properties mask', () => {
    const pattern = /^(0[1-9]|1[0-2])$/;
    const testStruct = type({
        month: genericPattern(pattern),
        days: genericPattern(pattern)
    })
    test('SHOULD FAIL: Property missing', () => {
        let err:CustomError = undefined;
        try {
            validateStruct({month:"05", day:"Today"},testStruct,'test'); 
        } catch (error) {
            err = error;
        }
        expect(err.name).toEqual("ValidationError"); 
    });
});