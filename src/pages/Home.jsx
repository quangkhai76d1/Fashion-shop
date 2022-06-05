import React from "react";
import Helmet from "../components/Helmet";

import HeroSlider from "../components/HeroSlider";
import heroSliderData from "../assets/fake-data/hero-slider";

import Section, { SectionTitle, SectionBody } from "../components/Section";

import PolicyCard from "../components/PolicyCard";
import policy from "../assets/fake-data/policy";

import Grid from "../components/Grid";

const Home = () => {
  return (
    <Helmet title='Trang chủ'>
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={true}
        timeOut={5000}
      />
      <Section>
        <Grid col={4} mdCol={2} smCol={1} gap={20}>
          <SectionBody>
            {policy.map((item, index) => (
              <PolicyCard
                key={index}
                name={item.name}
                icon={item.icon}
                desc={item.description}
              />
            ))}
          </SectionBody>
        </Grid>
      </Section>
    </Helmet>
  );
};

export default Home;
