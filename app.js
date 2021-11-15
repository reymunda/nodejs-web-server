const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();

app.get('/',(req,res) => {
    res.sendFile('./index.html',{root: __dirname});
})
app.get('/about',(req,res) => {
    res.sendFile('./about.html',{root: __dirname});
})
app.get('/contact',(req,res) => {
    res.sendFile('./contact.html',{root: __dirname});
})
app.get('/category/:id/product/:code',(req,res) => {
    res.send(`Category id: ${req.params.id} \n Product code: ${req.params.code}`);
})

app.use('/',(req,res) => {
    res.status(404);
    res.send('Not Found');
})

app.listen(3000,() => {
   console.log('Server is listening on port 3000'); 
})


//Node JS Core Module Version

// const renderHTML = (data,res) => {
//     fs.readFile(data,(err,data) => {
//         if(err){
//             res.writeHead(404);
//             res.write(err);
//         }else{
//             res.write(data);
//         }
//         res.end();
//     })
// }
// const server =http.createServer((req,res) => {
//     let url = req.url;
    
//     res.writeHead(200,{
//         'Content-Type' : 'text/html'
//     })

//     if(url === '/about'){
//         renderHTML('./about.html',res)
//     }else if(url === '/contact'){
//         renderHTML('./contact.html',res)
//     }else{
//         renderHTML('./index.html',res)
//     }
// })

// server.listen(3000,() => {
//     console.log('Server is listening on port 3000');
// })