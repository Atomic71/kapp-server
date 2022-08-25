import { BloodType } from '@prisma/client';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { trpc } from '../utils/trpc';
import { UpdateForm } from '../utils/user.utils';

const bloodTypesMap = Object.entries(BloodType);
const Profile: NextPage = () => {
  const userQuery = trpc.useQuery(['user.me']);
  const profileUpdate = trpc.useMutation(['user.update']);

  const { register, handleSubmit } = useForm<UpdateForm>();

  const onSubmit = (data: UpdateForm) => {
    profileUpdate.mutate(data);
  };

  return (
    <div>
      {userQuery.data?.id ?? 'loading...'}
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register('bloodType')}>
          {bloodTypesMap.map(([key, val]) => (
            <option key={key} value={val}>
              {val}
            </option>
          ))}
        </select>
        <button className='p-3 bg-red-300 text-white'> sacuvaj</button>
      </form>
    </div>
  );
};

export default Profile;
