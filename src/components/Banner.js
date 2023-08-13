import React from 'react';
import { BannerData } from './BannerData';
import './Banner.css';

function Banner() {
  return (
    <div className="Banner-Header">
    {BannerData .map((BannerData) => (
      <div key={BannerData .id} className="Banner">
        <img src={BannerData.img} alt='Banner'/>
        <p>{BannerData.banner_text}</p>
        <p>${BannerData.price}</p>
      </div>
    ))}
  </div>
);
}

export default Banner