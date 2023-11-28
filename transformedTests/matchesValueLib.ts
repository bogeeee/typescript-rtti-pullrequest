import {reflect, ReflectedTypeRef, ReflectedClass} from "typescript-rtti";
// This exports the functions for pythagora

/**
 *
 * See ../readme.md#checking-the-type-of-a-value-at-runtime
 * @param reflected something that was created with reflect<SomeType>() or reflect(someValue)
 * @param value value that is checked, if it matches reflected
 * @param options
 */
export function matchesValue(reflected: ReflectedTypeRef<any> |  ReflectedClass<any>, value: unknown, options?) {
    return reflected.matchesValue(value, options)
}
