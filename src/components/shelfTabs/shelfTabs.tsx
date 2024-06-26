import React, {useState, useEffect, ReactElement, FC } from "react";
import { Skeleton, Link, Carousel, SelectField } from "@faststore/ui";

import styles from "./styles.module.scss";

import { useProductsQuery } from "@faststore/core";


import CustomProductCard from "../CustomProductCard/CustomProductCard";


interface tabs {
  title: string;
  productClusterIds: number;
}
export interface styleTabsProps {
  title: string;
  tabs: tabs[];
}


const shelfTabs: FC<styleTabsProps> = ({
  title,
  tabs
}): ReactElement => {
  const [activeTab, setActiveTab] = useState(0);
  const [productsJson, setProductsJson] = useState<any>(null);
  const [loading, setLoading] = useState(true); 

  const collectionId = String(tabs[activeTab].productClusterIds);

  const fetchedData = useProductsQuery(
    {
      first: 16,
      term: '',
      selectedFacets: [{ key: 'productClusterIds', value: collectionId }]
    }
  )

  let isMobile = false
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth <= 1280
  }

  useEffect(() => {
    if (fetchedData) {
      const edges = fetchedData?.search.products.edges;
      const productsJson = edges?.map((edge: any) => edge.node);
      setProductsJson(productsJson); 
      setLoading(false); 
    }
  }, [fetchedData]); 


  return (
    <section className={styles.shelfTabs} data-fs-content>
      <div className={`${styles.shelfTabs__header} tab__header`}>
        <h4 className={styles.shelfTabs__title}>{title}</h4>

        <div className={styles.shelfTabs__links}>
          {tabs.map((item, index) => (
            <Link
              key={index}
              className={styles.shelfTabs__links__item}
              variant={index === activeTab ? "display" : "default"}
              onClick={() => {
                setLoading(true);
                setActiveTab(index);
              }}
            >
              {item.title}
            </Link>
          ))}
          <select
            className={styles.shelfTabs__select}
            onChange={e => {
              setLoading(true)
              setActiveTab(e?.target?.value as any)
            }}
          >
            {tabs.map((item, index) => (
              <option key={index} value={index} >{item.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={`${styles.shelfTabs__container} tab__container`}>
        <div
          className={`${styles.shelfTabs__gallery} tab__content`}
          data-fs-carousel-container
        >
          {loading ? (
            <Skeleton
              size={{ width: "100%", height: "100%" }}
              borderRadius="5px"
            />
          ) : (
            <Carousel
              itemsPerPage={isMobile ? 1 : 4}
              variant="scroll"
              controls="navigationArrows"
            >
              {productsJson &&
                productsJson.map((product: any, idx: number) => (
                  <CustomProductCard
                    product={product}
                    key={idx}
                    idx={idx}
                  ></CustomProductCard>
                ))}
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default shelfTabs;


