import { createClient } from 'redis';

export const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

export async function initRedis() {
  await client.connect();
}
