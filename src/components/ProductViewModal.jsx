import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import productData from "../assets/fake-data/products";
import { remove } from "../redux/product-modal/ProductModalSilce";
import Button from "./Button";
import ProductView from "./ProductView";

const ProductViewModal = () => {
  const dispatch = useDispatch();

  const productSlug = useSelector((state) => {
    return state.productModal.value;
  });

  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    setProduct(productData.getProductBySlug(productSlug));
  }, [productSlug]);

  // const product = productData.getProductBySlug("ao-thun-dinosaur-02");

  return (
    <div
      className={`product-view-modal ${product === undefined ? "" : "active"}`}
    >
      <div className='product-view-modal__content'>
        <ProductView product={product} />
        <div className='product-view-modal__content__close'>
          <Button size='sm' onClick={() => dispatch(remove())}>
            đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
