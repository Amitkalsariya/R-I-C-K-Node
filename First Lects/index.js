 fs = require('fs');
//Write method --> With Sync 
// fs.writeFileSync("rick.txt","Rick")

// Write method --> With async
// fs.writeFile("rick1.txt","Amit Kalsariya","utf-8",(err,data)=>(err));

// Read File -> with Sync
// const data=fs.readFileSync("rick.txt","utf-8") 
// console.log(data);


// Read File --> With Async
// fs.readFile("rick.txt","utf-8",(err,data)=>{
// console.log(data);
// }); 


// Append file --> With async
// fs.appendFileSync("rick.txt","MR.AMIT","utf-8");


// Append File --> With Async
// fs.appendFile("rick21.txt","This is the Text Based File","utf-8",(err,data)=>{
//     if(err)
//     {
//         console.log(err);
        
//     }
//     else{
//         console.log(data);
        
//     }
// })


// Unlibnk File --> With Sync
// fs.unlinkSync("rick1.txt")

// Unlink File ---> With Async 
// fs.unlink("rick21.txt",(err,data)=>{
// if(!err)
// {
//     console.log(data);
    
// }
// else{
// console.log(err);
    
// }
// })


console.log("Amit1");
console.log("Amit2");
console.log("Amit3");
