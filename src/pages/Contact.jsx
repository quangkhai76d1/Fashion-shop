import React, { useRef } from "react";
import Helmet from "../components/Helmet";
import emailjs from "@emailjs/browser";
import productData from "../assets/fake-data/products";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import ProductCard from "../components/ProductCard";
import Grid from "../components/Grid";

const Contact = () => {
  const refForm = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_iwinoss",
        "template_yi1fe7p",
        refForm.current,
        "nlIpbZkAxa4Ew1ZA_"
      )
      .then(
        () => {
          alert("Gửi thông báo thành công");
        },
        () => {
          alert("Lỗi gửi thông báo, vui lòng gửi lại");
        }
      );
  };
  return (
    <Helmet title='Liên hệ'>
      <div className='contact'>
        <h1>Liên hệ chúng tôi</h1>
        <div className='contact__form'>
          <form action='' ref={refForm} onSubmit={sendEmail}>
            <ul>
              <li className='half'>
                <input
                  type='text'
                  name='user_name'
                  placeholder='Name'
                  required
                />
              </li>

              <li className='half'>
                <input
                  type='email'
                  name='user_email'
                  placeholder='Email'
                  required
                />
              </li>
              <li>
                <input
                  type='text'
                  name='user_product'
                  placeholder='Product'
                  required
                />
              </li>
              <li>
                <textarea
                  name='message'
                  placeholder='Message'
                  required
                ></textarea>
              </li>
              <li>
                <input
                  type='submit'
                  className='contact__form__submit'
                  value='SEND '
                />
              </li>
            </ul>
          </form>
        </div>
      </div>
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

export default Contact;
