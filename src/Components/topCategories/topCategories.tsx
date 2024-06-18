import React, { ReactElement, FC } from "react";
import { Link } from "@faststore/ui";

import styles from "./styles.module.scss";

interface List {
  image: string;
  name: string;
  url: string;
}
export interface topCategoriesProps {
  list: List[];
  title: string;
}


const topCategories: FC<topCategoriesProps> = ({
  list,
  title
}): ReactElement => {

  return (
    <section className={styles.topCategories} data-fs-content>

      <h2 className={styles.topCategories__title}>{title}</h2>

      <div className={styles.topCategories__content}>
        {list.map(({ image, name, url }) => (
          <div className={styles.topCategories__item} key={url} data-fs-carousel-banner>
            <Link href={url}>
              <h5 className={styles.topCategories__content__title}>{name}</h5>
              <picture>
                <source
                  srcSet={image}
                
                />
                <img src={image} alt={name} />
              </picture>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default topCategories;
