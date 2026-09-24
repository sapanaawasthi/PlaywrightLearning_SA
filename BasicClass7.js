class Person{
    age =35
    country = "America"

// create a properties by using keyword 'get'.

get location()
{
    return "canada"
  
}

//constructor is method which executes by default when you create object of the class
  constructor(firstName,lastname)
  {
    this.firstName =firstName
    this.lastname = lastname;

  } 
  //methods
  fullName()
  {
    console.log(this.firstName+this.lastname)
  }
  

}
let obj1 = new Person("Robert", "john")
let obj2 = new Person("Kelwin", "john")
console.log(obj1.fullName())

console.log(obj2.fullName())


let obj= new Person() // create Object of class
console.log(obj.age)
console.log(obj.country)
console.log(obj.location)