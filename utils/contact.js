const fs = require('fs');

const loadContact = () => {
    let contacts = fs.readFileSync('./data/contacts.json', 'utf-8');

    if(contacts == ""){
        fs.writeFileSync('./data/contacts.json','[]');
    }
    return JSON.parse(contacts);
}

module.exports = {loadContact};