require("dotenv").config();
const { bulkAddMembers } = require("./mailchimp");
const { getContactsToImport } = require("./fakeapi");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/contacts/sync", execute);

async function execute(req, res) {
  try {
    const response = await syncronize();
    res.send(response);
  } catch (error) {
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
