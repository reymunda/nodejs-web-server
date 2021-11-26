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
const duplicateCheck = (phone) => {
    let dataContact = loadContact();
    return dataContact.find(e => e.phone === phone);
}
const deleteContact = (phone) => {
    let dataContact = loadContact();
    let resContact = dataContact.filter(e => e.phone !== phone);
    fs.writeFileSync('./data/contacts.json',JSON.stringify(resContact));
}
const searchContact = (phone) => {
    let dataContact = loadContact();
    return dataContact.find(e => e.phone === phone);
}
const editContact = (data) => {
    let dataContact = loadContact();
    let contact = dataContact.find(e => e.phone === data.oldPhone);
    console.log(contact)
    dataContact.splice(dataContact.indexOf(contact),1,data)
    console.log(dataContact);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(dataContact));
}
module.exports = {loadContact,detailContact,addContact,duplicateCheck, deleteContact, searchContact, editContact};