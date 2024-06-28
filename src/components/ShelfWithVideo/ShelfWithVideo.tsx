import React, { useState, useEffect, ReactElement, FC } from "react";
import { Skeleton, Carousel, Modal, ModalHeader, ModalBody} from "@faststore/ui";

import styles from "./styles.module.scss";

import { useProductsQuery } from "@faststore/core";

// @ts-ignore next-line
import { Image_unstable as Image } from "@faststore/core/experimental";


import CustomProductCard from "../CustomProductCard/CustomProductCard";

export interface ShelfWithVideoProps {
  title: string;
  subtitle: string;
  description: string;
  productClusterIds: string;
  video: string;
  thumb: string;
}

const ShelfWithVideo: FC<ShelfWithVideoProps> = ({
  title,
  subtitle,
  description,
  productClusterIds,
  video,
  thumb
}): ReactElement => {

  const [productsJson, setProductsJson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({dimensions: {}} as any)
  const [videoModal, openVideoModal] = useState(false)

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

  const onImgLoad = function(img:any) {
    setDimensions({height:img.target.height, width:img.target.width});
  }

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

      {video ? (
        <div
          className={`${styles.ShelfWithVideo__col} ${styles.ShelfWithVideo__banner__img} ${styles.ShelfWithVideo__banner} ShelfWithVideo__col`}
        >
          <Image
            data-fs-image
            src={thumb}
            width={dimensions.width||100}
            height={dimensions.height||50}
            alt={description}
            priority={true}
            loading="eager"
            onLoad={onImgLoad}
            onClick={() => openVideoModal(true)}
          />
          {videoModal && (
            <Modal className={styles.ShelfWithVideo__Modal} onDismiss={() => {
              openVideoModal(false)
            }}>
              {({ fadeOut }) => (
                <>
                  <ModalHeader
                    onClose={() => {
                      fadeOut()
                      openVideoModal(false)
                    }}
                    
                    title={title}
                    description={description}
                  />
                  <ModalBody>
                    
                  <picture data-fs-video>
                    <iframe className={styles.ShelfWithVideo__iframe} width="100%" height="100%" src={video} title={title}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                  </picture>

                  </ModalBody>
                </>
              )}
            </Modal>
          )}
      </div>
      ):''}
      
    </section>
  );
};

export default ShelfWithVideo;
