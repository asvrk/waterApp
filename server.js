// server.js

const express = require('express');
const app = express();
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Endpoint to receive notification data
app.post('/sendNotification', (req, res) => {
  const { title, body, token } = req.body;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  admin.messaging().send(message)
    .then(response => {
      console.log('Successfully sent message:', response);
      res.status(200).send('Notification sent successfully');
    })
    .catch(error => {
      console.log('Error sending message:', error);
      res.status(500).send('Error sending notification');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
