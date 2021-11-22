const fs = require('fs');

const loadContact = () => {
    let contacts = fs.readFileSync('./data/contacts.json', 'utf-8');

    if(contacts == ""){
        fs.writeFileSync('./data/contacts.json','[]');
    }
    return JSON.parse(contacts);
}

const detailContact = (name) => {
    let dataContact = loadContact();
    let contact = dataContact.filter(e => e.name.toLowerCase() == name.toLowerCase() ) 
    console.log(contact[0])
    return contact;
}
const addContact = (data) => {
    let dataContact = JSON.parse(fs.readFileSync('./data/contacts.json','utf-8'));
    dataContact.push(data);
    fs.writeFileSync('./data/contacts.json',JSON.stringify(dataContact));
}
module.exports = {loadContact,detailContact,addContact};