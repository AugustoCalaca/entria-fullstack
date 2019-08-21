import mongoose from 'mongoose';
import { databaseConfig } from './config';

export function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('[Mongoose] - Disconnected'))
      .once('open', () => {
        console.log('[Mongoose] - Connected');
        resolve(mongoose.connections[0])
      });

    mongoose.connect(
      databaseConfig,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    );
  });
}
