import { LogoutCta } from '.';
import { trpc } from '../utils/trpc';

const Navbar: React.FC = () => {
  const user = trpc.useQuery(['user.me']);
  return (
    <nav className='flex justify-between'>{user.data && <LogoutCta />}</nav>
  );
};

export default Navbar;
