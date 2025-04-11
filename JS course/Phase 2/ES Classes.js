// ES6 classes are primarily syntactic sugar over JavaScript's existing prototype-based inheritance. They provide a cleaner, more familiar syntax (especially for developers coming from class-based languages like Java or C#) but don't fundamentally change how inheritance works under the hood.

// Here's a breakdown with examples:

// 'use strict';
// ==========================================================================
// === 1. Basic Class Definition & Constructor ===
// ==========================================================================
console.log("--- Basic Class ---");

// Use the 'class' keyword followed by the class name (typically capitalized).
class Animal {
  // The 'constructor' method is a special method for creating and
  // initializing an object created with a class.
  // It's called automatically when you use 'new'.
  constructor(name, species) {
    console.log(`Creating a new ${species}...`);
    // 'this' refers to the new instance being created.
    this.name = name;
    this.species = species;
    this.createdAt = new Date(); // Add instance-specific properties
  }

  // --- Methods ---
  // Methods defined inside the class body are automatically added
  // to the prototype of objects created by this class (efficient!).
  speak() {
    console.log(`${this.name} (${this.species}) makes a sound.`);
  }

  describe() {
    console.log(`${this.name} is a ${this.species}, created at ${this.createdAt.toLocaleTimeString()}`);
  }
} // No comma needed between methods

// --- Instantiation (Creating Objects) ---
// Use the 'new' keyword, just like with constructor functions.
const genericAnimal = new Animal("Creature", "Unknown");
const lion = new Animal("Leo", "Lion");

genericAnimal.speak(); // Output: Creature (Unknown) makes a sound.
lion.speak();       // Output: Leo (Lion) makes a sound.
lion.describe();    // Output: Leo is a Lion, created at [current time]

// Check the prototype
const animalProto = Object.getPrototypeOf(lion);
console.log("Is lion's prototype === Animal.prototype?", animalProto === Animal.prototype); // Output: true
console.log("Is speak method on the prototype?", animalProto.hasOwnProperty('speak')); // Output: true (or checks prototype chain depending on exact implementation)
console.log("Is name method on the instance?", lion.hasOwnProperty('name'));       // Output: true


// ==========================================================================
// === 2. Inheritance with `extends` and `super` ===
// ==========================================================================
console.log("\n--- Inheritance (extends & super) ---");

// Use the 'extends' keyword to create a class that inherits from a parent class.
class Dog extends Animal {
  // The subclass constructor
  constructor(name, breed) {
    console.log(`Constructing a Dog named ${name}...`);
    // --- Call the Parent Constructor using `super()` ---
    // - It's *mandatory* to call `super()` in the subclass constructor *before*
    //   accessing `this` if the parent has a constructor.
    // - `super()` calls the constructor of the parent class (Animal).
    // - You must pass any required arguments for the parent constructor.
    super(name, "Dog"); // Pass 'name' and explicitly set 'species' to "Dog"

    // Now you can add properties specific to the Dog subclass
    this.breed = breed;
    console.log(`...finished Dog constructor for ${this.name}.`); // 'this' is now available
  }

  // --- Overriding Methods ---
  // Define a method with the same name as in the parent class.
  speak() {
    console.log(`${this.name} the ${this.breed} barks: Woof! Woof!`);
  }

  // --- Calling Parent Methods using `super` ---
  describeDetailed() {
    // Call the parent's describe method using `super.methodName()`
    super.describe();
    console.log(`   It's a ${this.breed}.`);
  }

  // --- Adding New Methods ---
  fetch() {
    console.log(`${this.name} fetches the ball!`);
  }
}

const myDog = new Dog("Buddy", "Golden Retriever");

myDog.speak(); // Calls the overridden Dog version: Buddy the Golden Retriever barks: Woof! Woof!
myDog.fetch(); // Calls the Dog-specific method: Buddy fetches the ball!
myDog.describeDetailed(); // Calls parent describe() via super, then adds more info.

// Check inheritance chain
console.log("Is myDog an instance of Dog?", myDog instanceof Dog);       // Output: true
console.log("Is myDog an instance of Animal?", myDog instanceof Animal);   // Output: true (because Dog extends Animal)
console.log("Is myDog an instance of Object?", myDog instanceof Object);   // Output: true

// ==========================================================================
// === 3. Getters and Setters ===
// ==========================================================================
console.log("\n--- Getters & Setters ---");

