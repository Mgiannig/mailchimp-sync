const mailchimp = require("@mailchimp/mailchimp_marketing");
const listId = process.env.LIST_ID;
mailchimp.setConfig({
  apiKey: "75780780bb7830154094da3cf3ed7b4f-us8",
  server: "us8",
});

exports.bulkAddMembers = async function (members) {
  const response = await mailchimp.lists.batchListMembers(listId, {
    members: members,
    sync_tags: true,
    update_existing: true,
  });
  return response;
};
