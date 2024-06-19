import type { Query } from "@faststore/api";

const productResolver = {
  Query: {
    // We will add a resolver to get the installments of a product, fetch only the data you need (https://developers.vtex.com/docs/guides/faststore/api-extensions-overview#best-practices-for-fetching-data)
    search: (root: Query) => {
      console.log(root)
    },
  },
};

export default productResolver;