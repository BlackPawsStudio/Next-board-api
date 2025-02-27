import mongoose from 'mongoose';
import { PORT } from './constants';

import * as serverService from './services/server.service';

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    serverService.server.listen(process.env.PORT || PORT, function () {
      console.log('Сервер ожидает подключения...', process.env.PORT || PORT);
    });
  } catch (error) {
    console.log(error);
  }
})();

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit();
});
