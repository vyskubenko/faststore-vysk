import type { SearchEvent, SearchState,  } from '@faststore/sdk'
import { sendAnalyticsEvent, formatSearchState, initSearchState  } from '@faststore/sdk'
import type {
  SearchInputFieldProps as UISearchInputFieldProps,
  SearchInputFieldRef as UISearchInputFieldRef,
} from '@faststore/ui'
import {
  SearchProviderContextValue,
  SearchInput as UISearchInput,
  SearchInputField as UISearchInputField,
  Icon
} from '@faststore/ui'
import { useRouter } from 'next/router'
import type { CSSProperties, RefObject } from 'react'
import {
  Suspense,
  forwardRef,
  lazy,
  useDeferredValue,
  useImperativeHandle,
  useRef,
  useState,
  useEffect
} from 'react'

//import { formatSearchPath } from 'src/sdk/search/formatSearchPath'
import { useSearchHistory_unstable, useSuggestions_unstable } from '@faststore/core/experimental'

type FormatSearchPath = {
    term: string
    sort?: SearchState['sort']
  }
  
  const formatSearchPath = ({ term, sort }: FormatSearchPath) => {
    const { pathname, search } = formatSearchState(
      initSearchState({
        term,
        sort,
        base: '/s',
      })
    )
  
    return `${pathname}${search}`
  }


  type Handler = (event: any) => void

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
) {
  useEffect(
    () => {
      const listener: Handler = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    /**
     * Add ref and handler to effect dependencies.
     * It's worth noting that because passed in handler is a new
     * function on every render that will cause this effect
     * callback/cleanup to run every render. It's not a big deal
     * but to optimize you can wrap handler in useCallback before
     * passing it into this hook.
     */
    [ref, handler]
  )
}

const SearchDropdown = lazy(
  () => import('../SearchDropdown')
)

const MAX_SUGGESTIONS = 5

export type SearchInputProps = {
  onSearchClick?: () => void
  buttonTestId?: string
  containerStyle?: CSSProperties
  placeholder?: string
  className?: string
  sort?: string
} & Omit<UISearchInputFieldProps, 'onSubmit'>

export type SearchInputRef = UISearchInputFieldRef & {
  resetSearchInput: () => void
}

const sendAnalytics = async (term: string) => {
  sendAnalyticsEvent<SearchEvent>({
    name: 'search',
    params: { search_term: term },
  })
}

const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(
  function SearchInput(
    {
      onSearchClick,
      buttonTestId = 'fs-search-button',
      containerStyle,
      sort,
      placeholder,
      className,
      ...otherProps
    },
    ref
  ) {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const searchQueryDeferred = useDeferredValue(searchQuery)
    const [searchDropdownVisible, setSearchDropdownVisible] =
      useState<boolean>(false)

    const searchRef = useRef<HTMLDivElement>(null)
    const { addToSearchHistory } = useSearchHistory_unstable()
    const router = useRouter()

    useImperativeHandle(ref, () => ({
      resetSearchInput: () => setSearchQuery(''),
    }))

    const onSearchSelection: SearchProviderContextValue['onSearchSelection'] = (
      term,
      path
    ) => {
      addToSearchHistory({ term, path })
      sendAnalytics(term)
      setSearchDropdownVisible(false)
      setSearchQuery(term)
    }

    useOnClickOutside(searchRef, () => setSearchDropdownVisible(false))

    const { data, error } = useSuggestions_unstable(searchQueryDeferred)
    const terms = (data?.search.suggestions.terms ?? []).slice(
      0,
      MAX_SUGGESTIONS
    )
    const products = (data?.search.suggestions.products ?? []).slice(
      0,
      MAX_SUGGESTIONS
    )
    const isLoading = !error && !data

    return (
      <UISearchInput
        ref={searchRef}
        visibleDropdown={searchDropdownVisible}
        onSearchSelection={onSearchSelection}
        term={searchQueryDeferred}
        terms={terms}
        products={products}
        isLoading={isLoading}
        className={className}
      >

        <UISearchInputField
          ref={ref}
          buttonProps={{
            onClick: onSearchClick,
            testId: buttonTestId,
          }}
          //buttonIcon={<Icon name='User' />}
          placeholder={placeholder ?? "Type your search"}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSubmit={(term) => {
            const path = formatSearchPath({
                term,
                sort: sort as SearchState['sort'],
              })
  

            onSearchSelection(term, path)
            router.push(path)
          }}
          onFocus={() => setSearchDropdownVisible(true)}
          value={searchQuery}
          {...otherProps}
        />

        {searchDropdownVisible && (
          <Suspense fallback={null}>
            <SearchDropdown sort={sort} />
          </Suspense>
        )}
      </UISearchInput>
    )
  }
)

export default SearchInput