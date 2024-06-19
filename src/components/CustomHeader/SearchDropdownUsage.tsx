/* eslint-disable @next/next/no-img-element */
import { useCallback, useMemo } from 'react'

interface PriceFormatterOptions {
    decimals?: boolean
  }

import {
    SearchDropdown,
    SearchHistory,
    SearchHistoryTerm,
    SearchTop,
    SearchTopTerm,
    SearchAutoComplete,
    SearchAutoCompleteTerm,
    SearchProducts,
    SearchProductItem,
    SearchProductItemImage,
    SearchProductItemContent,
    SearchProvider,
  } from '@faststore/ui'
  
  export const usePriceFormatter = ({ decimals }: PriceFormatterOptions = {}) => {
    return useCallback(
      (price: number) =>
        Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: decimals ? 2 : 0,
        }).format(price),
      [decimals]
    )
  }
  export const useFormattedPrice = (price: number) => {
  const formatter = usePriceFormatter()

  return useMemo(() => formatter(price), [formatter, price])
}
  export const product = {
    id: '99988216',
    sku: '99988216',
    name: 'Magic black',
    gtin: '1507',
    description: 'Apple Magic Mouse',
    isVariantOf: {
      name: 'Apple Magic Mouse',
      productGroupID: '99995945',
      skuVariants: {
        activeVariations: {
          Color: 'Black',
          Size: 'Medium',
        },
        slugsMap: {
          'Color-Black': 'apple-magic-mouse-99988216',
          'Color-White': 'apple-magic-mouse-99988212',
        },
        availableVariations: {
          Color: [
            {
              src: 'https://storeframework.vtexassets.com/arquivos/ids/190932/mouse-black.jpg?v=1759260622',
              alt: 'appleblack',
              label: 'Color: Black',
              value: 'Black',
            },
            {
              src: 'https://storeframework.vtexassets.com/arquivos/ids/190902/unsplash-magic-mouse.jpg?v=1759260622',
              alt: 'Magicwhite',
              label: 'Color: White',
              value: 'White',
            },
            {
              src: 'https://storeframework.vtexassets.com/arquivos/ids/190902/unsplash-magic-mouse.jpg?v=1759260622',
              alt: 'Magicgray',
              label: 'Color: Gray',
              value: 'Gray',
              disabled: true,
            },
          ],
        },
      },
    },
    image: [
      {
        url: 'https://storeframework.vtexassets.com/arquivos/ids/190932/mouse-black.jpg?v=1759260622',
        alternateName: 'appleblack',
      },
      {
        url: 'https://storeframework.vtexassets.com/arquivos/ids/190924/anthony-choren-e7dG26YCrZU-unsplash.jpg?v=637867501835430000',
        alternateName: 'combo',
      },
      {
        url: 'https://storeframework.vtexassets.com/arquivos/ids/190935/magic-side.jpg?v=1759260622',
        alternateName: 'side',
      },
      {
        url: 'https://storeframework.vtexassets.com/arquivos/ids/190934/magic-mouse-back.jpg?v=1759260622',
        alternateName: 'back',
      },
      {
        url: 'https://storeframework.vtexassets.com/arquivos/ids/190933/Magic_Mouse_Black_Pure_Top_Screen__USEN_1.png?v=1759260622',
        alternateName: 'front',
      },
    ],
    brand: {
      name: 'adidas',
    },
    offers: {
      lowPrice: 950.04,
      offers: [
        {
          availability: 'https://schema.org/InStock',
          price: 950.04,
          listPrice: 999,
          seller: {
            identifier: '1',
          },
        },
      ],
    },
    breadcrumbList: {
      itemListElement: [
        {
          item: '/technology/',
          name: 'Technology',
          position: 1,
        },
        {
          item: '/apple-magic-mouse-99988216/p',
          name: 'Apple Magic Mouse',
          position: 2,
        },
      ],
    },
    additionalProperty: [
      {
        propertyID: '0451fa02662066cfb8a5b21dfb0e21c8',
        name: 'Color',
        value: 'Black',
        valueReference: 'SPECIFICATION',
      },
    ],
  }  

  export interface SearchDropdownUsageProps {
    term: string
    products?: [] | null
  }
  
  const SearchHistoryUsage = () => {
    return (
      <SearchHistory title="History">
        <SearchHistoryTerm value="Headphone" linkProps={{ href: '#' }} />
        <SearchHistoryTerm value="Audio & Video" linkProps={{ href: '#' }} />
        <SearchHistoryTerm value="mh-7000" linkProps={{ href: '#' }} />
      </SearchHistory>
    )
  }
  
  const SearchTopUsage = () => {
    return (
      <SearchTop title="Top Search">
        <SearchTopTerm value="Notebooks" linkProps={{ href: '#' }} index={0} />
        <SearchTopTerm
          value="Laser Printer"
          linkProps={{ href: '#' }}
          index={1}
        />
        <SearchTopTerm
          value="Bluetooth Keyboard"
          linkProps={{ href: '#' }}
          index={2}
        />
      </SearchTop>
    )
  }
  
  const SearchAutoCompleteUsage = () => {
    const searchContent = 'Appl'
    const suggestions = [{ value: 'apple' }, { value: 'apple magic mouse' }]
    return (
      <SearchAutoComplete>
        {suggestions?.map((suggestion) => (
          <SearchAutoCompleteTerm
            key={suggestion.value}
            term={searchContent}
            suggestion={suggestion.value}
            linkProps={{ href: '#' }}
          />
        ))}
      </SearchAutoComplete>
    )
  }
  
  const SearchProductsUsage = () => {
    return (
      <SearchProducts>
        <SearchProductItem linkProps={{ href: '#' }}>
          <SearchProductItemImage>
            <img
              data-fs-image
              src={product.image[1].url}
              alt={product.image[1].alternateName}
            />
          </SearchProductItemImage>
          <SearchProductItemContent
            title={product.isVariantOf.name}
            price={{
              value: product.offers.offers[0].price,
              listPrice: product.offers.offers[0].listPrice,
              formatter: useFormattedPrice,
            }}
          />
        </SearchProductItem>
        <SearchProductItem linkProps={{ href: '#' }}>
          <SearchProductItemImage>
            <img
              data-fs-image
              src={product.image[1].url}
              alt={product.image[1].alternateName}
            />
          </SearchProductItemImage>
          <SearchProductItemContent
            title={product.isVariantOf.name}
            price={{
              value: product.offers.offers[0].price,
              listPrice: product.offers.offers[0].listPrice,
              formatter: useFormattedPrice,
            }}
          />
        </SearchProductItem>
      </SearchProducts>
    )
  }
  
  const SearchDropdownUsage = ({
    term = '',
    products = [],
  }: SearchDropdownUsageProps) => {
    return (
      <SearchProvider
        term={term}
        terms={[
          {
            value: 'apple',
          },
          {
            value: 'apple magic mouse',
          },
        ]}
        isLoading={false}
        products={products}
      >
        <SearchDropdown
          style={{
            position: 'relative',
            top: 'auto',
            left: 'auto',
          }}
        >
          <SearchHistoryUsage />
          <SearchTopUsage />
          <SearchAutoCompleteUsage />
  
          {products && <SearchProductsUsage />}
        </SearchDropdown>
      </SearchProvider>
    )
  }
  
  export default SearchDropdownUsage