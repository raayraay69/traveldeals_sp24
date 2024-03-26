const {PubSub} = require('@google-cloud/pubsub');
const {Firestore} = require('@google-cloud/firestore');

const pubSubClient = new PubSub();
const firestore = new Firestore();

exports.subscribeAndWriteToFirestore = async (message, context) => {
  const incomingMessage = Buffer.from(message.data, 'base64').toString();
  const parsedMessage = JSON.parse(incomingMessage);

  
  const email_address = parsedMessage.email_address;
  const watch_regions = parsedMessage.watch_regions;

  // Writes the document to the Firestore collection
  const documentRef = firestore.collection('subscribers').doc(email_address);
  await documentRef.set({
    email_address: email_address,
    watch_regions: watch_regions
  });

  console.log(`Document written for email address: ${email_address}`);
};

