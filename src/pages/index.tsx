import type { NextPage } from 'next';
import { AuthWidget } from '../components/auth';
import BloodState from '../components/bloodState';
import { UserDashboard } from '../components/dashboard';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const user = trpc.useQuery(['user.me']);
  return (
    <>
      <div className='container mx-auto flex flex-col items-center justify-center flex-grow p-4'>
        {!user.data && 'hello, guest'}
        <br />
        <div className='flex flex-col items-start gap-5'>
          {!user.data?.validated ? (
            <AuthWidget onTokenChange={() => user.refetch()} />
          ) : (
            <UserDashboard user={user.data} />
          )}
          <BloodState />
        </div>
      </div>
    </>
  );
};

export default Home;
