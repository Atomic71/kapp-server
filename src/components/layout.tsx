import { PropsWithChildren } from 'react';

import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
}
