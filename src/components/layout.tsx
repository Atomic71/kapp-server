import { PropsWithChildren } from 'react';

import Navbar from './navbar';
import Footer from './footer';
import Head from 'next/head';
import { env } from '../env/client.mjs';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>KAPP</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href={`${env.NEXT_PUBLIC_PATH}/favicon.ico`} />
      </Head>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <main className='flex-grow container mx-auto'>{children}</main>
        <Footer />
      </div>
    </>
  );
}
