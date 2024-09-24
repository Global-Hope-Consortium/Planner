// middleware/initDB.js
import { syncModels } from '../config/db';

let isDBInitialized = false;

export const initDB = async () => {
  if (!isDBInitialized) {
    try {
      await syncModels();
      isDBInitialized = true;
      console.log('Database models synchronized.');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
};