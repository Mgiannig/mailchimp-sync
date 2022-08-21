A Simple app used to sync contacts provided by this endpoint https://613b9035110e000017a456b1.mockapi.io/api/v1/contacts to a MailChimp audience contact list.

If the contacts don't exist, they will be created and added to the Audience. If they already exist, they will be updated. Regardless of their condition, all contacts provided by the endpoint will be syncronized.

If you download the app, make sure to run npm i and setup the .env file with the variables provided in the .env.example template file.
