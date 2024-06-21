import React, { FC } from "react";
import ExtendedDropdownButton from "./ExtendedDropdownButton";

import { Button } from "@faststore/ui";

import { CloseIcon } from "../../assets/Icons";

import styles from "./CustomHeader.module.scss";

export type ExtendedDropdownMenuProps = {
  link: any;
  level: any;
};

const ExtendedDropdownMenu: FC<ExtendedDropdownMenuProps> = ({
  link,
  level,
}) => {
  return (
    <ul
      data-fs-dropdown-menu
      aria-label={link?.text}
      data-testid="data-fs-dropdown-menu"
      data-level={level}
      className={styles.subMenu}
    >
      <Button variant="tertiary" icon={<CloseIcon />} size="small" />

      {link?.submenu.map((link: any, idx: any) => (
        <ExtendedDropdownButton link={link} key={idx} />
      ))}
    </ul>
  );
};

export default ExtendedDropdownMenu;
