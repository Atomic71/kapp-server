import type { NextPage } from 'next';
import Head from 'next/head';
import { LoginForm, LogoutCta, ValidationForm } from '../components';
import { trpc } from '../utils/trpc';
import { env } from '../env/client.mjs';

const faviconHrefPrefix =
  env.NEXT_PUBLIC_PATH === 'production' ? '/prod' : '/uat';
const Home: NextPage = () => {
  const user = trpc.useQuery(['user.me']);
  return (
    <>
      <Head>
        <title>KAPP</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href={`${faviconHrefPrefix}/favicon.ico`} />
      </Head>

      <div className='container mx-auto flex flex-col items-center justify-center flex-grow p-4'>
        {user.data ? (
          [user.data.id, user.data.validated].join(', validated: ')
        ) : (
          <div>nema</div>
        )}
        <br />
        <div className='flex flex-col items-start gap-5'>
          <h3>
            Login:
            <LoginForm />
          </h3>
          <h3>
            Login:
            <ValidationForm />
          </h3>
          <div className='self-end'>
            <LogoutCta />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
