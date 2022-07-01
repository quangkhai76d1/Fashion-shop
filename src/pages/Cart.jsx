import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import productData from "../assets/fake-data/products";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.value);
  console.log(productData.getCartItemsInfo(cartItems));

  const [cartProducts, setCartProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(productData.getCartItemsInfo(cartItems));
    setTotalProduct(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      )
    );
  }, [cartItems]);

  return (
    <Helmet title='Giỏ hàng'>
      <div className='cart'>
        <div className='cart__info'>
          <div className='cart__info__txt'>
            <p>
              Bạn đang có <strong>{totalProduct}</strong> sản phẩm trong giỏ
              hàng
            </p>
            <div className='cart__info__txt__price'>
              <span>Tổng cộng: </span>
              <span>{Number(totalPrice)}đ</span>
            </div>
          </div>

          <div className='cart__info__btn'>
            <Button size='block'>Đặt hàng({Number(totalProduct)})</Button>
            <Link to='/catalog'>
              <Button size='block'>Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className='cart__list'>
          {cartProducts.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
      <Section>
        <SectionTitle>Có thể bạn muốn mua</SectionTitle>
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

export default Cart;
