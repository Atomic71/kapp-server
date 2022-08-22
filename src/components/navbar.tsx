import { LogoutCta } from './auth';
import { trpc } from '../utils/trpc';
import Image from 'next/image';
import { env } from '../env/client.mjs';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const user = trpc.useQuery(['user.me']);

  return (
    <nav className='flex justify-between'>
      <div>
        <Image
          height={68}
          width={150}
          src={env.NEXT_PUBLIC_PATH + '/navbar-logo.svg'}
          alt='kapp header logo'
        />
      </div>
      {user.data && (
        <div className='flex'>
          <Link href={'/profile'}>
            <button className='p-2 bg-green-800 text-white'>Profil</button>
          </Link>
          <LogoutCta onLogout={() => user.refetch()} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
