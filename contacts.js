const { v4 } = require('uuid');

const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');
// const contactsPath = path.resolve('./db/contacts.json');

//node index.js --action list
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    return contactsList;
  } catch (error) {
    throw error;
  }
}

// node index.js --action get --id 5
async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    const findContact = contactsList.find((item) => item.id === contactId);

    if (!findContact) {
      throw new Error(`Contact with id = ${contactId} not found`);
    }
    return findContact;
  } catch (error) {
    throw error;
  }
}

//node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
async function addContact(name, email, phone) {
  try {
    const contactsList = await listContacts();
    const checkID = () =>
      contactsList.some((item) => item.id === Id) ? checkID(id + 1) : id;

    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };
    contactsList.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return newContact;
  } catch (error) {
    throw error;
  }
}

// node index.js --action remove --id=3
async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const contactIndex = contactsList.findIndex(
      (item) => item.id === contactId,
    );

    if (contactIndex === -1) {
      throw new Error(`Contact with id = ${contactId} not found`);
    }

    const deleteContact = await contactsList.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));

    return deleteContact;
  } catch (error) {
    throw error;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
