import React, { useCallback, useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import Grid from "../components/Grid";
import InfinityList from "../components/InfinityList";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import PolicyCard from "../components/PolicyCard";

import productData from "../assets/fake-data/products";
import category from "../assets/fake-data/category";
import colors from "../assets/fake-data/product-color";
import policy from "../assets/fake-data/policy";
import size from "../assets/fake-data/product-size";

import Section, { SectionBody } from "../components/Section";

import ImageSlider from "../components/ImageSlider";
import sliderData from "../assets/fake-data/sliderdata";

const Catalog = () => {
  const refWidget = useRef(null);

  const productList = productData.getAllProducts();

  const [products, setProducts] = useState(productList);

  const initFilter = {
    category: [],
    color: [],
    size: [],
  };

  const [filters, setFilters] = useState(initFilter);

  const filterProduct = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilters({
            ...filters,
            category: [...filters.category, item.categorySlug],
          });
          break;
        case "COLOR":
          setFilters({ ...filters, color: [...filters.color, item.color] });
          break;
        case "SIZE":
          setFilters({ ...filters, size: [...filters.size, item.size] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filters.category.filter(
            (e) => e !== item.categorySlug
          );
          setFilters({ ...filters, category: newCategory });
          break;
        case "COLOR":
          const newColor = filters.color.filter((e) => e !== item.color);
          setFilters({ ...filters, color: newColor });
          break;
        case "SIZE":
          const newSize = filters.size.filter((e) => e !== item.size);
          setFilters({ ...filters, size: newSize });
          break;
        default:
      }
    }
  };

  const clearFilter = () => {
    setFilters(initFilter);
  };

  const updateProducts = useCallback(() => {
    let temp = productList;

    if (filters.category.length > 0) {
      temp = temp.filter((e) => filters.category.includes(e.categorySlug));
    }

    if (filters.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) => filters.color.includes(color));
        console.log(check);
        return check !== undefined;
      });
    }

    if (filters.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((size) => filters.size.includes(size));
        console.log(check);
        return check !== undefined;
      });
    }

    setProducts(temp);
  }, [filters, productList]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const showFilterWidget = () => refWidget.current.classList.toggle("active");
  return (
    <Helmet title='Sản phẩm'>
      {/* {console.log(filters, products)} */}

      <ImageSlider slides={sliderData} auto={false} timeOuts={5000} />

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

      <div className='catalog'>
        <div className='catalog__filter' ref={refWidget}>
          <div className='catalog__filter__close' onClick={showFilterWidget}>
            <i className='bx bx-arrow-back'></i>
          </div>
          <div className='catalog__filter__widget'>
            <div className='catalog__filter__widget--title'>
              Danh mục sản phẩm
            </div>
            <div className='catalog__filter__widget--content'>
              {category.map((item, index) => (
                <div
                  key={index}
                  className='catalog__filter__widget--content--item'
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterProduct("CATEGORY", input.checked, item)
                    }
                    checked={filters.category.includes(item.categorySlug)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='catalog__filter__widget'>
            <div className='catalog__filter__widget--title'>Màu sắc</div>
            <div className='catalog__filter__widget--content'>
              {colors.map((item, index) => (
                <div
                  key={index}
                  className='catalog__filter__widget--content--item'
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterProduct("COLOR", input.checked, item)
                    }
                    checked={filters.color.includes(item.color)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='catalog__filter__widget'>
            <div className='catalog__filter__widget--title'>Size</div>
            <div className='catalog__filter__widget--content'>
              {size.map((item, index) => (
                <div
                  key={index}
                  className='catalog__filter__widget--content--item'
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterProduct("SIZE", input.checked, item)
                    }
                    checked={filters.size.includes(item.size)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='catalog__filter__widget'>
            <div className='catalog__filter__widget--content'>
              <Button size='sm' onClick={clearFilter}>
                Xoá bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className='catalog__filter__toggle'>
          <Button size='sm' onClick={showFilterWidget}>
            Bộ lọc
          </Button>
        </div>
        <div className='catalog__content'>
          <InfinityList data={products} />
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
