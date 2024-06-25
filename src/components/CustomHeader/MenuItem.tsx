import React, { useState } from "react";
import { NavbarLinksListItem, Link, Button } from "@faststore/ui";

import styles from "./CustomHeader.module.scss";

import { CloseIcon, MenuArrow, ArrowRightPath } from "../../assets/Icons";

export type MenuProps = {
  menu: any;
};

const MenuItem = ({ item, level, isOpen, onClick }: any) => {
  
  const [subMenuOpenIndex, setSubMenuOpenIndex] = useState<number | null>(null);

  const handleSubItemClick = (index: number) => {
    setSubMenuOpenIndex(index === subMenuOpenIndex ? null : index);
  };

  const hasChildren = item.submenu && item.submenu.length > 0;


  return (
    <NavbarLinksListItem
      className={`${styles.subMenu__item} ${item.headTitle ? 'subMenu__item__headTitle' : ''} ${hasChildren ? "has-children" : ""} ${isOpen ? styles.subMenu__itemOpen : ""} `}
      data-level={level}
      data-headtitle={item.headTitle}
    >
      <Link
        data-fs-button-dropdown-link-highlight={item.headTitle}
        size={item.headTitle ? "small" : "regular"}
        href={item.href}
        data-testid="data-fs-button-dropdown-link"
        className={styles.navLink}
        onClick={onClick}
        variant={hasChildren ? "display" : "default"}
        as={hasChildren ? "span" : "a"}
      >
        {item.title}

        {item?.image ? <img src={item.image} /> : (
          
          item.headTitle ? <ArrowRightPath /> : <MenuArrow />
        
        )}
      </Link>

      {hasChildren && isOpen && (
        <ul
          data-fs-dropdown-menu
          data-testid="data-fs-dropdown-menu"
          className={styles.subMenu}
          data-level={level}
        >

          <li className={styles.subMenu__item__head}>
            <h4>{item.title}</h4>
            <Button className={styles.subMenu__item__head__close} variant="tertiary" icon={<CloseIcon />} onClick={onClick} size="small" />
          </li>

          {item.submenu.map((subItem: any, index: any) => (
            <MenuItem
              item={subItem}
              key={index}
              level={level + 1}
              isOpen={subMenuOpenIndex === index}
              onClick={() => handleSubItemClick(index)}
            />
          ))}
        </ul>
      )}
    </NavbarLinksListItem>
  );
};

export default MenuItem;
