import { PaymentMethods as UIPaymentMethods } from "@faststore/ui";
import type { PaymentMethodsProps as UIPaymentMethodProps } from "@faststore/ui";

import CustomNewsletter from "../sections/CustomNewsletter/CustomNewsletter";

import { Icon, Newsletter as UINewsletter } from "@faststore/ui";

import styles from "./section.module.scss";

interface Link {
  text: string;
  href: string;
}

interface LinkImage {
  text: string;
  description: string;
  href: string;
  ico: string;
}

interface List {
  name: string;
  links: Link[];
}

export type FooterProps = {
  title: string;
  list: List[];
  termsText: string;
  logo: string;
  termsLinks: Link[];
  supportLinks: LinkImage[];
};

const CustomFooter = (props: FooterProps) => {

  return (
    <section
      className={`section ${styles.section} ${styles.Footer} section-footer layout__section`}
    >
      <div className={styles.row} data-row="Footer__Links">
        <div className={styles.Footer__Links} data-fs-content="Footer__Links">
          {props?.list?.map((item, index) => (
            <div key={index} className={styles.Footer__Links__List}>
              <h4 className={styles.Footer__Links__List__title}>{item.name}</h4>
              <ul>
                {item.links.map((link, _i) => (
                  <li key={_i}>
                    <a
                      href={link.href}
                      className={styles.Footer__Links__List__item}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        
      </div>

      <div className={styles.row} data-row="Footer__Newsletter">

        <div className={styles.Footer__Newsletter}>
          <CustomNewsletter
            icon={{ icon: "false", alt: "####" }}
            title="JOIN THE AL’S FAMILY"
            description="Join the Al's Sporting Goods family for exclusive deals and updates!"
            //privacyPolicy="privacyPolicy"
            emailInputLabel="Your email address"
            displayNameInput={false}
            nameInputLabel="Your Name"
            subscribeButtonLabel="Submit"
            subscribeButtonLoadingLabel="Loading..."
            toastSubscribe={{
              title: "Hooray!",
              message: "Thank for your subscription.",
              icon: "CircleWavyCheck",
            }}
            toastSubscribeError={{
              title: "Oops",
              message: "Something went wrong. Please Try again",
              icon: "CircleWavyWarning",
            }}
            card={true}
          />
        </div>
      </div>

      <div className={styles.row} data-row="Footer__copyright">
        <div className={styles.copyright} data-fs-content="Footer__copyright">
          <p className={styles.copyrightLogo}>
            <img src={props.logo} />

            <span>{props.termsText}</span>
          </p>

          <ul className={styles.policiesList}>
            {props.termsLinks?.map((link, _i) => (
              <li key={_i}>
                <a
                  href={link.href}
                  className={styles.Footer__Links__List__item}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.row}  data-row="Footer__supportLinks">
        <div className={styles.supportLinks} data-fs-content="Footer__supportLinks">
          <ul className={styles.supportLinks__List}>
            {props.supportLinks?.map((link, _i) => (
              <li key={_i} className={styles.supportLinks__List__item}>
                <span className={styles.supportLinks__List__item__img}>
                  <img src={link.ico} />
                </span>
                <a
                  href={link.href}
                  className={styles.supportLinks__List__item__link}
                >
                  <p>{link.text}</p>
                  <span>{link.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CustomFooter;
