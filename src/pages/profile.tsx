import { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const Profile: NextPage = () => {
  const userQuery = trpc.useQuery(['user.me']);
  return <div>{userQuery.data?.id ?? 'loading...'}</div>;
};

export default Profile;
