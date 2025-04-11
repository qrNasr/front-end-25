// JavaScript's prototypal inheritance system, which is fundamental to how objects reuse properties and methods. Before ES6 classes, this was the primary way to achieve inheritance. Understanding it is crucial even when using modern class syntax, as classes are largely built upon this prototype mechanism.

// Core Concepts:

// Every object has an internal [[Prototype]] link: This link points to another object (or null). Think of it as a reference to its "parent" or "template" object.

// The Prototype Chain: When you try to access a property or method on an object, JavaScript first looks for it directly on the object itself. If not found, it follows the [[Prototype]] link to the next object in the chain and looks there. This continues until the property is found or the chain ends (the [[Prototype]] is null).

// prototype Property on Functions: Every function in JavaScript automatically gets a special prototype property. This property holds an object. Crucially: When you use a function as a constructor (with the new keyword), the object created by new will have its internal [[Prototype]] link set to point to the constructor function's prototype object.

// Let's illustrate with Constructor Functions:

//'use strict';
// ==========================================================================
// === 1. Constructor Functions & The Problem of Repetition ===
// ==========================================================================
console.log("--- Constructor Functions (Initial Approach) ---");

function Dog_Inefficient(name, breed) {
  // Properties specific to each instance
  this.name = name;
  this.breed = breed;

  // Method defined directly on EACH instance - INEFFICIENT!
  // Every Dog instance gets its own separate copy of this function.
  this.bark = function() {
    console.log(`Woof! My name is ${this.name}.`);
  };
}

const dog1_inefficient = new Dog_Inefficient("Buddy", "Golden Retriever");
const dog2_inefficient = new Dog_Inefficient("Lucy", "Poodle");

dog1_inefficient.bark(); // Output: Woof! My name is Buddy.
dog2_inefficient.bark(); // Output: Woof! My name is Lucy.

// Check if the bark functions are the same object in memory
console.log("Are bark methods the same (inefficient)?", dog1_inefficient.bark === dog2_inefficient.bark); // Output: false - They are separate copies!

// ==========================================================================
// === 2. Using the `prototype` Property for Efficiency ===
// ==========================================================================
console.log("\n--- Using the Constructor's prototype ---");

function Dog(name, breed) {
  // Properties specific to each instance are still defined here
  this.name = name;
  this.breed = breed;
  // NO methods defined directly on 'this' anymore!
}

// --- Add shared methods to the Constructor's `prototype` object ---
// All instances created by 'new Dog()' will SHARE this SAME function
// via the prototype chain.
Dog.prototype.bark = function() {
  console.log(`Woof! My name is ${this.name}.`); // 'this' will refer to the instance calling bark()
};

Dog.prototype.wagTail = function() {
  console.log(`${this.name} wags its tail excitedly!`);
};

// --- How `new` works with `prototype` ---
// 1. Creates a new empty object: `{}`
// 2. Sets the internal [[Prototype]] of this new object to `Dog.prototype`.
// 3. Calls the `Dog` constructor function with `this` bound to the new object.
// 4. Returns the new object (unless the constructor explicitly returns another object).

const dog1 = new Dog("Buddy", "Golden Retriever");
const dog2 = new Dog("Lucy", "Poodle");

// --- Accessing Methods via the Prototype Chain ---
dog1.bark();    // 1. JS looks for 'bark' directly on dog1. Not found.
                // 2. JS follows dog1.[[Prototype]] (which points to Dog.prototype).
                // 3. JS finds 'bark' on Dog.prototype. Executes it with 'this' set to dog1.
                // Output: Woof! My name is Buddy.

dog2.wagTail(); // Same process, 'this' is set to dog2.
                // Output: Lucy wags its tail excitedly!

// Now the methods ARE shared!
console.log("Are bark methods the same (prototype)?", dog1.bark === dog2.bark); // Output: true

// --- Inspecting the Prototype Chain ---
console.log("\nInspecting the chain:");
// Get the prototype of an instance (modern way)
const dog1Prototype = Object.getPrototypeOf(dog1);
console.log("Is dog1's prototype === Dog.prototype?", dog1Prototype === Dog.prototype); // Output: true

// What is the prototype of Dog.prototype? It's the default Object prototype
const objectPrototype = Object.getPrototypeOf(Dog.prototype);
console.log("Is Dog.prototype's prototype === Object.prototype?", objectPrototype === Object.prototype); // Output: true

// Object.prototype is the top of the chain for most objects
console.log("What is Object.prototype's prototype?", Object.getPrototypeOf(Object.prototype)); // Output: null

