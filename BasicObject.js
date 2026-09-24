let person = {

    firstName:'sapana',
    lastName : 'Awasthi',
        age : 24,
    fullName : function()
    {
        console.log(this.firstName+this.lastName)
    }

}

console.log(person.fullName())

/*console.log(person.lastName)
 console.log(person['firstName'])
 person.babyName ='Raama'
 console.log(person.babyName)

//Add property in Object.
 person.bookName= 'Secret Mind'
console.log(person)
//how to  property delete
delete person.bookName;
console.log(person)

//to check the property existance in Object
console.log('bookName') in person

print object property by For loop    
for(let key in person)
{
    console.log(person[key])
}  */
