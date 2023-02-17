const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-app',
  brokers: ['localhost:9091'],
  ssl: false,
});

const run = async () => {
  const producer = kafka.producer();
  const topic = 'test-topic4';
  const partition = Math.round(Math.random() * 2);
  try {
    console.log(`connect to kafka...`);
    await producer.connect();
    // create topic
    console.log(`sending data to ${topic}...`);
    const resp = await producer.send({
      topic,
      messages: [
        {
          key: `key-${Math.floor(Math.random() * 100)}`,
          value: `value-${Math.floor(Math.random() * 100)}`,
          partition,
        },
      ],
    });
    console.log(`done sending data: ${JSON.stringify(resp)}...`);
  } catch (err) {
    console.error(`something went wrong... ${err}`);
  } finally {
    await producer.disconnect();
  }
};

run();
