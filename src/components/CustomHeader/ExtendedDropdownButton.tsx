import React, { MouseEventHandler, FC } from "react";
import { Link, NavbarLinksListItem } from "@faststore/ui";

import ExtendedDropdown from './ExtendedDropdown'

import styles from "./CustomHeader.module.scss";

import {MenuArrow} from "../../assets/Icons"


export type ExtendedDropdownButton = {
  link: any;
  key: number;
};

const ExtendedDropdownButton: FC<ExtendedDropdownButton> = ({ link, key }) => {
  //const { selectedLink, setSelectedLink } = useNavigationContext()

  const handleCategoryMouseEnter: MouseEventHandler<HTMLElement> = (
    e: React.MouseEvent<HTMLElement>
  ) => {
    const target = e.target as HTMLElement;
    if (target?.textContent) {
      //setSelectedLink(target.textContent)
    }
  };

  return (
			<NavbarLinksListItem key={key}>
				<Link
					data-fs-button-dropdown-link-highlight={link.headTitle}
					size={link.headTitle ? "small" : "regular"}
					href={link.href}
					onMouseEnter={handleCategoryMouseEnter}
					//aria-expanded={text === selectedLink}
					data-testid="data-fs-button-dropdown-link"
					className={styles.navLink}
				>
					{link.title}

					{link?.image ? (
						<img
						src={link.image}
					/>
					) : <MenuArrow/>}
					
				</Link>
				<ExtendedDropdown link={link} level={2} />
			</NavbarLinksListItem>
  );
};

export default ExtendedDropdownButton;
