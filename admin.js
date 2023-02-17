const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-app',
  brokers: ['localhost:9091'],
  ssl: false,
});
const run = async () => {
  const admin = kafka.admin();

  try {
    console.log(`connect to kafka...`);
    await admin.connect();
    // create topic
    console.log(`creating topics...`);
    const resp = await admin.createTopics({
      // validateOnly: <boolean>,
      waitForLeaders: false,
      // timeout: <Number>,
      topics: [
        {
          topic: 'test-topic4',
          numPartitions: 3,
          // replicationFactor: 1, // less than number of brokers..
        },
      ],
    });
    console.log(`Created topics...${JSON.stringify(resp)}`);
  } catch (err) {
    console.error(`something went wrong... ${err}`);
  } finally {
    await admin.disconnect();
  }
};

run();
