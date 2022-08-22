import { LogoutCta } from './auth';
import { trpc } from '../utils/trpc';
import Image from 'next/image';
import { env } from '../env/client.mjs';

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
      {user.data && <LogoutCta onLogout={() => user.refetch()} />}
    </nav>
  );
};

export default Navbar;
