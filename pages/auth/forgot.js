import { useState } from 'react';
import Form from '@/components/Auth/ForgotForm';
import LoginLayout from '@/components/Auth/LoginLayout';
import fetchJson from '@/lib/fetchJson';

export default function Forgot() {
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg();
    const body = {
      email: e.currentTarget.email.value,
    };

    try {
      const { message } = await fetchJson('/api/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (message) {
        setErrorMsg(message);
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setErrorMsg(error.data.message);
    }
    setLoading(false);
  }
  return (
    <>
      <LoginLayout title="Recuperar Contraseña">
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
