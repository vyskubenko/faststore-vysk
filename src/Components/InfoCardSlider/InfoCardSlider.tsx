import React from "react";
import { Carousel, Link } from "@faststore/ui";

import styles from "./styles.module.scss";

interface List {
  imageDesktop: string;
  name: string;
  url: string;
}
export interface InfoCardSliderProps {
  list: List[];
  itemsPerPage: number;
  infiniteMode: boolean;
  title: string;
}

const InfoCardSlider = ({
  list,
  itemsPerPage,
  infiniteMode,
  title
}: InfoCardSliderProps) => {


  let isMobile = false
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth <= 1280
  }

  return (
    <section className={styles.infoCardSlider} data-fs-content>

      <h2 className={styles.infoCardSlider__title}>{title}</h2>

      <Carousel
        itemsPerPage={isMobile ? 2 : itemsPerPage}
        variant="scroll"
        controls="navigationArrows"
        infiniteMode={infiniteMode}
      >
        {list.map(({ imageDesktop, name, url }) => (
          <div className={styles.infoCardSlider__item} key={url} data-fs-carousel-banner>
            <Link href={url}>
              <picture data-fs-image>
                <source
                  media="(max-width: 799px)"
                  srcSet={imageDesktop}
                  data-fs-image
                />
                <img src={imageDesktop} alt={name} data-fs-image />
              </picture>
              <div className={styles.infoCardSlider__content}>
                <h5 className={styles.infoCardSlider__content__title}>{name}</h5>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default InfoCardSlider;
