import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.myClient = createClient();

    // Log errors to the console
    this.myClient.on('error', (error) => console.error('Redis Client Error:', error));

    // Establish the connection
    this.myClient.connect().catch((error) =>
      console.error('Redis Connection Error:', error)
    );
  }

  // Check if Redis connection is alive
  isAlive() {
    return this.myClient.isOpen;
  }

  // Get the value for a given key
  async get(key) {
    try {
      return await this.myClient.get(key);
    } catch (error) {
      console.error(`Error retrieving key "${key}":`, error);
      return null;
    }
  }

  // Set a key with a value and expiration time
  async set(key, value, time) {
    try {
      await this.myClient.set(key, value, {
        EX: time,
      });
    } catch (error) {
      console.error(`Error setting key "${key}":`, error);
    }
  }

  // Delete a key
  async del(key) {
    try {
      await this.myClient.del(key);
    } catch (error) {
      console.error(`Error deleting key "${key}":`, error);
    }
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
