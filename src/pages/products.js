import Center from "@/components/front/Center";
import Header from "@/components/front/Header";
import ProductsGrid from "@/components/front/ProductsGrid";
import TitleStyled from "@/components/front/Title";
import { mongooseConnect } from "@/lib/mongooes";
import { Product } from "@/models/Products";

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <TitleStyled>All product</TitleStyled>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
