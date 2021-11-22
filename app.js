const http = require('http');
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const {loadContact,detailContact,addContact,duplicateCheck} = require('./utils/contact');
const {body,check,validationResult} = require('express-validator');

const app = express();

app.set('view engine','ejs');

app.use(expressLayout);
app.use(express.static('public'));
app.use(express.urlencoded());

app.get('/',(req,res) => {
    // res.sendFile('./index.html',{root: __dirname});
    let hobby = [
        {
            name: 'Coding',
            tool: 'Laptop'
        },
        {
            name: 'Football',
            tool: 'Ball'
        },
        {
            name: 'Sing',
            tool: 'Mic'
        }
    ]

    res.render('index',{
        name: 'Reymunda',
        title: 'Home Page',
        layout: 'layouts/main',
        hobby        
    });
})
app.get('/about',(req,res) => {
    // res.sendFile('./about.html',{root: __dirname});
    res.render('about',{
        title: 'About Page',
        layout: 'layouts/main'
    });
})
app.get('/contact',(req,res) => {
    // res.sendFile('./contact.html',{root: __dirname});
    let contacts = loadContact()
    res.render('contact',{
        title: 'Contact Page',
        layout: 'layouts/main',
        contacts,
        detailContact
    }
    );
})
app.get('/contact/add',(req,res) => {
    res.render('add',{
        title: 'Add Contact',
        layout: 'layouts/main',
    })
})
app.post('/contact/add',[
    check('phone','Phone number is invalid!')
    .isMobilePhone('id-ID'),
    body('phone').custom(value => {
        const duplicate = duplicateCheck(value);
        if(duplicate){
            throw new Error('The contact has been added!');
        }
        return true;
    }),
    check('email','Email is invalid!')
    .isEmail()
],(req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render('add',{
            title: 'Add Contact',
            layout: 'layouts/main',
            errors: errors.array()
        })
    }
    addContact(req.body);
    res.redirect('/contact');
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