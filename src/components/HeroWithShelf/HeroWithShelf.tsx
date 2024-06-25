import React, { useState, useEffect, ReactElement, FC } from "react";
import { Skeleton, Link, Carousel } from "@faststore/ui";

import styles from "./styles.module.scss";

import { useProductsQuery } from "@faststore/core";

import CustomProductCard from "../CustomProductCard/CustomProductCard";

// @ts-ignore next-line
import { Image_unstable as Image } from "@faststore/core/experimental";


export interface HeroWithShelfProps {
  title: string;
  description: string;
  productClusterIds: string;
  linkText: string;
  href: string;
  image: string;
  color: string;
}

const HeroWithShelf: FC<HeroWithShelfProps> = ({
  title,
  image,
  linkText,
  href,
  color,
  description,
  productClusterIds
}): ReactElement => {
  // var image =
  //   "https://vysk.vtexassets.com/assets/vtex.file-manager-graphql/images/df865355-dbcc-4091-ba51-fdafa9f94bce___71878b00182ab7919483419e9c8fd6f8.jpg";
  // var title = "Embrace the Elements";
  // var description =
  //   "Stay dry with our rain jackets, cozy up in our puffers, and stay warm with our fleeces. We've got you covered.";
  // var productClusterIds = 137;
  // var linkText = "Shop all clothes";
  // var href = "#";
  // var color = "orange";


  let isMobile = false
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth <= 1280
  }

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
      className={`${styles.HeroWithShelf} HeroWithShelf__${color}`}
      data-fs-background={color}
    >
      <div
        className={`${styles.HeroWithShelf__col} ${styles.HeroWithShelf__content} HeroWithShelf__col HeroWithShelf__content`}
      >
        <h2 className={styles.HeroWithShelf__title}>{title}</h2>
        <p className={styles.HeroWithShelf__description}>{description}</p>

        <div className={`${styles.HeroWithShelf__shelf}`} data-fs-carousel-container>
          {loading ? (
            <Skeleton
              size={{ width: "100%", height: "100px" }}
              borderRadius="5px"
            />
          ) : (
              <Carousel itemsPerPage={isMobile ? 1 : 3} variant="scroll" controls="navigationArrows">
                {productsJson &&
                  productsJson.map((product: any, idx: number) => (
                    <CustomProductCard
                      product={product}
                      idx={idx}
                      key={idx}
                    ></CustomProductCard>
                  ))}
              </Carousel>
          )}
        </div>

        <Link href={href} className={`${styles.HeroWithShelf__link} HeroWithShelf__link`}>
          {linkText}
        </Link>
      </div>

      <div
        className={`${styles.HeroWithShelf__col} ${styles.HeroWithShelf__banner__img} ${styles.HeroWithShelf__banner} HeroWithShelf__col HeroWithShelf__banner`}
        data-fs-hero-image
        data-fs-background={color}
      >
        <picture data-fs-image>
          <source media="(max-width: 799px)" srcSet={image} />
          <Image
            preload
            data-fs-image
            src={image}
            width={799}
            height={500}
            alt={title}
            priority={true}
            loading="eager"
          />
        </picture>
      </div>
    </section>
  );
};

export default HeroWithShelf;
