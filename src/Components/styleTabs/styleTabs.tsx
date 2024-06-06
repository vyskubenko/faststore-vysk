import React, {useState, useEffect, ReactElement, FC} from "react";
import { Skeleton, Link,ProductGrid, ProductGridItem,ProductCard,ProductCardImage,ProductCardContent, Button} from "@faststore/ui";

import styles from "./styles.module.scss";

import { useProductsQuery } from "@faststore/core";

interface banner {
  title: string;
  image: string;
  linkText: string;
  href: string;
}

interface tabs {
  title: string;
  banner: banner;
  productClusterIds: number;
}
export interface styleTabsProps {
  tabs: tabs[];
}


const styleTabs: FC<styleTabsProps> = ({
  tabs
}): ReactElement => {
  const [activeTab, setActiveTab] = useState(0);
  const [productsJson, setProductsJson] = useState<any>(null);
  const [loading, setLoading] = useState(true); 

  const collectionId = String(tabs[activeTab].productClusterIds);

  const fetchedData = useProductsQuery(
    {
      first: 4,
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
    <section className={styles.styleTabs}>
      <div className={`${styles.styleTabs__header} tab__header`}>
        {tabs.map((item, index) => (
          <Link 
            key={index}
            variant={index === activeTab ? "display" : "default"}
            onClick={() => {
              //setLoading(true); 
              setActiveTab(index)}
            }
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className={`${styles.styleTabs__container} tab__container`}>

        <div className={`${styles.styleTabs__col} ${styles.styleTabs__banner}`}>
          <div className={styles.styleTabs__banner__img} key={tabs[activeTab].banner.title} data-fs-hero-image>
                <picture data-fs-image>
                  <source
                    media="(max-width: 799px)"
                    srcSet={tabs[activeTab].banner.image}
                    data-fs-image
                  />
                  <img src={tabs[activeTab].banner.image} alt={tabs[activeTab].banner.title} data-fs-image />
                </picture>
                <div className={styles.carouselBanners__content}>
                  <h3 className={styles.carouselBanners__title}>{tabs[activeTab].banner.title}</h3>
                  <Button className={styles.carouselBanners__button} variant="primary">{tabs[activeTab].banner.linkText}</Button>
                </div>
            </div>
        </div>
        <div className={`${styles.styleTabs__col} ${styles.styleTabs__gallery} tab__content`}>
          {loading ? (
            <Skeleton size={{ width: '100%', height: '100%' }} borderRadius="5px" />
          ) : (
            <ProductGrid>
              {productsJson && productsJson.map((product: any, idx: number) => (
                <ProductGridItem key={idx}>
                  <ProductCard>
                    <ProductCardImage>
                      <img
                        data-fs-image
                        src={product.image[0].url}
                        alt={product.image[0].alternateName}
                      />
                    </ProductCardImage>
                    <ProductCardContent
                      title={product.isVariantOf.name}
                      price={{
                        value: product.offers.offers[0].price,
                        listPrice: product.offers.offers[0].listPrice,
                        formatter: (price: number) =>
                          price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
                      }}
                      onButtonClick={() => { }}
                    />
                  </ProductCard>
                </ProductGridItem>
              ))}
            </ProductGrid>
          )}
        </div>
      </div>
    </section>
  );
};

export default styleTabs;


