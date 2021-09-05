import { useState } from 'react';
import Form from '@/components/Auth/LoginForm';
import LoginLayout from '@/components/Auth/LoginLayout';
import useUser from '@/lib/useUser';
import fetchJson from '@/lib/fetchJson';

// layout for page

export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      mutateUser(
        await fetchJson('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setErrorMsg(error.data.message);
    }
    setLoading(false);
  }
  return (
    <>
      <LoginLayout title="Ingresar con correo y contraseña">
        <Form
          isLogin
          errorMessage={errorMsg}
          onSubmit={handleSubmit}
          disabled={loading}
        ></Form>
      </LoginLayout>
    </>
  );
}
