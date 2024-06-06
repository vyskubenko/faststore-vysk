import React from "react";
import { Carousel, Button, Link } from "@faststore/ui";

import styles from "./styles.module.scss";

interface List {
  image: string;
  name: string;
  url: string;
}
export interface ImageRowProps {
  list: List[];
  title: string;
}

const ImageRow = ({
  list,
  title
}: ImageRowProps) => {
  return (
    <section className={styles.imageRow}>

      <h2 className={styles.imageRow__title}>{title}</h2>
        
        <ul className={styles.imageRow__list}>
          {list.map(({ image, name, url }) => (
            <li className={styles.imageRow__item} key={url}>
              <Link href={url}>
                <picture data-fs-image>
                  <source
                    srcSet={image}
                    data-fs-image
                  />
                  <img src={image} alt={name} title={name} data-fs-image />
                </picture>
              </Link>
            </li>
          ))}
        </ul>
    </section>
  );
};

export default ImageRow;
