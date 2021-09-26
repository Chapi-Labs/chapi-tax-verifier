import React, { useState } from "react";
import { useRouter } from "next/router";
import SignUpLayout from "@/components/SignUp/SignUpLayout";
import Form from "@/components/SignUp/Form";
import fetchJson from "@/lib/fetchJson";

export default function Register() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(undefined);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const name = e.currentTarget.name.value;
    const organization = e.currentTarget.organization.value;

    try {
      const r = await fetchJson("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organization, email, password, name }),
      });
      return router.push("/");
    } catch (error) {
      setErrorMsg(error.data.message);
    }
    setLoading(false);
  };
  return (
    <SignUpLayout>
      <Form
        isLogin
        errorMessage={errorMsg}
        onSubmit={handleSubmit}
        loading={loading}
      ></Form>
    </SignUpLayout>
  );
}
