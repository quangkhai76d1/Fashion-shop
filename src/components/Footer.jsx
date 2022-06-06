import React from "react";
import logo from "../assets/images/logo-1.png";
import { Link } from "react-router-dom";

import Grid from "./Grid";

const FooterAboutLinks = [
  {
    display: "Giới thiệu",
    path: "/about",
  },
  {
    display: "Liên hệ",
    path: "/about",
  },
  {
    display: "Tuyển dụng",
    path: "/about",
  },
  {
    display: "Tin tức",
    path: "/about",
  },
  {
    display: "Hệ thống cửa hàng",
    path: "/about",
  },
];
const FooterCustomLinks = [
  {
    display: "Chính sách đổi trả",
    path: "/about",
  },
  {
    display: "Chính sách bảo hành",
    path: "/about",
  },
  {
    display: "Chính sách hoàn tiền",
    path: "/about",
  },
];

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className='footer__title'>
              <p>TỔNG ĐÀI HÔ TRỢ</p>
            </div>
            <div className='footer__content'>
              <p>
                Liên hệ đặt hàng: <strong>0987654321</strong>
              </p>
              <p>
                Thắc mắc đơn hàng: <strong>0987654321</strong>
              </p>
              <p>
                Góp ý khiếu nại: <strong>0987654321</strong>
              </p>
            </div>
          </div>

          <div>
            <div className='footer__title'>
              <p>Về KhaiShop</p>
            </div>
            <div className='footer__content'>
              {FooterAboutLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>

          <div>
            <div className='footer__title'>
              <p>CHĂM SÓC KHÁCH HÀNG</p>
            </div>
            <div className='footer__content'>
              {FooterCustomLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>

          <div className='footer__about'>
            <p>
              <Link to='/'>
                <img src={logo} alt='KhaiShop' className='footer__logo' />
              </Link>
            </p>
            <div className='footer__content'>
              <p>
                Hướng đến mục tiêu đáp ứng thời trang mỗi ngày của mọi người.
                Hãy cùng KhaiShop hướng đến một cuộc sống năng động tích cực
                hơn.
              </p>
            </div>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
