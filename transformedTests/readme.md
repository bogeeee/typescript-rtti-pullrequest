Tests, for which the code has type information transformed in. This way, it's much easier to write mass tests for the validator.
i.e.
````typescript
class A { // This class will be enhanced with type info
    foo() { return true ? 123 : 'foo'; }
}
expect( reflect(A).getMethod('foo').returnType.isUnion() ).to.be.true
````

Currently, it uses the published typescript-rtti package from npm.

TODO: Try to set it up as a monorepo (currently this fails because the code gets compiled to ../dist/transfomer and we get an error during the tspc run if we point the transformer to there. Propably there are some parent files missing. 
  Sub-TODO: Set up the whole project to compile in-place (at least the dist dir) which would imho be the best for debugging. think of source maps and other stuff that have all these pointing back and forth issues. Or at least make the package.json match the published one as close as possible.
