import dayjs, { Dayjs } from 'dayjs';
import { env } from '../../env/server.mjs';

const bloodStorageInfoResponse = [
  {
    KgRhName: 'A + ',
    Min: '80',
    Max: '250',
    Stanje: '229',
    SluzbaId: '1',
    Redosljed: '1',
    Datum: '21.08.2022',
    Grad: 'Banja Luka',
  },
  {
    KgRhName: '0 + ',
    Min: '75',
    Max: '250',
    Stanje: '84',
    SluzbaId: '1',
    Redosljed: '2',
    Datum: '21.08.2022',
    Grad: 'Banja Luka',
  },
  {
    KgRhName: 'B + ',
    Min: '32',
    Max: '90',
    Stanje: '117',
    SluzbaId: '1',
    Redosljed: '3',
    Datum: '21.08.2022',
    Grad: 'Banja Luka',
  },
  {
    KgRhName: 'AB + ',
    Min: '12',
    Max: '30',
    Stanje: '28',
    SluzbaId: '1',
    Redosljed: '4',
    Datum: '21.08.2022',
    Grad: 'Banja Luka',
  },
  {
    KgRhName: 'A - ',
    Min: '18',
    Max: '55',
    Stanje: '22',
    SluzbaId: '1',
    Redosljed: '5',
    Datum: '21.08.2022',
    Grad: 'Banja Luka',
  },
  {
    KgRhName: '0 - ',
    Min: '18',
    Max: '55',
    Stanje: '56',
    SluzbaId: '1',
    Redosljed: '6',
    Datum: '21.08.2022',
    Grad: 'Banja Luka',
  },
  {
    KgRhName: 'B - ',
    Min: '7',
    Max: '25',
    Stanje: '17',
    SluzbaId: '1',
    Redosljed: '7',
    Datum: '21.08.2022',
    Grad: 'Banja Luka',
  },
  {
    KgRhName: 'AB - ',
    Min: '3',
    Max: '10',
    Stanje: '5',
    SluzbaId: '1',
    Redosljed: '8',
    Datum: '21.08.2022',
    Grad: 'Banja Luka',
  },
];

let bloodState: typeof bloodStorageInfoResponse;
let timestamp: Dayjs;
const fetchBloodStorageState = async (): Promise<
  typeof bloodStorageInfoResponse
> => {
  if (env.NODE_ENV !== 'production') {
    console.log('returned blood storage data locally');
    return Promise.resolve(bloodStorageInfoResponse);
  }
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
