import React, { useState, useEffect, ReactElement, FC } from "react";
import { Skeleton, Carousel } from "@faststore/ui";

import styles from "./styles.module.scss";

import { useProductsQuery } from "@faststore/core";

import CustomProductCard from "../CustomProductCard/CustomProductCard";

export interface ShelfWithVideoProps {
  title: string;
  subtitle: string;
  description: string;
  productClusterIds: string;
  video: string;
}

const ShelfWithVideo: FC<ShelfWithVideoProps> = ({
  title,
  subtitle,
  description,
  productClusterIds,
  video
}): ReactElement => {

  const [productsJson, setProductsJson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const collectionId = String(productClusterIds);

  const fetchedData = useProductsQuery({
    first: 12,
    term: "",
    selectedFacets: [{ key: "productClusterIds", value: collectionId }],
  });

  useEffect(() => {
    if (fetchedData) {
      const edges = fetchedData?.search.products.edges;
      const productsJson = edges?.map((edge: any) => edge.node);
      setProductsJson(productsJson);
      setLoading(false);
    }
  }, [fetchedData]);

  return (
    <section
      className={`${styles.ShelfWithVideo}`}
      data-fs-content
    >
      <div
        className={`${styles.ShelfWithVideo__col} ${styles.ShelfWithVideo__content} ShelfWithVideo__col ShelfWithVideo__content`}
      >
        <h2 className={styles.ShelfWithVideo__title}>{title}</h2>
        <h3 className={styles.ShelfWithVideo__subtitle}>{subtitle}</h3>
        <p className={styles.ShelfWithVideo__description}>{description}</p>

        <div className={`${styles.ShelfWithVideo__shelf}`} data-fs-carousel-container>
          {loading ? (
            <Skeleton
              size={{ width: "100%", height: "100%" }}
              borderRadius="5px"
            />
          ) : (
              <Carousel itemsPerPage={2} variant="scroll" controls="navigationArrows">
                {productsJson &&
                  productsJson.map((product: any, idx: number) => (
                    <CustomProductCard
                      product={product}
                      key={product}
                      idx={idx}
                    ></CustomProductCard>
                  ))}
              </Carousel>
          )}
        </div>
      </div>

      <div
        className={`${styles.ShelfWithVideo__col} ${styles.ShelfWithVideo__banner__img} ${styles.ShelfWithVideo__banner} ShelfWithVideo__col`}
        data-fs-hero-image
      >
        <picture data-fs-video>
          <iframe className={styles.ShelfWithVideo__iframe} border="0" width="100%" height="100%" src={video} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </picture>
      </div>
    </section>
  );
};

export default ShelfWithVideo;