// Provide controlled access to object properties using 'get' and 'set'.
class Rectangle {
  constructor(width, height) {
    this._width = width;   // Use convention like '_' for internal storage property
    this._height = height;
  }

  // --- Getter ---
  // Accessed like a property (no parentheses needed)
  get area() {
    console.log("Calculating area...");
    return this._width * this._height;
  }

  // --- Setter ---
  // Called when assigning a value to the property
  set dimensions({ width, height }) { // Use object destructuring for convenience
    console.log(`Setting dimensions to ${width}x${height}`);
    if (width > 0 && height > 0) {
      this._width = width;
      this._height = height;
    } else {
      console.error("Width and height must be positive numbers.");
    }
  }

  // Regular method for comparison
  getDimensions() {
      return { width: this._width, height: this._height };
  }
}

const rect = new Rectangle(10, 5);
console.log("Initial dimensions:", rect.getDimensions()); // { width: 10, height: 5 }
console.log("Accessing area via getter:", rect.area); // Access like a property: Output: Calculating area... 50

// Use the setter
rect.dimensions = { width: 20, height: 8 }; // Assign like a property
console.log("New dimensions:", rect.getDimensions());   // { width: 20, height: 8 }
console.log("New area:", rect.area);                  // Output: Calculating area... 160

rect.dimensions = { width: -5, height: 10 };         // Tries invalid assignment
// Output: Setting dimensions to -5x10
// Output: Width and height must be positive numbers.
console.log("Dimensions after invalid set:", rect.getDimensions()); // { width: 20, height: 8 } (unchanged)


// ==========================================================================
// === 4. Static Methods and Properties ===
// ==========================================================================
console.log("\n--- Static Members ---");

// Static members belong to the class itself, not to instances of the class.
// They are called directly on the class name.

class MathHelper {
  static PI = 3.1415926535; // Static property (newer feature)

  // Static method
  static add(a, b) {
    return a + b;
  }

  // Static method
  static multiply(a, b) {
    return a * b;
  }

  // Instance method (for contrast - wouldn't usually mix like this)
  in
stanceMethod() {
    console.log("This is an instance method.");
  }
}
// Access static property and method
console.log("Static PI:", MathHelper.PI); // Output: 3.1415926535
console.log("Static add:", MathHelper.add(5, 10)); // Output: 15
console.log("Static multiply:", MathHelper.multiply(5, 10)); // Output: 50
const mathInstance = new MathHelper();
mathInstance.instanceMethod(); // Output: This is an instance method.  
// mathInstance.PI; // Error: PI is not a property of the instance
// mathInstance.add(5, 10); // Error: add is not a method of the instance
// ==========================================================================
// === 5. Private Class Fields (Newer Feature) ===
// ==========================================================================
console.log("\n--- Private Class Fields ---");
// Private fields are prefixed with '#' and are only accessible within the class.
class Person {
  // Private field
  #ssn; // Social Security Number

  constructor(name, ssn) {
    this.name = name;
    this.#ssn = ssn; // Set private field
  }

  // Public method to access private field
  getSSN() {
    return this.#ssn;
  }
}
// Private field cannot be accessed directly outside the class
const john = new Person("John Doe", "123-45-6789");
console.log("John's name:", john.name); // Output: John Doe
// console.log("John's SSN:", john.#ssn); // Error: Private field '#ssn' must be declared in an enclosing class
console.log("John's SSN via method:", john.getSSN()); // Output: 123-45-6789
// ==========================================================================
// === 6. Conclusion ===
// ==========================================================================
console.log("\n--- Conclusion ---");
// - ES6 classes provide a cleaner syntax for creating objects and handling inheritance.
// - They are built on top of JavaScript's existing prototype-based inheritance.
// - Understanding the underlying prototype system is still essential.
// - Classes support inheritance, static members, and private fields.
// - They make it easier to create and manage complex object-oriented structures in JavaScript.
// - Remember that ES6 classes are just syntactic sugar over the existing prototype system.
// - They don't change the fundamental behavior of JavaScript's object model.
// - Always consider performance and memory implications when designing your classes.
// - Use private fields and methods for encapsulation when needed.
// - Use static members for utility functions or constants that don't depend on instance state.
// - Use inheritance judiciously to avoid complexity.
// - Favor composition over inheritance when appropriate.
// - Keep your classes focused and single-responsibility.
// - Use modern JavaScript features like destructuring, template literals, and arrow functions to enhance readability and maintainability. 
