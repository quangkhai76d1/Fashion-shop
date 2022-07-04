import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";
import { withRouter } from "react-router";

import { useDispatch } from "react-redux";
import { addItem } from "../../redux/shopping-cart/cartItemsSlice";

const ProductView = (props) => {
  const dispatch = useDispatch();

  let product = props.product;

  if (product === undefined)
    product = {
      price: 0,
      title: "",
      colors: [],
      size: [],
    };

  const [imageView, setImageView] = useState(product.image01);

  const [showContent, setShowContent] = useState(false);

  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setImageView(product.image01);
    setShowContent(undefined);
    setQuantity(1);
    setSize(undefined);
  }, [product]);

  const check = () => {
    if (color === undefined) {
      alert("Vui lòng chọn màu sắc");
      return false;
    }

    if (size === undefined) {
      alert("Vui lòng chọn kích cỡ");
      return false;
    }
    return true;
  };

  const addToCart = () => {
    if (check()) {
      dispatch(
        addItem({
          slug: product.slug,
          color: color,
          size: size,
          quantity: quantity,
          price: product.price,
        })
      );
      alert("Thêm vào giỏ hàng thành công");
    }
  };

  const goToCart = () => {
    dispatch(
      addItem({
        slug: product.slug,
        color: color,
        size: size,
        quantity: quantity,
        price: product.price,
      })
    );
    if (check()) props.history.push("/cart");
  };
  return (
    <div className='product'>
      <div className='product__image'>
        <div className='product__image__list'>
          <div
            className='product__image__list__item'
            onClick={() => setImageView(product.image01)}
          >
            <img src={product.image01} alt='' />
          </div>
          <div
            className='product__image__list__item'
            onClick={() => setImageView(product.image02)}
          >
            <img src={product.image02} alt='' />
          </div>
        </div>
        <div className='product__image__main'>
          <img src={imageView} alt='' />
        </div>

        <div className={`product-desc ${showContent ? "expand" : ""}`}>
          <div className='product-desc__title'>Chi tiết sản phẩm</div>
          <div
            className='product-desc__content'
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className='product-desc__toggle'>
            <Button size='sm' onClick={() => setShowContent(!showContent)}>
              {!showContent ? "Xem thêm" : "Thu gọn"}
            </Button>
          </div>
        </div>
      </div>

      <div className='product__info '>
        <h1 className='product__info__title'>{product.title}</h1>

        <div className='product__info__item'>
          <span className='product__info__item__price'>
            {Number(product.price)}
          </span>
        </div>

        <div className='product__info__item'>
          <div className='product__info__item__title'>Màu sắc</div>
          <div className='product__info__item__list'>
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => setColor(item)}
              >
                <div className={`circle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className='product__info__item'>
          <div className='product__info__item__title'>Kích cỡ</div>
          <div className='product__info__item__list'>
            {product.size.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => setSize(item)}
              >
                <span className='product__info__item__list__item__size'>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='product__info__item'>
          <div className='product__info__item__title'>Số lượng</div>
          <div className='product__info__item__quantity'>
            <div
              className='product__info__item__quantity__btn'
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              <i className='bx bx-minus'></i>
            </div>
            <div className='product__info__item__quantity__input'>
              {quantity}
            </div>
            <div
              className='product__info__item__quantity__btn'
              onClick={() => setQuantity(quantity + 1)}
            >
              <i className='bx bx-plus'></i>
            </div>
          </div>
        </div>

        <div className='product__info__item'>
          <Button onClick={addToCart}>Thêm vào giỏ hàng</Button>
          <Button onClick={goToCart}>Mua ngay</Button>
        </div>
      </div>

      <div className={`product-desc mobile ${showContent ? "expand" : ""}`}>
        <div className='product-desc__title'>Chi tiết sản phẩm</div>
        <div
          className='product-desc__content'
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <div className='product-desc__toggle'>
          <Button size='sm' onClick={() => setShowContent(!showContent)}>
            {!showContent ? "Xem thêm" : "Thu gọn"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
