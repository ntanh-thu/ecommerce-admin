import { useEffect, useState } from "react";
import Layout from "../../../components/admin/Layout";
import axios from "axios";
import CSTable from "../../../components/admin/CSTable";
import Image from "next/image";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("/api/admin/users").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <CSTable
        loading={loading}
        header={{
          image: "",
          name: "User Name",
          email: "Email",
          emailVerified: "Verify",
        }}
        body={users.map((user) => {
          return {
            ...user,
            image: user.image ? (
              <Image
                src={user.image}
                alt=""
                className="rounded-full"
                width={24}
                height={24}
              />
            ) : (
              "--"
            ),
            emailVerified: (
              <>{user.emailVerified ? user.emailVerified : "--"}</>
            ),
          };
        })}
      />
    </Layout>
  );
}
