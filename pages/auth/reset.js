import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Form from '@/components/Auth/ResetForm';
import LoginLayout from '@/components/Auth/LoginLayout';
import fetchJson from '@/lib/fetchJson';
import absoluteUrl from 'next-absolute-url';

export default function Reset({ token, email }) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const password = e.currentTarget.password.value;

    try {
      await fetchJson('/api/auth/reset/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, password }),
      });
      return router.push('/auth/login');
    } catch (error) {
      setErrorMsg(error.data.message);
    }
    setLoading(false);
  };
  return (
    <LoginLayout>
      <Form
        isLogin
        errorMessage={errorMsg}
        onSubmit={handleSubmit}
        loading={loading}
        email={email}
      ></Form>
    </LoginLayout>
  );
}

export const getServerSideProps = async ({ query }) => {
  if (!query.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }
  const { origin } = absoluteUrl(req);
  const { email } = await fetchJson(`${origin}/api/auth/reset/info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: query.token }),
  });
  return {
    props: {
      token: query.token,
      email: email,
    },
  };
};
