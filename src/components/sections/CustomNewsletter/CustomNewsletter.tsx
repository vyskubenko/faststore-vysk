import { NewsletterSection, getOverriddenSection } from "@faststore/core";

const CustomNewsletter = getOverriddenSection({
  Section: NewsletterSection,
  components: {
      HeaderIcon: {
        props: {
            width: 32
        }
      }
  }
  });
  
  export default CustomNewsletter;