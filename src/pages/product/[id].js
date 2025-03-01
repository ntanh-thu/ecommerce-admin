import WhiteBox from "@/components/front/Box";
import Button from "@/components/front/Button";
import { CartContext } from "@/components/front/CartContext";
import Center from "@/components/front/Center";
import Header from "@/components/front/Header";
import ProductImages from "@/components/front/ProductImages";
import TitleStyled from "@/components/front/Title";
import { mongooseConnect } from "@/lib/mongooes";
import { Product } from "@/models/Products";
import { useContext } from "react";
import styled from "styled-components";

const ColWapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWapper>
          <WhiteBox>
            <ProductImages images={product?.images} />
          </WhiteBox>
          <div>
            <TitleStyled>{product?.title}</TitleStyled>
            <p>{product?.description}</p>
            <PriceRow>
              <div>
                <Price>${product?.price}</Price>
              </div>
              <div>
                <Button $primary onClick={() => addProduct(product?._id)}>
                  Add to Cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
