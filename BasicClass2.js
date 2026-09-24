const flag = true
if(!flag)          // not changing varriable value we are using NOT opertaor yto turn the result.
{
    console.log("Condition is true")
}
else
{

    console.log(flag);
    console.log("condition is false");

}
//while loop Syntax
/*let i=0
while(i<10)
{
  i++
    console.log("i value is printing",i)
    
} */

//do while loop Syntax
/*let j=0
do
{
    console.log(j)
     j++
   
}while(j>10);
console.log(j)*/

//for loop
let n=0
for(let k=1;k<=100;k++)
{
    if(k%2 == 0 && k%5 == 0)
    {
        n++
        console.log(k)

        if(n == 3)
         break   

    }    
    
}







