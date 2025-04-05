import styled from "styled-components";
import ProductBox from "./ProductBox";
import { useEffect, useState } from "react";
import axios from "axios";

const StyledProductsGrid = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 30px;
  padding: 10px;
  margin: -10px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsRow({ category = "", onHidden = () => {} }) {
  const [products, setProducts] = useState([]);
  const fetchProducts = () => {
    axios
      .post("/api/admin/products", { category: category })
      .then((res) => {
        if (res.data.length === 0) {
          onHidden();
        } else {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <StyledProductsGrid>
      {products.length
        ? products.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))
        : null}
    </StyledProductsGrid>
  );
}
