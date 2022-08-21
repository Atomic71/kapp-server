import fetchBloodStorageState from '../functions/fetchBloodStorageState';
import { createRouter } from './context';

export const bloodStorageRouter = createRouter().query('getInfo', {
  async resolve({ ctx }) {
    return await fetchBloodStorageState();
  },
});
