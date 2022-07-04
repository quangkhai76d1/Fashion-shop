import React from "react";
import Helmet from "../components/common/Helmet";
import productData from "../assets/fake-data/products";
import Section, {
  SectionBody,
  SectionTitle,
} from "../components/common/Section";
import Grid from "../components/common/Grid";
import ProductCard from "../components/Product/ProductCard";
import ProductView from "../components/Product/ProductView";

const Product = (props) => {
  const product = productData.getProductBySlug(props.match.params.slug);

  return (
    <Helmet title={product.title}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>

      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProducts(8).map((item, index) => (
              <ProductCard
                key={index}
                name={item.title}
                img01={item.image01}
                img02={item.image02}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Product;
