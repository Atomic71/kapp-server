import { FormEvent, useState } from 'react';
import { inferMutationOutput, trpc } from '../utils/trpc';

type LoginFormProps = {
  onLogin: (data: inferMutationOutput<'auth.startValidation'>) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('+38766883112');
  const startValidation = trpc.useMutation('auth.startValidation', {
    onError: (error) => {
      window.alert(error.message);
    },
    onSuccess: onLogin,
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

type ValidationFormProps = {
  onValidate: (data: inferMutationOutput<'auth.validate'>) => void;
  onSendAgain: () => void;
};
const ValidationForm: React.FC<ValidationFormProps> = ({
  onSendAgain,
  onValidate,
}) => {
  const [code, setCode] = useState('');
  const startValidation = trpc.useMutation('auth.validate', {
    onError: (error) => {
      window.alert(error.message);
    },
    onSuccess: onValidate,
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

type LogoutCtaProps = {
  onLogout: (data: inferMutationOutput<'auth.logout'>) => void;
};
const LogoutCta: React.FC<LogoutCtaProps> = ({ onLogout }) => {
  const logout = trpc.useMutation(['auth.logout'], {
    onSuccess: onLogout,
  });

  return (
    <button
      type='button'
      onClick={() => {
        logout.mutate();
      }}
    >
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
  initialWidget?: Widget;
  onTokenChange: () => void;
};
const setToken = (token: string) => {
  localStorage.setItem('token', token);
};
const AuthWidget: React.FC<AuthWidgetProps> = ({
  initialWidget,
  onTokenChange,
}) => {
  const [selectedWidget, setSelectedWidget] = useState<Widget>(
    initialWidget || Login
  );

  const handleSetToken = ({
    ok,
    token,
  }: {
    ok: boolean;
    token: string | null;
  }) => {
    if (ok && token) {
      setToken(token);
      onTokenChange();
    }
  };

  return (
    <div>
      {selectedWidget === Login && (
        <h3>
          Login:
          <LoginForm onLogin={handleSetToken} />
        </h3>
      )}

      {selectedWidget === Validation && (
        <h3>
          Validacija:
          <ValidationForm
            onValidate={handleSetToken}
            onSendAgain={() => setSelectedWidget(Login)}
          />
        </h3>
      )}
    </div>
  );
};
export { AuthWidget, LogoutCta };
