"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as routeUtils from "@/utils/routeUtils";

export default function NavigationBar() {
    return (
        <nav
            className="navbar navbar-expand-xl fixed-top shadow fs-5"
            id="navbar"
            data-bs-theme="light"
        >
            <div className="container">
                {/* Main logo */}
                <Link
                    href={routeUtils.getHomeRoutePath()}
                    className="navbar-brand d-flex align-items-center"
                >
                    <Image
                        src="/images/main-logo-transparent-white-without-text.png"
                        className="me-2 flex-shrink-0"
                        alt="Main Logo"
                    />
                    <span className="fs-2 application-short-name">NATS</span>
                </Link>
                <button
                    className="navbar-toggler fs-3 me-2 py-2"
                    id="navbar-toggler-button"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#navbar-content"
                    aria-controls="navbar-content"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="bi bi-list"></i>
                </button>
                <div
                    className="offcanvas offcanvas-end"
                    tabIndex={-1}
                    id="navbar-content"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                            Điều hướng
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close">
                        </button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0
                                        justify-content-end w-100">
                            {/* Home */}
                            <NavigationItem path={routeUtils.getHomeRoutePath()}>
                                Trang chủ
                            </NavigationItem>

                            {/* SummaryItem */}
                            <NavigationItem path={routeUtils.getSummaryItemsRoutePath()}>
                                Giới thiệu
                            </NavigationItem>
                            
                            {/* AboutUsIntroduction */}
                            <NavigationItem path={routeUtils.getAboutUsRoutePath()}>
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
            </div>
        </nav>
    );
}

function NavigationItem(props: { path: string, children: React.ReactNode }) {
    // Dependencies.
    const pathName = usePathname();

    // Computed.
    const computeItemClassName = (): string => {
        if (pathName.startsWith(pathName)) {
            return "active";
        }

        return "";
    };

    return (
        <li className="nav-item">
            <Link href={props.path} className={`nav-link ${computeItemClassName()}`}>
                {props.children}
            </Link>
        </li>
    );
}