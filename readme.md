A Simple app used to sync contacts provided by this endpoint https://613b9035110e000017a456b1.mockapi.io/api/v1/contacts to a MailChimp audience contact list.

If the contacts don't exist, they will be created and added to the Audience. If they already exist, they will be updated. Regardless of their condition, all contacts provided by the endpoint will be syncronized.

If you download the app, make sure to run npm i and setup the .env file with the variables provided in the .env.example template file.

You may use the following to run the locally app:
npm run start

Audience Link: Currently empty: https://us8.admin.mailchimp.com/lists/members/
Deployed app on Heroku: https://fierce-garden-42220.herokuapp.com/contacts/sync
Demo video: https://youtu.be/AMSFCoDN4UM

Technical design documentation for this project: https://docs.google.com/document/d/19aDzn43cNHE9v0CIgonXncW1Yh8lCXnlBQqtIOLcdpM/edit?usp=sharing
Mailchimp API: https://mailchimp.com/developer/marketing/api/

