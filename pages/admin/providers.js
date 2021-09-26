import React, { useMemo } from "react";
import absoluteUrl from "next-absolute-url";
import fetcher from "@/lib/fetchJson";
// components
import CardTable from "components/Cards/CardTable.js";
import withSession from "@/lib/session";
// layout for page
import Admin from "layouts/Admin.js";

export default function Providers({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Nit",
        accessor: "nit",
      },
    ],
    []
  );

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable title="Proveedores" columns={columns} data={data} />
        </div>
        <div className="w-full mb-12 px-4"></div>
      </div>
    </>
  );
}

Providers.layout = Admin;

export const getServerSideProps = withSession(async ({ req, res }) => {
  const { origin } = absoluteUrl(req);
  const { providers } = await fetcher(`${origin}/api/provider/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.cookie,
    },
  });
  return {
    props: {
      data: providers,
    },
  };
});
