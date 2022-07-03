import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo-2.png";
import { useSelector } from "react-redux";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },

  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);

  const cartItems = useSelector((state) => state.cartItems.value);
  const [totalProduct, setTotalProduct] = useState(0);
  useEffect(() => {
    setTotalProduct(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);
  //shrink nav
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const menuLeft = useRef(null);
  const handleActiveMenuLeft = () => {
    menuLeft.current.classList.toggle("active");
  };

  return (
    <div className='header' ref={headerRef}>
      <div className='container'>
        <div className='header__logo'>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <div className='header__menu'>
          <div
            className='header__menu__mobile-toggle'
            onClick={handleActiveMenuLeft}
          >
            <i className='bx bx-menu-alt-left'></i>
          </div>
          <div className='header__menu__left' ref={menuLeft}>
            <div
              className='header__menu__left__close'
              onClick={handleActiveMenuLeft}
            >
              <i className='bx bx-chevron-left'></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={handleActiveMenuLeft}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>

          <div className='header__menu__right'>
            <div className='header__menu__item header__menu__right__item'>
              <i className='bx bx-search-alt'></i>
            </div>
            <div className='header__menu__item header__menu__right__item'>
              <Link to='/cart'>
                <i className='bx bxs-cart-alt icon'></i>
                <span className='bag'>{Number(totalProduct)}</span>
              </Link>
            </div>
            <div className='header__menu__item header__menu__right__item'>
              <i className='bx bx-user'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
