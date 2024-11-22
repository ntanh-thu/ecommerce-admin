import { useState } from "react";
import Layout from "@/components/admin/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goToProduct, setGoToProduct] = useState(false);
  const router = useRouter();

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/admin/products", data);
    setGoToProduct(true);
  }
  if (goToProduct) {
    router.push("/admin/products");
  }
  return (
    <Layout>
      <h1 className="cstext-heading">New Product</h1>
      <ProductForm />
    </Layout>
  );
}
