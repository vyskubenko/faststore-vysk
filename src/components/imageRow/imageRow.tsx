import React, {useState} from "react";
import { Link } from "@faststore/ui";
// @ts-ignore next-line
import { Image_unstable as Image } from "@faststore/core/experimental";

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

  const [dimensions, setDimensions] = useState({dimensions: {}} as any)

  const onImgLoad = function(img:any) {
    setDimensions({height:img.target.height, width:img.target.width});
  }

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
                  <Image
                    data-fs-image
                    src={image}
                    width={dimensions.width||100}
                    height={dimensions.height||50}
                    alt={name}
                    priority={true}
                    loading="eager"
                    onLoad={onImgLoad}
                  />
                </picture>
              </Link>
            </li>
          ))}
        </ul>
    </section>
  );
};

export default ImageRow;
