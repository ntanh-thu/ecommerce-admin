import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProduct from "@/components/NewProduct";
import { mongooseConnect } from "@/lib/mongooes";
import { Product } from "@/models/Products";

export default function HomePage({ featureProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured featureProduct={featureProduct} />
      <NewProduct newProducts={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featureProduct = await Product.find({ setFeature: true }, null, { sort: { _id: -1 }, limit: 10 });
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });
  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct))[0],
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
