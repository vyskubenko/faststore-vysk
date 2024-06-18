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
  region: boolean;
  navButtons: navButtons[];
  menu: menuLinks[];
}

export default function CustomHeader(props: CustomHeaderProps) {
  const scrollDirection = useScrollDirection();
  const { openNavbar, navbar: displayNavbar } = useUI();

  const { modal, openModal } = useUI();

  const { person, postalCode } = useSession();
  const cart = useCart();

  const { onClick: toggleCart } = useCartToggleButton();

  const { topbar, navButtons, region, menu: mainMenu } = props;

  console.log(props);

  const links = [
    "Office",
    "Home Appliances",
    "Computer and Software",
    "Technology",
  ];

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
              icon={<Icon name="MapPin" />}
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

            <NavbarLinks>
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

            {/* <IconButton
              data-fs-navbar-button-menu
              aria-label="Open Menu"
              icon={<Icon name="List" width={30} height={30} />}
              onClick={openNavbar}
            /> */}
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
                        <img src={item.icon} height={32} />
                      </Link>
                  ))}
                </>
              )}

              <Link
                href={person?.id ? `/account` : `/login`}
                className={styles.navButtons__item}
              >
                <Icon name="User" width={32} height={32} />
              </Link>
              <IconButton
                data-fs-cart-toggle
                aria-label="cart"
                icon={<Icon name="ShoppingCart" width={32} height={32} />}
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
    </Navbar>
  );
}
