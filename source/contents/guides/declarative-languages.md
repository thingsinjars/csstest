---
template: layout.jade
section: guides
---

## Testing declarative languages

Unlike most other web technologies you may use (JS, PHP, Ruby, etc.), CSS is a [declarative language](http://en.wikipedia.org/wiki/Declarative_programming).

### Imperative

With an imperative or procedural language, the developer is essentially telling the computer what to do, "I give you this number, you add two to it, give me the result". This approach lends itself well to creating small, testable little units where the developer can modify the input, measure the output and as long as the thing that comes out is what was expected, the test passes. The developer can have confidence the code inside is doing its job.

### Declarative

With a declarative language such as CSS or HTML, the developer says "This is what I want out. I don't care how you make it happen". If you ask for an element to be blue, you're not explicitly giving the computer instructions on how to make that element blue, you just want it to be blue. The bits that would be testable in a traditional sense are the bits covered by the browser's internals.

### Change the focus

It is not, however, impossible to test declarative languages, it just means we need to be a bit cunning about what we're testing. The [techniques listed](/techniques/) cover a variety of methods. Some test the rules of the cascade and precedence, some compare purely visual output.