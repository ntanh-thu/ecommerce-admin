import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ProductsRow from "./ProductsRow";

const CategoryChildStyle = styled.div`
  padding-bottom: 10px;
`;

const CategoryName = styled.div`
  font-size: 16px;
  margin: 20px 0;
`;

export default function CategoryChild({ categoryParent }) {
  const [categoriesChild, setCategoriesChild] = useState([]);
  const [categoriesHidden, setCategoriesHidden] = useState([]);
  const getProductsOfCategory = () => {
    axios
      .post("/api/admin/category", { id: categoryParent._id })
      .then((res) => {
        setCategoriesChild(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProductsOfCategory();
  }, []);

  return categoriesChild
    ? categoriesChild.map((category, i) => (
        <CategoryChildStyle
          key={i}
          style={{
            display: categoriesHidden.some((item) => item === category._id)
              ? "none"
              : "",
          }}
        >
          <CategoryName>{category.name}</CategoryName>
          <ProductsRow
            category={category._id}
            onHidden={() => {
              setCategoriesHidden((cate) => [...cate, category._id]);
            }}
          />
        </CategoryChildStyle>
      ))
    : null;
}
