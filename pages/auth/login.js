import { useState } from "react";
import Form from "@/components/Login/Form";
import LoginLayout from "@/components/Login/LoginLayout";
import useUser from '@/lib/useUser';
import fetchJson from '@/lib/fetchJson';

// layout for page

export default function Login() {

  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    };

    try {
      mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setErrorMsg(error.data.message);
    }
  }
  return (
    <>
      <LoginLayout>
        <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit}></Form>
      </LoginLayout>
    </>
  );
}

