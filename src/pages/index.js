import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";

export default function Home() {
  const { data: sesssion } = useSession();
  if (!sesssion) return <Layout />;
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2 className="text-blue-900 ">
          Hello, <b>{sesssion?.user?.email}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg over">
          <img src={sesssion?.user?.image} alt="" className="w-6 h-6" />
          <span className="px-2">{sesssion?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
