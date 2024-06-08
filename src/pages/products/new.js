import { useState } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import ProductForm from "../../../components/ProductForm";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goToProduct, setGoToProduct] = useState(false);
  const router = useRouter();

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data);
    setGoToProduct(true);
  }
  if (goToProduct) {
    router.push("/products");
  }
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
}
