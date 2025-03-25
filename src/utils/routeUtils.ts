export const getHomeRoutePath = () => "/";
export const getAboutUsIntroductionRoutePath= () => "/ve-chung-toi";
export const getSummaryItemsRoutePath = (id?: number) => {
    if (id != null) {
        return `/gioi-thieu#${id}`;
    }

    return "/gioi-thieu";
};
export const getServiceListRoutePath = () => "/dich-vu";
export const getServiceDetailRoutePath = (id: number) => `/dich-vu/${id}`;
export const getCourseListRoutePath = () => "/khoa-hoc";
export const getCourseDetailRoutePath = (id: number) => `/khoa-hoc/${id}`;
export const getProductListRoutePath = () => "/san-pham";
export const getProductDetailRoutePath = (id: number) => `/san-pham/${id}`;
export const getContactsRoutePath = () => "/lien-he";
export const getEnquiryRoutePath = () => "/cau-hoi";