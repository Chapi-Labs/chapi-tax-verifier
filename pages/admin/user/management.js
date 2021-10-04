import React, { useMemo } from "react";
import absoluteUrl from "next-absolute-url";
import fetcher from "@/lib/fetchJson";
import Link from "next/link";
// components
import CardTable from "components/Cards/CardTable.js";
import withSession from "@/lib/session";
// layout for page
import Admin from "layouts/Admin.js";
import { useRouter } from "next/router";
export default function Users({ data }) {
  const router = useRouter();
  function onNew() {
    router.push("/admin/providers/new");
  }

  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Organización",
        accessor: "organization.name",
      },
    ],
    []
  );
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable
            title="Usuarios"
            columns={columns}
            data={data}
            onNewClick={onNew}
            getActions={({ _id }) => (
              <div>
                <Link href={`/users/management/edit/${_id}`}>
                  <i class="far fa-edit cursor-pointer"></i>
                </Link>
              </div>
            )}
          />
        </div>
        <div className="w-full mb-12 px-4"></div>
      </div>
    </>
  );
}

Users.layout = Admin;

export const getServerSideProps = withSession(async ({ req, res }) => {
  const { origin } = absoluteUrl(req);
  const { users } = await fetcher(`${origin}/api/user/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.cookie,
    },
  });
  return {
    props: {
      data: users,
    },
  };
});
