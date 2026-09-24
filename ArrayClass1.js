//Array Decalaration 3 way
let marks = Array(6)
var marks1 = new Array(10,20,30,40,50,60)
var marks2 =[70,80,90,95,85,75]

/*marks1[4] =45
console.log(marks1[4])
console.log(marks1.length)

marks1.push(87) // Add value in last 
console.log(marks1)

marks2.pop()   //Remove value from Array 's last
console.log(marks2.length)

marks.unshift(12) // Add value in starting of Array.
console.log(marks)
*/

//console.log(marks2.indexOf(75))
//console.log(marks2.includes(85))

/*for(let i=0;i<=marks2.length;i++)
  {
    console.log(marks2[i]);
        
  }*/

   
  /*for(let i=0;i<marks2.length;i++)
  {
    sum=sum + marks2[i]

    console.log(marks2[i])

           
  }
console.log(sum)*/

//new methoods for reduce the coding and no use of loop.
 var var1=0
let var3= marks2.reduce((var1,var2)=>var1 +var2,0)//let total = marks2.reduce((sum,mark)=>sum + mark,0)
console.log(var3)

// to check the even number from Marks of Array
let store =marks2.filter(var4=>var4 %2==0)
console.log(store)








