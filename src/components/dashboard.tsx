import { User } from '@prisma/client';

const UserDashboard: React.FC<{ user: User }> = ({ user }) => {
  return <p>{user.id}</p>;
};

export { UserDashboard };
