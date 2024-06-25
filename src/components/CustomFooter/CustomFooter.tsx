import { PaymentMethods as UIPaymentMethods } from '@faststore/ui'
import type { PaymentMethodsProps as UIPaymentMethodProps } from '@faststore/ui'

import styles from './section.module.scss'

import CustomNewsletter from '../Newsletter/Newsletter'

import {
  NewsletterProps as UINewsletterProps,
  NewsletterAddendumProps as UINewsletterAddendumProps,
  NewsletterHeaderProps as UINewsletterHeaderProps,
} from '@faststore/ui'



import {
  Newsletter as UINewsletter
} from '@faststore/ui'


interface List {
  name: string;
  url: string;
}

export type FooterProps = {
  title: string
  list: List[]
}

const CustomFooter = ({
  title,
  list
}: FooterProps) => {
  

  console.log(title,
    list)

  return (
    <section
      className={`section ${styles.section} ${styles.Footer} section-footer layout__section`}
    >
      footer22

      <div className={styles.Footer__Links} data-fs-content="Footer__Links">
      <CustomNewsletter
      title="22"
      card={false}
    />
      </div>

      {/* {showPaymentMethods && (
            <UIPaymentMethods
              flagList={paymentMethods}
              title={<p>{acceptedPaymentMethodsTitle}</p>}
            />
          )}
          <div data-fs-footer-copyright className="text__legend">
            <p>{copyrightInfo}</p>
          </div> */}
    </section>
  )
}

export default CustomFooter
