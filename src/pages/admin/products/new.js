import Layout from "@/components/admin/Layout";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProduct() {
  return (
    <Layout>
      <h1 className="cstext-heading">New Product</h1>
      <ProductForm />
    </Layout>
  );
}
