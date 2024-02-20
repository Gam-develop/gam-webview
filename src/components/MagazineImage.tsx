import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MagazineImage = ({ magazinePhotos }: { magazinePhotos: string[] }) => {
  const settings = {
    dots: true,
    arrows: false,
  };

  return (
    <St.MagazineImages>
      <Slider {...settings}>
        {magazinePhotos.map((url: string) => {
          return <St.MagazineImage src={url} key={url} alt="app slider" height={300} />;
        })}
      </Slider>
    </St.MagazineImages>
  );
};

export default MagazineImage;

const St = {
  MagazineImages: styled.div`
    width: 100%;

    & > .slick-slider > .slick-dots > li {
      width: 0.8rem;
      height: 0.8rem;
      background-color: ${({ theme }) => theme.colors.Gam_Gray};
      border-radius: 0.5rem;
      margin: 0 0.6rem 0 0;

      & > button {
        display: none;
      }
    }

    & > .slick-slider > .slick-dots > .slick-active {
      background-color: ${({ theme }) => theme.colors.Gam_Pink};
    }
  `,

  MagazineImage: styled.img`
    width: 100%;
    height: 345px;
  `,
};
