import { User } from '@prisma/client';
import Link from 'next/link';

const UserDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <p>{user.id}</p>
    </div>
  );
};

export { UserDashboard };
