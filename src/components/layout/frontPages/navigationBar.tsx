import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as routeUtils from "@/utils/routeUtils";
import styles from "./navigationBar.module.css";

export default function NavigationBar() {
  // States.
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  // Computed.
  function computeNavBarCollapseClassName(): string {
    let classNames = styles.navBarCollapse;
    if (isContentVisible) {
      classNames += " show";
    }
    
    return classNames;
  }

  return (
    <nav
      className={`navbar navbar-expand-xl fixed-top shadow fs-5 ${styles.nav}`}
      data-bs-theme="light"
    >
      <div className="container">
        {/* Main logo */}
        <Link
          href={routeUtils.getHomeRoutePath()}
          className="navbar-brand d-flex align-items-center text-decoration-none"
        >
          <Image
            src="/images/main-logo-transparent-white-without-text.png"
            className={`me-2 flex-shrink-0 ${styles.logo}`}
            alt="Main Logo"
            width={48}
            height={48}
          />
          <span className={`fs-2 ${styles.applicationShortName}`}>
            NATS
          </span>
        </Link>

        <button
          className={`navbar-toggler fs-3 me-2 py-2 ${styles.togglerButton}`}
          id="navbar-toggler-button"
          type="button"
          data-bs-toggle="collapse"
          aria-controls="navbar-content"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsContentVisible(isVisible => !isVisible)}
        >
          <i className="bi bi-list"></i>
        </button>
        
        <div className={`collapse navbar-collapse ${computeNavBarCollapseClassName()}`}>
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.itemListContainer}`}>
            {/* Home */}
            <NavigationItem path={routeUtils.getHomeRoutePath()}>
              Trang chủ
            </NavigationItem>

            {/* SummaryItem */}
            <NavigationItem path={routeUtils.getSummaryItemsRoutePath()}>
              Giới thiệu
            </NavigationItem>

            {/* AboutUsIntroduction */}
            <NavigationItem path={routeUtils.getAboutUsIntroductionRoutePath()}>
              Về chúng tôi
            </NavigationItem>

            {/* CatalogItem - Services */}
            <NavigationItem path={routeUtils.getServiceListRoutePath()}>
              Dịch vụ
            </NavigationItem>

            {/* CatalogItem - Course */}
            <NavigationItem path={routeUtils.getCourseListRoutePath()}>
              Khoá học
            </NavigationItem>

            {/* CatalogItem - Product */}
            <NavigationItem path={routeUtils.getProductListRoutePath()}>
              Sản phẩm
            </NavigationItem>

            {/* Contacts */}
            <NavigationItem path={routeUtils.getContactsRoutePath()}>
              Liên hệ
            </NavigationItem>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function NavigationItem(props: { path: string, children: React.ReactNode }) {
  // Dependencies.
  const pathName = usePathname();

  // Computed.
  const computeItemClassName = (): string => {
    const classNames = [styles.link];
    if ((pathName === "/" && props.path === "/") ||
      (props.path !== "/" && pathName.startsWith(props.path))) {
      classNames.push("active");
    }

    return classNames.join(" ");
  };

  return (
    <li className="nav-item">
      <Link href={props.path} className={`nav-link ${computeItemClassName()}`}>
        {props.children}
      </Link>
    </li>
  );
}