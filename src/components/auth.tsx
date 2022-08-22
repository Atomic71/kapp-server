import { FormEvent, useState } from 'react';
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

const LoginForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [phone, setPhone] = useState('+38766883112');
  const utils = trpc.useContext();
  const startValidation = trpc.useMutation('auth.startValidation', {
    onError: (error) => {
      window.alert(error.message);
    },
    onSuccess: () => {
      standardTokenSuccess(utils);
      if (onLogin) onLogin();
    },
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
const ValidationForm: React.FC<{ onSendAgain: () => void }> = ({
  onSendAgain,
}) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={code}
          className='border border-green-500 p-4'
          onChange={(e) => setCode(e.target.value)}
        />
        <input type='submit' />
      </form>
      <button type='button' onClick={() => onSendAgain()}>
        Ponovo unesi broj
      </button>
    </div>
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
enum Widget {
  Login = 1,
  Validation,
}

const { Login, Validation } = Widget;

type AuthWidgetProps = {
  initialWidget: Widget;
};

const AuthWidget: React.FC<AuthWidgetProps> = ({ initialWidget }) => {
  const [selectedWidget, setSelectedWidget] = useState<Widget>(
    initialWidget || Login
  );
  return (
    <div>
      {selectedWidget === Login && (
        <h3>
          Login:
          <LoginForm
            onLogin={() => {
              setSelectedWidget(Validation);
            }}
          />
        </h3>
      )}

      {selectedWidget === Validation && (
        <h3>
          Validacija:
          <ValidationForm onSendAgain={() => setSelectedWidget(Login)} />
        </h3>
      )}
    </div>
  );
};
export { AuthWidget, LogoutCta };
