require("dotenv").config();
const { bulkAddMembers } = require("./mailchimp");
const { getContactsToImport } = require("./fakeapi");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/contacts/sync", execute);

async function execute(req, res) {
  try {
    //get contacts from the fake api
    const apiContacts = await getContactsToImport();

    //we parse the info to what the mailchimp API requires
    const mailChimpPayload = apiContacts.map((x) => {
      return {
        email_address: x.email,
        status: "subscribed",
        merge_fields: {
          FNAME: x.firstName,
          LNAME: x.lastName,
        },
      };
    });

    //bulk insert or update operation to mailchimp api
    const bulkUpdateOperation = await bulkAddMembers(mailChimpPayload);
    const syncedContacts =
      bulkUpdateOperation.total_created + bulkUpdateOperation.total_updated;

    const syncdMembers = bulkUpdateOperation.new_members.concat(
      bulkUpdateOperation.updated_members
    );

    const contacts = syncdMembers.map((m) => {
      return {
        firstName: m.merge_fields.FNAME,
        lastName: m.merge_fields.LNAME,
        email: m.email_address,
      };
    });
    const response = {
      syncedContacts,
      contacts,
    };

    res.send(response);
    console.log("Success: synced: ", response);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "We've encountered an error while processing your request. Please try again later",
      error,
    });
  }
}

app.get("/", (req, res) => {
  res.send(
    "Hello World!! please check the contacts/sync endpoint for the result"
  );
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
