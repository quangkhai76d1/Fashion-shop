import React from "react";
import Helmet from "../components/common/Helmet";

import HeroSlider from "../components/Slider/HeroSlider";
import heroSliderData from "../assets/fake-data/hero-slider";

import banner from "../assets/images/banner.png";

import Section, {
  SectionBody,
  SectionTitle,
} from "../components/common/Section";

import PolicyCard from "../components/Policy/PolicyCard";
import policy from "../assets/fake-data/policy";

import Grid from "../components/common/Grid";
import { Link } from "react-router-dom";

import productData from "../assets/fake-data/products";
import ProductCard from "../components/Product/ProductCard";

const Home = () => {
  return (
    <Helmet title='Trang chủ'>
      {/* hero slide */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={true}
        timeOut={5000}
      />
      {/* end hero slide */}
      {/* Policy card*/}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to='/policy'>
                <PolicyCard
                  name={item.name}
                  icon={item.icon}
                  desc={item.description}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* End policy card */}

      {/* Top product */}
      <Section>
        <SectionTitle>Sản phẩm bán chạy</SectionTitle>
        <SectionBody>
          <Grid col={4} smCol={1} mdCol={2} gap={20}>
            {productData.getProducts(4).map((item, index) => (
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
      {/* End top product */}
      {/* new product */}
      <Section>
        <SectionTitle>Sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid col={4} smCol={1} mdCol={2} gap={20}>
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
      {/* end new product */}
      {/* banner product */}
      <Section>
        <SectionBody>
          <Link to='/catalog'>
            <img src={banner} alt='' />
          </Link>
        </SectionBody>
      </Section>
      {/* end banner product */}
      {/* popular product */}
      <Section>
        <SectionTitle>Phổ biến</SectionTitle>
        <SectionBody>
          <Grid col={4} smCol={1} mdCol={2} gap={20}>
            {productData.getProducts(12).map((item, index) => (
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
      {/* end popular product */}
    </Helmet>
  );
};

export default Home;
