import React from "react";
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

  return (
    <NavbarLinks className={styles.customHeader__navLinks}>
      <NavbarLinksList className={styles.customHeader__menu}>
    
        {mainMenu.map((item: any, idx: React.Key | null | undefined) => (
          <MenuItem key={idx} item={item} level={1} />
        ))}
      </NavbarLinksList>
    </NavbarLinks>
  );
};

export default Menu;
