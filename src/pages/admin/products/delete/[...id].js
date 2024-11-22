import { useRouter } from "next/router";
import Layout from "@/components/admin/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/api/admin/products?id=" + id)
      .then((response) => setProductInfo(response.data));
  }, []);
  function goBack() {
    router.push("/admin/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/admin/products?id=" + id);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &nbsp; &quot;{productInfo?.title}&quot; ?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button onClick={goBack} className="btn-default">
          NO
        </button>
      </div>
    </Layout>
  );
}
