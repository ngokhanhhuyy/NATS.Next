const routes = {
    getHomeRoutePath: () => "/",
    getAboutUsRoutePath: () => "/ve-chung-toi",
    getSummaryItemsRoutePath: () => "/gioi-thieu",
    getServiceListRoutePath: () => "/dich-vu",
    getServiceDetailRoutePath: (id: number) => `/dich-vu/${id}`,
    getCourseListRoutePath: () => "/khoa-hoc",
    getCourseDetailRoutePath: (id: number) => `/khoa-hoc/${id}`
};

export function useRouteUtility() {
    return routes;
}