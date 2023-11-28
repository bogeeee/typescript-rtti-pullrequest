import 'reflect-metadata'
import { matchesValue } from '../../../matchesValueLib';
import { describe, it,test, beforeEach,expect } from "@jest/globals";
import { ReflectedTypeRef, ReflectedClass, reflect } from "typescript-rtti";

describe('matchesValue', () => {
  test('should match reflected value', () => {
    const reflected = reflect<string>();
    const value = 'test';
    const result = matchesValue(reflected, value);
    expect(result).toBe(true);
  });

  test('should not match reflected value', () => {
    const reflected = reflect<number>();
    const value = 'test';
    const result = matchesValue(reflected, value);
    expect(result).toBe(false);
  });

  test('should match reflected class', () => {
    class TestClass { }
    const reflected = reflect<TestClass>();
    const value = new TestClass();
    const result = matchesValue(reflected, value);
    expect(result).toBe(true);
  });

  test('should not match reflected class', () => {
    class TestClass { }
    class OtherClass { }
    const reflected = reflect<TestClass>();
    const value = new OtherClass();
    const result = matchesValue(reflected, value);
    expect(result).toBe(false);
  });

  test('should handle options argument', () => {
    const reflected = reflect<string>();
    const value = 'test';
    const options = { ignoreAdditionalProperties: true };
    const result = matchesValue(reflected, value, options);
    expect(result).toBe(true);
  })
});
