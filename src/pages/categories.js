import Center from "@/components/front/Center";
import Header from "@/components/front/Header";
import TitleStyled from "@/components/front/Title";
import CategoryChild from "@/components/front/CategoryChild";
import { mongooseConnect } from "@/lib/mongooes";
import { Category } from "@/models/Category";
import styled from "styled-components";

const CategoriesWapperStyle = styled.div``;
const CategoriesNameStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  padding: 15px 10px;
  border-radius: 10px;
`;

export default function CategoriesPage({ categoriesParent }) {
  return (
    <>
      <Header />
      <Center>
        <TitleStyled>Categories Page</TitleStyled>
        {categoriesParent
          ? categoriesParent.map((categoryParent, iPr) => {
              return (
                <CategoriesWapperStyle key={iPr}>
                  <CategoriesNameStyle>
                    {categoryParent.name}
                  </CategoriesNameStyle>
                  <CategoryChild categoryParent={categoryParent} />
                </CategoriesWapperStyle>
              );
            })
          : null}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categoriesParent = await Category.find({ parent: { $exists: false } });
  return {
    props: {
      categoriesParent: JSON.parse(JSON.stringify(categoriesParent)),
    },
  };
}
