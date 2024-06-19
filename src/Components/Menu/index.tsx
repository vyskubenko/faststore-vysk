import React, { useState } from "react";

import {
    NavbarLinks,
    NavbarLinksList,
    NavbarLinksListItem,
    Link,
    Icon,
    IconButton,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
} from "@faststore/ui";

interface MenuItem {
    url: string;
    title: string;
    subMenu?: MenuItem[];
}

interface MenuProps {
    links?: MenuItem[];
    level?: number;
    isMobile?: boolean;
}

const Menu = ({ links = [], isMobile = false }: MenuProps) => {
    return isMobile ? <MenuMobile links={links} /> : <MenuDesktop links={links} />;
};

const MenuMobile = ({ links = [] }: MenuProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleToggleModal = () => setModalOpen(!modalOpen);

    return (
        <div data-fs-menu-main-container>
            <Button data-fs-menu-open-modal-button onClick={handleToggleModal}>
                <Icon name="FadersHorizontal" />
                <p>Menu</p>
            </Button>
            <div data-fs-menu-container-links data-fs-container-open={modalOpen}>
                <IconButton icon={<Icon name="X" />} aria-label="close-menu" onClick={handleToggleModal} />
                <NavbarLinks>
                    <NavbarLinksList>
                        {links.map(({ url, title, subMenu }, index: number) => (
                            <NavbarLinksListItem key={`${url ?? "title"}-${index}-mobile-0`}>
                                <MenuTitle title={title} url={url} />
                                <MenuLevelMobile links={subMenu} level={1} />
                            </NavbarLinksListItem>
                        ))}
                    </NavbarLinksList>
                </NavbarLinks>
            </div>
            <div data-fs-menu-modal-backdrop onClick={handleToggleModal} />
        </div>
    );
};

const MenuDesktop = ({ links = [] }: MenuProps) => {
    return (
        <div data-fs-menu-main-container>
            <div data-fs-menu-container-links>
                <NavbarLinks>
                    <NavbarLinksList>
                        {links.map(({ url, title, subMenu }, index: number) => (
                            <NavbarLinksListItem key={`${url ?? "title"}-${index}-desktop-0`}>
                                <MenuTitle title={title} url={url} />
                                <MenuLevelDesktop links={subMenu} level={1} />
                            </NavbarLinksListItem>
                        ))}
                    </NavbarLinksList>
                </NavbarLinks>
            </div>
        </div>
    );
};

const MenuLevelDesktop = ({ links = [], level = 1 }: MenuProps) => {
    return (
        !!links?.length && (
            <ul data-fs-menu-items-level={level}>
                {links?.map(({ url, title, subMenu }, index) => (
                    <li data-fs-navbar-links-list-item key={`${url ?? "content"}-${index}-desktop-${level}`}>
                        <MenuTitle title={title} url={url} />
                        <MenuLevelDesktop links={subMenu} level={level + 1} />
                    </li>
                ))}
            </ul>
        )
    );
};

const MenuLevelMobile = ({ links = [], level = 1 }: MenuProps) => {
    const [indices, setIndices] = useState<number[]>(links.map(() => 0));

    const handleAccordionToggle = (indice: number) => {
        if (indices.includes(indice)) {
            setIndices([]);
            return;
        }
        setIndices([indice]);
    };

    return (
        !!links?.length && (
            <Accordion indices={indices} onChange={handleAccordionToggle} data-fs-menu-items-level={level}>
                {links?.map(({ url, title, subMenu }, index) =>
                    subMenu?.length && title && level === 1 ? (
                        <AccordionItem key={`${url ?? "content"}-${index}-desktop-${level}`}>
                            <AccordionButton
                                expandedIcon={
                                    <Icon name="CaretUp" data-icon="expanded" weight="thin" width={18} height={18} />
                                }
                                collapsedIcon={
                                    <Icon name="CaretDown" data-icon="collapsed" weight="thin" width={18} height={18} />
                                }
                            >
                                {title}
                            </AccordionButton>
                            <AccordionPanel>
                                <MenuLevelMobile links={subMenu} level={level + 1} />
                            </AccordionPanel>
                        </AccordionItem>
                    ) : (
                        <div data-fs-navbar-links-list-item key={`${url ?? "content"}-${index}-desktop-${level}`}>
                            <MenuTitle title={title} url={url} />
                            <MenuLevelMobile links={subMenu} level={level + 1} />
                        </div>
                    )
                )}
            </Accordion>
        )
    );
};

const MenuTitle = ({ title = "", url = "" }: MenuItem) => {
    return (
        title && (
            <Link variant="display" href={url}>
                {title}
            </Link>
        )
    );
};

export default Menu;
