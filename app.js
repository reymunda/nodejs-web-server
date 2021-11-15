const http = require('http');

const server =http.createServer((req,res) => {
    let url = req.url;
    
    res.writeHead(200,{
        'Content-Type' : 'text/html'
    })

    if(url === '/about'){
        res.write('About');
        res.end();
    }else if(url === '/contact'){
        res.write('Contact')
        res.end()
    }else{
        res.write('Hello world');
        res.end();
    }
})

server.listen(3000,() => {
    console.log('Server is listening on port 3000');
})