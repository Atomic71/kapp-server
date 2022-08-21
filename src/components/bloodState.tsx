import React from 'react';
import { trpc } from '../utils/trpc';

const BloodState = () => {
  const bloodStorage = trpc.useQuery(['blood-storage.getInfo']);

  if (bloodStorage.data?.length) {
    return (
      <div>
        {bloodStorage.data.map((item) => {
          return (
            <p key={item.KgRhName}>
              {item.KgRhName}: {item.Stanje}
            </p>
          );
        })}
      </div>
    );
  }

  return <p>Informacija o trenutnim kolicinama nedostupna</p>;
};

export default BloodState;
