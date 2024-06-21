import React from "react";
import { Dropdown as DropdownUI } from "@faststore/ui";
import { FC } from "react";

import ExtendedDropdownMenu from './ExtendedDropdownMenu'

export type ExtendedDropdownProps = {
  link: any;
  level: any;
  idx?: number;
};

const ExtendedDropdown: FC<ExtendedDropdownProps> = ({ link, level  }) => {
  // const { selectedLink } = useNavigationContext()

  return (
    <DropdownUI isOpen={link.text === 1 ? true : undefined}>
      {link?.submenu?.length ? <ExtendedDropdownMenu link={link} level={level} /> : '' }
    </DropdownUI>
  );
};

export default ExtendedDropdown;
