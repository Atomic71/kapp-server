import { TRPCContextState } from '@trpc/react/dist/declarations/src/internals/context';
import { FormEvent, useState } from 'react';
import { AppRouter } from '../server/router';
import { inferMutationOutput, trpc } from '../utils/trpc';

const onTokenSuccess =
  (cb?: () => void) =>
  (
    data: inferMutationOutput<
      'auth.validate' | 'auth.logout' | 'auth.startValidation'
    >
  ) => {
    if (data.ok) {
      localStorage.setItem('token', data.token);
      if (cb) {
        cb();
      }
    }
  };

const standardTokenSuccess = (utils = trpc.useContext()) =>
  onTokenSuccess(() => {
    utils.refetchQueries(['user.me']);
  });

const LoginForm = () => {
  const [phone, setPhone] = useState('+38766883112');
  const startValidation = trpc.useMutation('auth.startValidation', {
    onError: (error) => {
      window.alert(error.message);
    },
    onSuccess: standardTokenSuccess(trpc.useContext()),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startValidation.mutate({ phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={phone}
        className='border border-green-500 p-4'
        onChange={(e) => setPhone(e.target.value)}
      />
      <input type='submit' />
    </form>
  );
};
const ValidationForm = () => {
  const utils = trpc.useContext();
  const [code, setCode] = useState('');
  const startValidation = trpc.useMutation('auth.validate', {
    onError: (error) => {
      window.alert(error.message);
    },
    onSuccess: standardTokenSuccess(utils),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startValidation.mutate({ code });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={code}
        className='border border-green-500 p-4'
        onChange={(e) => setCode(e.target.value)}
      />
      <input type='submit' />
    </form>
  );
};
const LogoutCta = () => {
  const utils = trpc.useContext();
  const logout = trpc.useMutation(['auth.logout'], {
    onSuccess: standardTokenSuccess(utils),
  });
  const handleLogout = () => {
    logout.mutateAsync();
  };
  return (
    <button className='p-4 bg-red-200' type='button' onClick={handleLogout}>
      Izloguj se
    </button>
  );
};
export { LoginForm, ValidationForm, LogoutCta };
