import { FormEvent, useState } from 'react';
import { inferMutationOutput, trpc } from '../utils/trpc';

const onTokenSuccess = (data: inferMutationOutput<'auth.validate'>) => {
  if (data.ok) {
    localStorage.setItem('token', data.token);
  }
};

const LoginForm = () => {
  const [phone, setPhone] = useState('+38766883112');
  const startValidation = trpc.useMutation('auth.startValidation', {
    onError: (error) => {
      window.alert(error.message);
    },
    onSuccess: onTokenSuccess,
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
  const [code, setCode] = useState('');
  const startValidation = trpc.useMutation('auth.validate', {
    onError: (error) => {
      window.alert(error.message);
    },
    onSuccess: onTokenSuccess,
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

export { LoginForm, ValidationForm };
