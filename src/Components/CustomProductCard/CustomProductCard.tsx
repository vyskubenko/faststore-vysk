
import { ProductGridItem,ProductCard,ProductCardImage,ProductCardContent} from "@faststore/ui";

import { FC } from "react";

import styles from "./styles.module.scss";

export type CustomProductCardProps = {
  loading?: boolean;
  disabled?: boolean;
  product: any;
  idx?: number;
};

const CustomProductCard: FC<CustomProductCardProps> = ({
  product,
	idx,
}) => {

  return (
		<ProductGridItem key={idx} className={styles.ProductGridItem}>
			<ProductCard>
				<ProductCardImage>
					<img
						data-fs-image
						src={product?.image[0].url}
						alt={product?.image[0].alternateName}
					/>
				</ProductCardImage>
				<ProductCardContent
					className={styles.ProductGridItem__content}
					title={product.isVariantOf.name}
					price={{
						value: product.offers.offers[0].price,
						listPrice: product.offers.offers[0].listPrice,
						formatter: (price: number) =>
							price.toLocaleString("en-US", {
								style: "currency",
								currency: "USD",
							}),
					}}
				/>
			</ProductCard>
		</ProductGridItem>
  );
};

export default CustomProductCard;
