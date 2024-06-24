import React, { useState } from "react";
import styles from "./CustomHeader.module.scss";
import {
  RegionBar,
  NavbarLinks,
  NavbarLinksList,
  NavbarLinksListItem,
  IconButton,
  Icon,
  Link,
  Navbar,
  NavbarHeader,
  NavbarRow,
  NavbarButtons,
  useUI,
  useScrollDirection,
} from "@faststore/ui";

// import type { NavbarProps as OverrideNavigationProps } from "@faststore/core/src/components/sections/Navbar/Navbar";

import { SearchInput } from '../Search';

import Menu from './Menu'

import {PhoneIcon,BagIcon,StoreLocatorIconBlue, MyAccountIcon} from "../../assets/Icons"
import closeIcon from "../../assets/closeIcon.svg"

import {
  useCart_unstable as useCart,
  useSession_unstable as useSession,
  //useCheckoutButton_unstable as useCheckoutButton,
  useCartToggleButton_unstable as useCartToggleButton,
  // @ts-ignore next-line
} from "@faststore/core/experimental";


import { CustomHeaderProps } from './CustomHeaderTypes'

export default function CustomHeader(props: CustomHeaderProps)  {
  const scrollDirection = useScrollDirection();
  const { openNavbar, closeNavbar, navbar: displayNavbar } = useUI();

  const { modal, openModal } = useUI();

  const { person, postalCode } = useSession();
  const cart = useCart();

  const { onClick: toggleCart } = useCartToggleButton();

  const { topbar, navButtons, region, menu: mainMenu } = props;

  return (
    <Navbar
      scrollDirection={scrollDirection}
      className={`${styles.section} ${styles.customHeader} section-navbar`}
    >
      <div className={styles.topBar}>
        <div data-fs-content="topbar" className={styles.topBar__wrapper}>

          {topbar?.left ? ( 
            <span className={styles.topBar__listLeft}>{topbar?.left}</span>
          ):''}
          {topbar?.center?.length > 0 && (
            <ul className={styles.topBar__list}>
              {topbar.center.map((item, index) => (
                <li key={index} className={styles.topBar__list__item}>
                  {item.infoText}
                </li>
              ))}
            </ul>
          )}
          {topbar?.right ? (
            <span className={styles.topBar__listRight}>{topbar?.right}</span>
          ):'' }

        </div>
      </div>

      <NavbarHeader>
        <NavbarRow>
          <div className={styles.customHeader__wrapper}>

            

            <Link
              data-fs-navbar-logo
              href={props.logo.link ? props.logo.link.url : "/"}
              title={props.logo.link.title}
              prefetch={false}
              className={styles.customHeader__logo}
            >
              <img
                src={props.logo.src}
                style={{ width: "100%", height: "auto" }}
              />
            </Link>

            <SearchInput  className={styles.customHeader__search} />
            
            <NavbarButtons className={styles.navbarButtons} searchExpanded={false}>

              {navButtons.length > 0 && (
                <>
                  {navButtons.map((item, index) => (
                     <Link
                        key={index}
                        href={item.href}
                        title={item.title}
                        className={styles.navButtons__item}
                      >
                        <img src={item.icon} height={22} />
                      </Link>
                  ))}
                </>
              )}

              {region?.enabled && (
                <RegionBar
                  label="Set your location"
                  icon={
                    <StoreLocatorIconBlue data-fs-icon />
                  }
                  postalCode={postalCode}
                  className={styles.customHeader__regionBar}
                  onButtonClick={() => openModal()}
                />
              )}
              
              <Link
                href="/contact-us"
                className={`${styles.navButtons__item} ${styles.navButtons__item__contact}`}
              >
                <PhoneIcon />
                <span className={styles.navButtons__item__text}>
                  Help
                </span>
              </Link>

              <Link
                href={person?.id ? `/account` : `/login`}
                className={styles.navButtons__item}
              >
                <MyAccountIcon />
                <span className={styles.navButtons__item__text}>
                  Account
                </span>
              </Link>
              <IconButton
                data-fs-cart-toggle
                aria-label="cart"
                icon={
                  <BagIcon/>
                }
                className={`${styles.navButtons__item} ${styles.navButtons__itemCart}`}
                onClick={() => {
                  toggleCart();
                }}
              >
                {/* <Badge counter variant="info">
                  
                </Badge> */}
                <span className={styles.navButtons__item__text}>
                  Bag ( {cart.totalItems} )
                </span>
              </IconButton>
              <IconButton
                data-fs-navbar-button-menu
                aria-label="Open Menu"
                className={`${styles.navButtons__item} ${styles.buttonMenu}`}
                icon={displayNavbar ? <img
                  src={closeIcon.src}
                  width={closeIcon.width}
                  height={closeIcon.height}
                  data-fs-icon
                /> : <Icon name="List" width={30} height={30} />}
                onClick={displayNavbar ? closeNavbar : openNavbar}
              />
            </NavbarButtons>
          </div>
        </NavbarRow>

        <div className={styles.customHeader__menu__wrapper}>
          <NavbarRow>
            
            <Menu menu={mainMenu} />

          </NavbarRow>
        </div>
      </NavbarHeader>

      {displayNavbar && (

        <div  className={styles.navLinks__mobile}>
          <Menu menu={mainMenu} />
        </div>
        
      )}
    </Navbar>
  );
}
