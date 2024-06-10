import React, {useState, useEffect, ReactElement, FC} from "react";
import { Skeleton, Link,ProductGrid, Button} from "@faststore/ui";

import styles from "./styles.module.scss";

import { useProductsQuery } from "@faststore/core";

import CustomProductCard from "../CustomProductCard/CustomProductCard";

export interface infoCardShelfProps {
  title: string;
  description: string;
  linkText: string;
  href: string;
  banner: string;
  shelfTitle: string;
  productClusterIds: number;
}

const infoCardShelf: FC<infoCardShelfProps> = ({
  title,
  description,
  linkText,
  href,
  banner,
  shelfTitle,
  productClusterIds
}): ReactElement => {
  const [productsJson, setProductsJson] = useState<any>(null);
  const [loading, setLoading] = useState(true); 

  const collectionId = String(productClusterIds);

  const fetchedData = useProductsQuery(
    {
      first: 3,
      term: '',
      selectedFacets: [{ key: 'productClusterIds', value: collectionId }]
    }
  )

  useEffect(() => {
    if (fetchedData) {
      const edges = fetchedData?.search.products.edges;
      const productsJson = edges?.map((edge: any) => edge.node);
      setProductsJson(productsJson); 
      setLoading(false); 
    }
  }, [fetchedData]); 

  return (
    <section className={styles.infoCardShelf}>

      <div className={styles.infoCardShelf__text}>

        <h1 className={styles.infoCardShelf__title}>{title}</h1>
        <p className={styles.infoCardShelf__desc}>{description}</p>
        <Link href={href} className={styles.infoCardShelf__button} variant="primary">{linkText}</Link>

      </div>

      <div className={styles.infoCardShelf__banner}>
        <div className={styles.infoCardShelf__banner__img} data-fs-hero-image>
          <picture data-fs-image>
            <source
              srcSet={banner}
              data-fs-image
            />
            <img src={banner} alt={title} data-fs-image />
          </picture>
        </div>
      </div>
      
      <div className={styles.infoCardShelf__shelf}>
        <h4 className={styles.infoCardShelf__shelf__title}>{shelfTitle}</h4>
        <div className={styles.infoCardShelf__shelf__wrap}>
          {loading ? (
            <Skeleton size={{ width: '100%', height: '100%' }} borderRadius="5px" />
          ) : (
            <ProductGrid>
              {productsJson && productsJson.map((product: any, idx: number) => (
                <CustomProductCard
                      product={product}
                      idx={idx}
                      key={product}
                ></CustomProductCard>
              ))}
            </ProductGrid>
          )}
        </div>
      </div>
    </section>
  );
};

export default infoCardShelf;


