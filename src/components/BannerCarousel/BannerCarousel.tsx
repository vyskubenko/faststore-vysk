import React, {useState} from "react";
import { Carousel, Button, Link } from "@faststore/ui";
// @ts-ignore next-line
import { Image_unstable as Image } from "@faststore/core/experimental";


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

  const [dimensions, setDimensions] = useState({dimensions: {}} as any)

  const onImgLoad = function(img:any) {
    setDimensions({height:img.target.height, width:img.target.width});
  }

  return (
    <section className={styles.carouselBanners}>
      <Carousel
        itemsPerPage={itemsPerPage}
        variant="slide"
        infiniteMode={infiniteMode}
      >
        {list.map(({ imageDesktop, imageMobile, name, linkName, url }, i) => (
          <div className={styles.carouselBanners__item} key={url} data-fs-carousel-banner>
            <Link href={url}>
              <picture>
                <source
                  media="(max-width: 1280px)"
                  srcSet={imageMobile}
                />
                <source
                  media="(min-width: 1280px)"
                  srcSet={imageDesktop}
                />

                <Image
                  preload
                  data-fs-image
                  src={imageDesktop}
                  width={dimensions.width||1000}
                  height={dimensions.height||500}
                  alt={name}
                  priority={!i ? true : false}
                  loading="eager"
                  onLoad={onImgLoad}
                />
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
