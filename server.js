const mailchimp = require("@mailchimp/mailchimp_marketing");
require("dotenv").config();
const { bulkAddMembers } = require("./mailchimp");
const { getContactsToImport } = require("./fakeapi");
mailchimp.setConfig({
  apiKey: "75780780bb7830154094da3cf3ed7b4f-us8",
  server: "us8",
});

async function execute() {
  try {
    //get contacts from the fake api
    const membersToAdd = await getContactsToImport();

    //we parse the info to what the mailchimp API requires
    const mailChimpPayload = membersToAdd.map((x) => {
      return {
        email_address: x.email,
        status: "subscribed",
        merge_fields: {
          FNAME: x.firstName,
          LNAME: x.lastName,
        },
      };
    });

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

    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

execute();
