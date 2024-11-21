import { useSession } from "next-auth/react";
import Layout from "../../../components/admin/Layout";

export default function Home() {
  const { data: sesssion } = useSession();
  if (!sesssion) return <Layout />;
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2 className="text-blue-900 ">
          Hello, <b>{sesssion?.user?.email}</b>
        </h2>
      </div>
    </Layout>
  );
}
