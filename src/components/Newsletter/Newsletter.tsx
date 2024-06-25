


import {
  Newsletter,
  NewsletterAddendum,
  NewsletterContent,
  NewsletterForm,
  NewsletterHeader,
  Icon,
  Button,
  InputField
} from "@faststore/ui";

import styles from './section.module.scss'

import { NewsletterSection } from '@faststore/core';
import type { NewsletterProps } from '@faststore/ui';





function CustomNewsletter({
  title,
  card,
  colorVariant,
  ...otherProps
}: NewsletterProps) {


  return (
    <Newsletter card colorVariant="main">
  <NewsletterForm onSubmit={() => null}>
    <NewsletterHeader
      icon={<Icon name="Envelope" />}
      title="Get News and Special Offers!"
      description="Receive our news and promotions in advance. Enjoy and get 10% off your first purchase. For more information click here."
    />
    <NewsletterContent>
      <InputField id="newsletter-name" required label="Name" />
      <InputField
        id="newsletter-email"
        type="email"
        required
        label="Email"
      />
      <NewsletterAddendum addendum="By subscribing to our newsletter you agree to to our Privacy Policy." />
      <Button
        variant="secondary"
        type="submit"
        inverse={true}
      >
        Subscribe
      </Button>
    </NewsletterContent>
  </NewsletterForm>
</Newsletter>
  )
}
export default CustomNewsletter
