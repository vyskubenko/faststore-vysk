import React from "react";
import SearchInput from "./SearchInput";

const SearchContainer = ({ openSearch }: any) => {
    return (
        <div data-fs-search-container-row data-fs-container-open={openSearch}>
            <SearchInput />
        </div>
    );
};

export default SearchContainer;
