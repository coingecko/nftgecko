let routes: any = [
  {
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/nft", component: () => import("pages/ShowAllNFT.vue") },
      {
        path: "/nft/:network",
        component: () => import("pages/ShowNetworkNFT.vue"),
      },
      { path: "/nft/:network/:slug", component: () => import("pages/NFT.vue") },
      { path: "/settings", component: () => import("pages/Settings.vue") },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes = [
    ...routes,
    {
    path: "*",
    component: () => import("pages/Error404.vue"),
    children: [],
  }];
}

export default routes;
