import React, { useState } from "react";
import { NavbarLinksListItem, Link, Button } from "@faststore/ui";

import styles from "./CustomHeader.module.scss";

import { CloseIcon, MenuArrow } from "../../assets/Icons";

export type MenuProps = {
  menu: any;
};

const MenuItem = ({ item, level}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    toggleSubMenu();
  };

  const hasChildren = item.submenu && item.submenu.length > 0;

  return (
    <NavbarLinksListItem
      className={`menu-item ${hasChildren ? "has-children" : ""}`}
    >
      <Link
        data-fs-button-dropdown-link-highlight={item.headTitle}
        size={item.headTitle ? "small" : "regular"}
        href={item.href}
        data-testid="data-fs-button-dropdown-link"
        className={styles.navLink}
        onClick={handleClick}
        variant={hasChildren ? "display" : "default"}
        as={hasChildren ? "span" : "a"}
      >
        {item.title}

        {item?.image ? <img src={item.image} /> : <MenuArrow />}
      </Link>

      {hasChildren && isOpen && (
        <ul
          data-fs-dropdown-menu
          data-testid="data-fs-dropdown-menu"
          className={styles.subMenu}
          data-level={level}
        >
          <Button variant="tertiary" icon={<CloseIcon />} onClick={handleClick} size="small" />

          {item.submenu.map((subItem: any, index: any) => (
            <li key={index}>
              <MenuItem item={subItem} level={level + 1} />
            </li>
          ))}
        </ul>
      )}
    </NavbarLinksListItem>
  );
};

export default MenuItem;
