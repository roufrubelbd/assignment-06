## README file to answer the following question

1. What is the difference between var, let, and const?
   Ans:
   var : function-scoped, re-declarable.  
   let : block-scoped, re-assignable, not re-declarable.  
   const : block-scoped, cannot be re-assigned.
   example:
   var a = 10;  
   let b = 20;  
   const c = 30;

2. What is the difference between map(), forEach(), and filter()?
   Ans:
   map() : returns a new array .

forEach() : loops through but returns undefined.

filter() : returns a new array with elements that match a condition.
example:
[1,2,3].map(x => x*2);  
[1,2,3].forEach(x => x*2); // returns undefined
[1,2,3].filter(x => x>1);

3. What are arrow functions in ES6?
   Ans: Shorter syntax for functions.
   example:
   const add = (a,b) => a+b;  
   console.log(add(2,3));

4. How does destructuring assignment work in ES6?
   Ans:
   Extracts values from arrays/objects into variables.

example:
const [x,y] = [1,2];  
const {name, age} = {name:"Ali", age:25};

5. Explain template literals in ES6. How are they different from string concatenation?
   Ans:
   Use backticks (`), and multi-line strings.
example: const name = "Ali";
console.log(`Hello, ${name}!`);
