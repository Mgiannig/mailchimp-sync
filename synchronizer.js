const { bulkAddMembers } = require("./mailchimp");

exports.syncronize = async function () {
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

    const syncedContactsCount =
        bulkUpdateOperation.total_created + bulkUpdateOperation.total_updated;

    return response = {
        syncedContactsCount,
        contacts,
    };
}





