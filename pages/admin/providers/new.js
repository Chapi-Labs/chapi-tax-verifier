import Admin from "layouts/Admin.js";
import ProviderForm from "@/components/Forms/ProviderForm.js";
import { useState } from "react";
import { useRouter } from "next/router";
import fetcher from "@/lib/fetchJson";
import useUser from "@/lib/useUser";

export default function Settings() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  console.log(user);
  async function saveNew(data) {
    setLoading(true);
    setErrorMsg();
    try {
      const { message } = await fetcher("/api/provider/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (message) {
        setErrorMsg(message);
      }
      router.push("/admin/providers/list");
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
            title="Proveedor"
            subtitle="Crear Nuevo"
            onSubmit={saveNew}
            organization={user?.organization?.name}
          />
        </div>
      </div>
    </>
  );
}

Settings.layout = Admin;
