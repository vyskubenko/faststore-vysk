import React, { useState } from "react";
import styles from "./CustomHeader.module.scss";
import {
  RegionBar,
  Badge,
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



import type { NavbarProps as OverrideNavigationProps } from "@faststore/core/src/components/sections/Navbar/Navbar";

import { SearchInput } from "../Search";

import myAccountIcon from "../../assets/accountIcon.svg"
import bagIcon from "../../assets/bagIcon.svg"
import storeLocatorIcon from "../../assets/storeLocator.svg"
import closeIcon from "../../assets/closeIcon.svg"

import {
  useCart_unstable as useCart,
  useSession_unstable as useSession,
  //useCheckoutButton_unstable as useCheckoutButton,
  useCartToggleButton_unstable as useCartToggleButton,
  // @ts-ignore next-line
} from "@faststore/core/experimental";

interface menuLinks {
  title: string;
  href: string;
}

interface topBarInfo {
  infoText: string;
}

interface navButtons {
  title: string;
  icon: string;
  href: string;
}

export interface CustomHeaderProps {
  navbar: OverrideNavigationProps["searchInput"];
  cart: OverrideNavigationProps["cartIcon"];
  logoLink: {
    text: string;
    url: string;
  };
  logo: {
    alt: string;
    src: string;
    link: {
      url: string;
      title: string;
    };
  };
  topbar: topBarInfo[];
  region: {
    enabled:boolean;
  };
  navButtons: navButtons[];
  menu: menuLinks[];
}

export default function CustomHeader(props: CustomHeaderProps) {
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
          {topbar.length > 0 && (
            <ul className={styles.topBar__list}>
              {topbar.map((item, index) => (
                <li key={index} className={styles.topBar__list__item}>
                  {item.infoText}
                </li>
              ))}
            </ul>
          )}

          {region?.enabled && (
            <RegionBar
              label="Set your location"
              icon={
                <img
                  src={storeLocatorIcon.src}
                  width={storeLocatorIcon.width}
                  height={storeLocatorIcon.height}
                  data-fs-icon
                />
              }
              postalCode={postalCode}
              className={styles.topbar__regionBar}
              onButtonClick={() => openModal()}
            />
          )}
        </div>
      </div>

      <NavbarHeader>
        <NavbarRow>
          <div className={styles.customHeader__wrapper}>

            <IconButton
              data-fs-navbar-button-menu
              aria-label="Open Menu"
              className={styles.buttonMenu}
              icon={displayNavbar ? <img
                src={closeIcon.src}
                width={closeIcon.width}
                height={closeIcon.height}
                data-fs-icon
              /> : <Icon name="List" width={30} height={30} />}
              onClick={displayNavbar ? closeNavbar : openNavbar}
            />

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

            <NavbarLinks className={styles.customHeader__navLinks}>
              <NavbarLinksList className={styles.customHeader__menu}>
                {mainMenu.map((link) => (
                  <NavbarLinksListItem key={link.title}>
                    <Link variant="display" href={link.href}>
                      {link.title}
                    </Link>
                  </NavbarLinksListItem>
                ))}
              </NavbarLinksList>
            </NavbarLinks>

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

              <Link
                href={person?.id ? `/account` : `/login`}
                className={styles.navButtons__item}
              >
                <img
                  src={myAccountIcon.src}
                  width={myAccountIcon.width}
                  height={myAccountIcon.height}
                />
              </Link>
              <IconButton
                data-fs-cart-toggle
                aria-label="cart"
                icon={
                  <img
                    src={bagIcon.src}
                    width={bagIcon.width}
                    height={bagIcon.height}
                  />
                }
                className={styles.navButtons__item}
                onClick={() => {
                  toggleCart();
                }}
              >
                
                <Badge counter variant="info">
                  {cart.totalItems}
                </Badge>
              </IconButton>
            </NavbarButtons>
          </div>
        </NavbarRow>
      </NavbarHeader>

      {displayNavbar && (

        <NavbarLinks className={styles.navLinks__mobile}>
          <NavbarLinksList className={styles.customHeader__menu}>
            {mainMenu.map((link) => (
              <NavbarLinksListItem key={link.title}>
                <Link variant="display" href={link.href}>
                  {link.title}
                </Link>
              </NavbarLinksListItem>
            ))}
          </NavbarLinksList>
        </NavbarLinks>
      )}
    </Navbar>
  );
}
