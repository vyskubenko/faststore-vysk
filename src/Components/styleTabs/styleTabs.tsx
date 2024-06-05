import React, {useState, useEffect} from "react";
import { List, Link,ProductGrid, ProductGridItem,ProductCard,ProductCardImage,ProductCardContent, Button} from "@faststore/ui";

import styles from "./styles.module.scss";

interface List {
  imageDesktop: string;
  name: string;
  url: string;
}
export interface styleTabsProps {
  list: List[];
  itemsPerPage: number;
  infiniteMode: boolean;
  title: string;
}

export interface tabsProps {
  onAccordionChange: (index: number) => void
}


const links = [
  {
    title: 'Wilderness Wanderer',
    banner: 
      {
        title: 'Discover Boundless Adventures',
        linkText: 'Shop All Camping',
        href: '/',
        image: 'https://vysk.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fstoreframework.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F1e46eee3-5cd9-4911-8a81-501fe9c744fe___57d4662d50c07e760e6e74d8da282508.jpg',
      }
    ,
    productClusterIds: "137"
  },
  {
    title: 'Snowbound Adventurer',
    banner: 
      {
        title: 'Discover Boundless Adventures',
        linkText: 'Shop All Camping',
        href: '/',
        image: 'https://vysk.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fstoreframework.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F1e46eee3-5cd9-4911-8a81-501fe9c744fe___57d4662d50c07e760e6e74d8da282508.jpg',
      }
    ,
    productClusterIds: "138"
  },
  {
    title: 'Weekend Warrior',
    banner:
      {
        title: 'Discover Boundless Adventures',
        linkText: 'Shop All Camping',
        href: '/',
        image: 'https://vysk.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fstoreframework.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F1e46eee3-5cd9-4911-8a81-501fe9c744fe___57d4662d50c07e760e6e74d8da282508.jpg',
      }
    ,
    productClusterIds: "139"
  },
]

const fetchData = async (clusterId: any) => {
  try {
    const terms: any = `{
      "first":4,
      "after":"0",
      "sort":
      "score_desc",
      "term":"",
      "selectedFacets":[{"key":"productClusterIds","value":"${clusterId}"}]
    }`;

    const response = await fetch(`/api/graphql?operationName=ClientManyProductsQuery&operationHash=c0d7d2ae1d5aaae5d50eea683b389377c36fb57d&variables=${encodeURIComponent(terms)}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throwing the error to handle it in the calling function
  }
};

const styleTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState<any>(null);
  const [productsJson, setproductsJson] = useState<any>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedData = await fetchData(links[activeTab].productClusterIds);
        setProducts(fetchedData);
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [activeTab]); // Fetch data whenever activeTab changes

  useEffect(() => {
    if (products) {
      const edges = products.data?.search.products.edges;
      const productsJson = edges?.map((edge: any) => edge.node);
      setproductsJson(productsJson)
      console.log(productsJson);
    }
  }, [products, activeTab]);

  return (
    <section className={styles.styleTabs}>
      <div className={`${styles.styleTabs__header} tab__header`}>
        {links.map((item, index) => (
          <Link 
            key={index}
            variant={index === activeTab ? "display" : "default"}
            onClick={() => setActiveTab(index)}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className={`${styles.styleTabs__container} tab__container`}>

        <div className={`${styles.styleTabs__col} ${styles.styleTabs__banner}`}>
          <div className={styles.styleTabs__banner__img} key={links[activeTab].banner.title} data-fs-hero-image>
                <picture data-fs-image>
                  <source
                    media="(max-width: 799px)"
                    srcSet={links[activeTab].banner.image}
                    data-fs-image
                  />
                  <img src={links[activeTab].banner.image} alt={links[activeTab].banner.title} data-fs-image />
                </picture>
                <div className={styles.carouselBanners__content}>
                  <h3 className={styles.carouselBanners__title}>{links[activeTab].title}</h3>
                  <Button className={styles.carouselBanners__button} variant="primary">{links[activeTab].banner.title}</Button>
                </div>
            </div>
        </div>
        <div className={`${styles.styleTabs__col} ${styles.styleTabs__gallery} tab__content`}>
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
                      onButtonClick={() => {}}
                    />
                  </ProductCard>
                </ProductGridItem>
              ))}
          </ProductGrid>

        </div>
      </div>
    </section>
  );
};

export default styleTabs;


