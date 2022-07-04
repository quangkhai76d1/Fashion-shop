import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

const ImageSlider = ({ slides, auto, timeOuts }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeOut = timeOuts ? timeOuts : 3000;

  //nextSlide
  const nextSlide = useCallback(() => {
    const index = current + 1 === length ? 0 : current + 1;
    setCurrent(index);
  }, [current, length]);

  //prevSlide
  const prevSlide = () => {
    const index = current - 1 < 0 ? length - 1 : current - 1;
    setCurrent(index);
  };

  useEffect(() => {
    if (auto) {
      const slideAuto = setInterval(() => {
        nextSlide();
      }, timeOut);
      return () => {
        clearInterval(slideAuto);
      };
    }
  });

  if (!Array.isArray(slides) || length <= 0) {
    return null;
  }

  ImageSlider.propTypes = {
    slides: PropTypes.array.isRequired,
    auto: PropTypes.bool,
    timeOut: PropTypes.number,
  };
  return (
    <section className='slider'>
      <div className='slider__item slider__item__left' onClick={prevSlide}>
        <i className='bx bxs-left-arrow-circle'></i>
      </div>
      <div className='slider__item slider__item__right' onClick={nextSlide}>
        <i className='bx bxs-right-arrow-circle'></i>
      </div>

      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={slide.img} alt='' className='image' />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
