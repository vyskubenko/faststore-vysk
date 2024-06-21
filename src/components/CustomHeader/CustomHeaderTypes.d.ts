interface subMenuLinks3 {
    title: string;
    href: string;
    image: string;
    headTitle: boolean;
  }
  
  interface subMenuLinks {
    title: string;
    href: string;
    headTitle: boolean;
    submenu: subMenuLinks3[];
  }
  
  interface menuLinks {
    title: string;
    href: string;
    submenu: subMenuLinks[];
  }
  
  interface topBarInfo {
    infoText: string;
  }
  
  interface topBarInfoWrap {
    left: string;
    right: string;
    center: topBarInfo[];
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
    topbar: topBarInfoWrap;
    region: {
      enabled:boolean;
    };
    navButtons: navButtons[];
    menu: menuLinks[];
  }