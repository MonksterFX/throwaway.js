import { createClient } from 'redis';

export const client = createClient({
  url: process.env.REDIS_URL || 'redis://:@localhost:6379',
});

client.on('error', (err) => {
  console.error(err);
  // TODO: better event handling here
  console.error("Can't connect to redis. Shutdown server...");
  process.exit(1);
});

export async function initRedis() {
  await client.connect();
}
