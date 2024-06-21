import React from "react";
import { Link } from "@faststore/ui";

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
    <section className={styles.imageRow} data-fs-content>

      <h2 className={styles.imageRow__title}>{title}</h2>
        
        <ul className={styles.imageRow__list}>
          {list.map(({ image, name, url }, i) => (
            <li className={styles.imageRow__item} key={i}>
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
