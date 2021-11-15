const http = require('http');
const fs = require('fs');

const renderHTML = (data,res) => {
    fs.readFile(data,(err,data) => {
        if(err){
            res.writeHead(404);
            res.write(err);
        }else{
            res.write(data);
        }
        res.end();
    })
}
const server =http.createServer((req,res) => {
    let url = req.url;
    
    res.writeHead(200,{
        'Content-Type' : 'text/html'
    })
    
    if(url === '/about'){
        renderHTML('./about.html',res)
    }else if(url === '/contact'){
        renderHTML('./contact.html',res)
    }else{
        renderHTML('./index.html',res)
    }
})

server.listen(3000,() => {
    console.log('Server is listening on port 3000');
})