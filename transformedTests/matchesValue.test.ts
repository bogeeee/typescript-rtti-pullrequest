import 'reflect-metadata'
import { expect } from "chai";
import { describe, it,test, beforeEach } from "@jest/globals";
import {reflect} from "typescript-rtti";
import {matchesValue} from "./matchesValueLib";

beforeEach( () => {
   // Check that type info is available
   class A {}
   if(!isTypeInfoAvailable(A)) {
       throw new Error("Type info is not available. Please make sure this this test.ts file is transformed, before run.")
   }

});

describe("Examples from main readme.md", () => {
    // Examples from ../readme.md#checking-the-type-of-a-value-at-runtime:
    interface A {
        foo: string;
        bar: number;
        baz?: string;
    }
    it("should not match an object that does not have all required properties", () => {
        expect(reflect<A>().matchesValue({ foo: 'hello' })).to.be.false // false
    })
    it("should match an object that does not have all minimum  required properties", () => {
        expect(reflect<A>().matchesValue({foo: 'hello', bar: 123})).to.be.true
    });
    it("should match another object that does not have all required properties", () => {
        expect(reflect<A>().matchesValue({foo: 'hello', bar: 123, baz: 'world'})).to.be.true
    });
    it("should not match when foo has the wrong type (number instead of string) but the rest is correct", () => {
        expect(reflect<A>().matchesValue({foo: 123, bar: 'hello'})).to.be.false
    });
    it("shold not match an empty object", () => {
        expect(reflect<A>().matchesValue({ })).to.be.false
    });
})

describe("matches value", () => {
    it("should match a simple object", () => {
        expect(reflect({}).matchesValue({})).to.be.true
    })
})

describe("matchesValue function from matchesValueLib", () => {
    it("should match a simple object", () => {
        expect(matchesValue(reflect({}), {})).to.be.true
    })


    // Examples from ../readme.md#checking-the-type-of-a-value-at-runtime:
    interface A {
        foo: string;
        bar: number;
        baz?: string;
    }
    it("should not match an object that does not have all required properties", () => {
        expect(matchesValue(reflect<A>(),{ foo: 'hello' })).to.be.false // false
    })
    it("should match an object that does not have all minimum  required properties", () => {
        expect(matchesValue(reflect<A>(),{foo: 'hello', bar: 123})).to.be.true
    });
    it("should match another object that does not have all required properties", () => {
        expect(matchesValue(reflect<A>(),{foo: 'hello', bar: 123, baz: 'world'})).to.be.true
    });
    it("should not match when foo has the wrong type (number instead of string) but the rest is correct", () => {
        expect(matchesValue(reflect<A>(),{foo: 123, bar: 'hello'})).to.be.false
    });
    it("shold not match an empty object", () => {
        expect(matchesValue(reflect<A>(),{ })).to.be.false
    });

})


function isTypeInfoAvailable(value: object) {
    const r = reflect(value);

    // *** Some heuristic checks: (the rtti api currently has no really good way to check it)
    // TODO: improve checks for security reasons !

    /*
    if(r.methods.length === 0) {
        return false;
    }
    // Still this check was not enough because we received  the methods of the prototype
    */

    if (r.getProperty("xxyyyyzzzzzdoesntExist") !== undefined) { // non existing property reported as existing ?
        return false;
    }

    return true
}
