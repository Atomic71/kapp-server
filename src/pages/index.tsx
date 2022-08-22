import type { NextPage } from 'next';
import Head from 'next/head';
import { AuthWidget } from '../components/auth';
import BloodState from '../components/bloodState';
import { UserDashboard } from '../components/dashboard';
import { env } from '../env/client.mjs';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const user = trpc.useQuery(['user.me']);
  return (
    <>
      <Head>
        <title>KAPP</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href={`${env.NEXT_PUBLIC_PATH}/favicon.ico`} />
      </Head>

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
