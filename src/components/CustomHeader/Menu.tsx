import React, { useState } from "react";
import {
  NavbarLinks,
  NavbarLinksList,
  NavbarLinksListItem,
  Link,
} from "@faststore/ui";
import { FC } from "react";

import ExtendedDropdown from './ExtendedDropdown'

import styles from "./CustomHeader.module.scss";

export type MenuProps = {
  menu: any;
};


const MenuItem2 = ({ item }:any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    toggleSubMenu();
  };

  const hasChildren = item.submenu && item.submenu.length > 0;

  return (
    <li>
      <div className={`menu-item ${hasChildren ? 'has-children' : ''}`} onClick={handleClick}>
        {item.title}
      </div>
      {hasChildren && isOpen && (
        <ul className="submenu">
          {item.submenu.map((subItem, index) => (
            <li key={index}>
              <MenuItem2 item={subItem} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};


const Menu2 = ({ menuItems }:any) => {
  return (
    <div className="menu">
      <ul>
        {menuItems.map((item, index) => (
          <MenuItem2 key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

const Menu: FC<MenuProps> = ({ menu: mainMenu  }) => {
  // const { selectedLink } = useNavigationContext()

  console.log(mainMenu)

  return (
    <NavbarLinks className={styles.customHeader__navLinks}>
      <NavbarLinksList className={styles.customHeader__menu}>

      <Menu2 menuItems={mainMenu} />

        {mainMenu.map((link: any, idx: React.Key | null | undefined) => (
          <NavbarLinksListItem key={idx}>
            <Link 
              variant="default" 
              href={link.href}
            >
              {link.title}
            </Link>
            <ExtendedDropdown link={link} level={1} />
          </NavbarLinksListItem>
        ))}
      </NavbarLinksList>
    </NavbarLinks>
  );
};

export default Menu;
