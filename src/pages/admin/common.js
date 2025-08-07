import { useEffect, useState } from "react";
import Layout from "../../../components/admin/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import CSTable from "../../../components/admin/CSTable";

export default function Common() {
  return (
    <Layout>
      <h1 className="cstext-heading">Common</h1>
    </Layout>
  );
}
