import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/api/users").then((res) => {
      setUsers(res.data);
    });
  }, []);
  return (
    <Layout>
      <h1>Users</h1>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td></td>
            <td>User Name</td>
            <td>Email</td>
            <td>Verify</td>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr>
              <td>
                <img src={user.image} alt="" className="size-6" />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.emailVerified ? user.emailVerified : "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
