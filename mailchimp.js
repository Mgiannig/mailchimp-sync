const mailchimp = require("@mailchimp/mailchimp_marketing");
const listId = process.env.LIST_ID;
mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_REGION,
});

exports.bulkAddMembers = async function (members) {
  const response = await mailchimp.lists.batchListMembers(listId, {
    members: members,
    sync_tags: true,
    update_existing: true,
  });
  return response;
};
