const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-app',
  brokers: ['localhost:9091'],
  ssl: false,
});
const topic = 'test-topic4';
const run = async () => {
  const consumer = kafka.consumer({ groupId: 'test-group2' });

  try {
    console.log(`connect to kafka...`);
    await consumer.connect();
    // consuming topic
    await consumer.subscribe({ topic, fromBeginning: true });
    console.log(`consuming topics...`);
    await consumer.run({
      eachBatch: async ({ batch }) => {
        console.log(batch);
      },
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        console.log(`- ${prefix} ${message.key}#${message.value}`);
      },
    });
  } catch (err) {
    console.error(`something went wrong... ${err}`);
  } finally {
    // await consumer.disconnect();
  }
};

run();
