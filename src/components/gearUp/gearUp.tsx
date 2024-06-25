import React, {useState, ReactElement, FC } from "react";
import { Link } from "@faststore/ui";

import styles from "./styles.module.scss";


interface links {
  title: string;
  image: string;
  href: string;
}

interface parts {
  title: string;
  height: number;
  links: links[]
}

interface tabs {
  tabImage: string;
  tabTitle: string;
  parts: parts[];
}
export interface gearUpProps {
  title: string;
  description: string;
  tabs: tabs[];
}

const gearUp: FC<gearUpProps> = ({
  title,
  description,
  tabs
}): ReactElement => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategoryTab, setActiveCategoryTab] = useState(0);

  return (
    <section className={styles.gearUp}>

      <div className={styles.gearUp__container__text}>
        <h4 className={styles.gearUp__title}>{title}</h4>
        <p className={styles.gearUp__description}>{description}</p>
      </div>
      <div className={styles.gearUp__container}>
        <div className={styles.gearUp__category}>

          <div className={`${styles.gearUp__header} tab__header`}>
            {tabs.map((item:any, index:any) => (
              <>
              <Link 
                key={index}
                variant={index === activeTab ? "display" : "default"}
                onClick={() => {
                  setActiveTab(index)
                  setActiveCategoryTab(0)
                }
                }
                >
                {item.tabTitle}
              </Link>
              {index < tabs.length-1 ? <span data-fs-divider className="divider"></span> : ""} 
              </>
            ))}
          </div>

          <div className={styles.gearUp__category__image}>
            <div className={styles.styleTabs__banner__img} key={tabs[activeTab].tabTitle} data-fs-hero-image>
                <picture data-fs-image>
                  <source
                    media="(max-width: 799px)"
                    srcSet={tabs[activeTab].tabImage}
                    data-fs-image
                  />
                  <img src={tabs[activeTab].tabImage} alt={tabs[activeTab].tabTitle} data-fs-image />
                </picture>
            </div>

            <div className={styles.gearUp__category__parts}>
              {tabs[activeTab]?.parts.map((part:any, index:any) => (
                <div
                  className={styles.gearUp__category__parts__links}
                  style={ {height: part.height }}
                  key={index}
                >
                  <Link 
                    key={index}
                    className={styles.gearUp__category__parts__links__button}
                    variant={index === activeCategoryTab ? "display" : "default"}
                    onClick={() => {
                      setActiveCategoryTab(index)}
                    }
                  >
                    {index === activeCategoryTab ? "Selected:" : ""} {part.title}
                  </Link>
                </div>
              ))}
            </div>

          </div>

          
        
        </div>
        <div className={`${styles.gearUp__parts__container} tab__container`}>

        <ul className={styles.gearUp__parts__container__wrapper}>
              
            {tabs[activeTab]?.parts[activeCategoryTab]?.links.map((link:any, index:any) => (
              <li
                key={index}
                className={styles.gearUp__parts__link}
              >

                <Link 
                  key={index}
                  href={link.href}
                  className={styles.gearUp__parts__link__a}
                >
                  <img src={link.image} alt={link.title} data-fs-image />
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </section>
  );
};

export default gearUp;


