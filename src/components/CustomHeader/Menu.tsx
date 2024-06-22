import React, { useState } from "react";
import {
  NavbarLinks,
  NavbarLinksList
} from "@faststore/ui";
import { FC } from "react";

import styles from "./CustomHeader.module.scss";

import MenuItem from "./MenuItem";


export type MenuProps = {
  menu: any;
};

const Menu: FC<MenuProps> = ({ menu: mainMenu  }) => {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <NavbarLinks className={styles.customHeader__navLinks}>
      <NavbarLinksList className={styles.customHeader__menu}>
        {mainMenu.map((item: any, idx: React.Key | null | undefined) => (
          <MenuItem
            key={idx}
            item={item}
            level={1}
            isOpen={openIndex === idx}
            onClick={() => handleItemClick(idx as any)}
          />
        ))}
      </NavbarLinksList>
    </NavbarLinks>
  );
};

export default Menu;
