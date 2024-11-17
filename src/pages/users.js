import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import CSTable from "../../components/CSTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("/api/users").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <CSTable
        loading={loading}
        header={{ image: "", name: "User Name", email: "Email", emailVerified: "Verify" }}
        body={users.map((user) => {
          return {
            ...user,
            image: user.image ? <img src={user.image} alt="" className="size-6 rounded-full" /> : "--",
            emailVerified: <>{user.emailVerified ? user.emailVerified : "--"}</>,
          };
        })}
      />
    </Layout>
  );
}
