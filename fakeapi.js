const axios = require("axios");
exports.getContactsToImport = async function () {
  const contacts = await axios.get(
    "https://613b9035110e000017a456b1.mockapi.io/api/v1/contacts"
  );
  return contacts.data;
};
