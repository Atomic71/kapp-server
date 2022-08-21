import dayjs, { Dayjs } from 'dayjs';
import { env } from '../../env/server.mjs';

const BloodStorageInfo = {
  KgRhName: 'A + ',
  Min: '80',
  Max: '250',
  Stanje: '223',
  SluzbaId: '1',
  Redosljed: '1',
  Datum: '16.08.2022',
  Grad: 'Banja Luka',
};

let bloodState: typeof BloodStorageInfo[];
let timestamp: Dayjs;
const fetchBloodStorageState = async (): Promise<typeof BloodStorageInfo[]> => {
  try {
    const isStale =
      dayjs(timestamp).isValid() &&
      dayjs(timestamp)
        .add(Number(env.BLOOD_STORAGE_STALE_MS), 'second')
        .isBefore(dayjs());

    const shouldFetch = !bloodState || isStale;

    if (shouldFetch) {
      console.log('fetching');
      timestamp = dayjs();
      const res = await fetch(
        'https://www.racunari-bl.com/MobAppTransfApi/api/Zalihe',
        {
          method: 'POST',
          body: JSON.stringify({ Grad_Id: '1', Token: 'BL' }),
        }
      );
      bloodState = await res.json();
    }
    return bloodState;
  } catch (error) {
    throw error;
  }
};

export default fetchBloodStorageState;
