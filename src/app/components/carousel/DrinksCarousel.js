'use client';

import Slider from 'react-slick';
import Drink from '../drinks/drinks';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const   DrinksCarousel = ({ drinks }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="pb-5 mx-10 text-center -z-50">
      <Slider {...settings}>
        {drinks.map((drink) => (
          <div key={drink.id} className="">
            <Drink name={drink.product_name} price={drink.product_price} id={drink.id} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DrinksCarousel;
