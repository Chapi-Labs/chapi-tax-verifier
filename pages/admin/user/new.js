import Admin from "layouts/Admin.js";
import ProviderForm from "@/components/Forms/ProviderForm.js";
import { useState } from "react";
import { useRouter } from "next/router";
import fetcher from "@/lib/fetchJson";
import useUser from "@/lib/useUser";

export default function Settings({ organizations }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function saveNew(data) {
    setLoading(true);
    setErrorMsg();
    try {
      const { message } = await fetcher("/api/user/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (message) {
        setErrorMsg(message);
      }
      router.push("/admin/user/management");
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <ProviderForm
            title="Usuario"
            subtitle="Crear Nuevo"
            onSubmit={saveNew}
            organizations={organizations}
          />
        </div>
      </div>
    </>
  );
}

Settings.layout = Admin;
