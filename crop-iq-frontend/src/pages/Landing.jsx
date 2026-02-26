import React from 'react';
import Header from '../components/layout/Header';
import AgroVoiceMic from '../components/voice/AgroVoiceMic';
import CategoryGrid from '../components/dashboard/CategoryGrid';
import MandiPriceCarousel from '../components/dashboard/MandiPriceCarousel';

const Landing = () => {
  return (
    <>
      <Header />
      <AgroVoiceMic />
      <CategoryGrid />
      <MandiPriceCarousel />
    </>
  );
};

export default Landing;