// Check instance relationship
console.log("Is dog1 an instance of Dog?", dog1 instanceof Dog);           // Output: true (Checks prototype chain)
console.log("Is dog1 an instance of Object?", dog1 instanceof Object);     // Output: true (Object.prototype is in the chain)

// Properties directly on the instance vs. on the prototype
console.log("dog1 has own property 'name'?", dog1.hasOwnProperty('name')); // Output: true
console.log("dog1 has own property 'bark'?", dog1.hasOwnProperty('bark')); // Output: false (bark is on the prototype)

// ==========================================================================
// === 3. Prototypal Inheritance (Creating Subtypes) ===
// ==========================================================================
console.log("\n--- Prototypal Inheritance ---");

// Let's create a more specific type, 'GuideDog', that inherits from 'Dog'.

function GuideDog(name, breed, owner) {
  // 1. Call the parent constructor to set up parent properties ('name', 'breed')
  //    We use .call() to explicitly set the 'this' context to the new GuideDog instance being created.
  Dog.call(this, name, breed);

  // 2. Add properties specific to GuideDog
  this.owner = owner;
}

// 3. === Set up the Prototype Chain ===
//    Create a *new* object whose [[Prototype]] is Dog.prototype, and assign it
//    to GuideDog.prototype. This links the chains correctly.
//    `Object.create()` is the standard way to do this.
GuideDog.prototype = Object.create(Dog.prototype);

// 4. === Reset the Constructor Property (Important!) ===
//    After Step 3, GuideDog.prototype.constructor points to Dog (incorrectly).
//    We need to manually reset it to point back to GuideDog.
GuideDog.prototype.constructor = GuideDog;

// 5. Add methods specific to GuideDog (or override parent methods)
GuideDog.prototype.lead = function() {
  console.log(`${this.name} is leading ${this.owner}.`);
};

// Optional: Override the bark method for GuideDogs
GuideDog.prototype.bark = function() {
  console.log(`Quiet woof. I'm ${this.name}, a working guide dog.`);
};

// --- Creating and Using the Subtype ---
const guideDog1 = new GuideDog("Scout", "Labrador", "Alice");

guideDog1.bark();    // Found directly on GuideDog.prototype. Output: Quiet woof...
guideDog1.wagTail(); // Not on GuideDog.prototype -> look up chain -> Found on Dog.prototype. Output: Scout wags...
guideDog1.lead();    // Found directly on GuideDog.prototype. Output: Scout is leading Alice.

console.log("guideDog1 name:", guideDog1.name);     // Property set by Dog.call()
console.log("guideDog1 owner:", guideDog1.owner);   // Property set in GuideDog constructor

// --- Checking the Chain for the Subtype ---
console.log("\nInspecting GuideDog chain:");
console.log("Is guideDog1 an instance of GuideDog?", guideDog1 instanceof GuideDog); // Output: true
console.log("Is guideDog1 an instance of Dog?", guideDog1 instanceof Dog);       // Output: true
console.log("Is guideDog1 an instance of Object?", guideDog1 instanceof Object);   // Output: true

const guideDogProto = Object.getPrototypeOf(guideDog1);
const dogProto = Object.getPrototypeOf(guideDogProto);

console.log("Is guideDog1's prototype === GuideDog.prototype?", guideDogProto === GuideDog.prototype); // Output: true
console.log("Is GuideDog.prototype's prototype === Dog.prototype?", dogProto === Dog.prototype);     // Output: true
console.log("GuideDog.prototype.constructor:", GuideDog.prototype.constructor.name); // Output: GuideDog (because we reset it)


// Key Concepts Illustrated:

// Constructor Functions: Define the "blueprint" for creating objects (Dog, GuideDog).

// this Keyword: Inside the constructor, this refers to the new instance being created.

// prototype Property: An object attached to the constructor function, holding shared methods/properties.

// [[Prototype]] Link: An internal link on each instance pointing to the constructor's prototype object.

// Prototype Chain Lookup: How JavaScript finds properties/methods by searching the instance, then its prototype, then its prototype's prototype, and so on, up to Object.prototype.

// Inheritance: Achieved by:

// Calling the parent constructor using .call(this, ...) to initialize parent properties.

// Linking the child's prototype to the parent's prototype using Object.create(Parent.prototype).

// Resetting the constructor property on the child's prototype.

// While ES6 class syntax makes this look simpler, it's crucial to remember that this underlying prototypal mechanism is still what's happening "under the hood."