import React from "react";
import { Carousel, Button, Link } from "@faststore/ui";

import styles from "./styles.module.scss";

interface List {
  imageDesktop: string;
  imageMobile: string;
  name: string;
  linkName: string;
  url: string;
}
export interface BannerCarouselProps {
  list: List[];
  itemsPerPage: number;
  infiniteMode: boolean;
}

const BannerCarousel = ({
  list,
  itemsPerPage,
  infiniteMode,
}: BannerCarouselProps) => {
  return (
    <section className={styles.carouselBanners}>
      <Carousel
        itemsPerPage={itemsPerPage}
        variant="slide"
        infiniteMode={infiniteMode}
      >
        {list.map(({ imageDesktop, imageMobile, name, linkName, url }) => (
          <div className={styles.carouselBanners__item} key={url} data-fs-carousel-banner>
            <Link href={url}>
              <picture data-fs-image>
                <source
                  media="(max-width: 1280px)"
                  srcSet={imageMobile}
                />
                <source
                  media="(min-width: 1280px)"
                  srcSet={imageDesktop}
                />
                <img src={imageDesktop} alt={name} data-fs-image />
              </picture>
              <div className={styles.carouselBanners__content}>
                <h3 className={styles.carouselBanners__title}>{name}</h3>
                <Button className={styles.carouselBanners__button} variant="primary">{linkName}</Button>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default BannerCarousel;
