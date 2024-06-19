import React from "react";
import { Carousel } from "@faststore/ui";
import styles from './BannerSlider.module.scss'

export interface BannerSliderProps {
  title: string;
  link: {
    text: string;
    url: string;
  };
}

export default function BannerSlider(props: BannerSliderProps) {
  return (
    <section className={styles.carouselBanners}>
      <Carousel 
        itemsPerPage={6}
        variant="scroll"
      >
        {[...Array(10)].map((_, index) => (
          <div key={index} className={styles.carouselItem}>
            {index + 1}
          </div>
        ))}
      </Carousel>
      <p>666</p>
      <h2>{props.title}</h2>
      <a href={props.link.url}>{props.link.text}</a>
    </section>
  );
}
