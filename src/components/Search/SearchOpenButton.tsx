import React from "react";
import { Icon, Button } from "@faststore/ui";

const SearchOpenButton = ({ setOpenSearch }: any) => {
    const handleToggleModal = () => setOpenSearch((modalOpen: boolean) => !modalOpen);

    return (
        <Button data-fs-search-open-modal-button onClick={handleToggleModal}>
            <Icon name="MagnifyingGlass" />
            <p>Search</p>
        </Button>
    );
};

export default SearchOpenButton;
