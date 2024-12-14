const navLink = [
  {
    path: "/",
    title: "Trang chủ",
  },
  {
    path: "/product?manufacture=all",
    title: "Sản phẩm",
    subNav: [
      {
        path: "/product?manufacture=all",
        title: "Sản phẩm",
      },
      {
        path: "/product?manufacture=all",
        title: "Sản phẩm",
      },
    ],
  },
  // {
  //   path: "/contact",
  //   title: "Liên hệ",
  // },
];

export { navLink };
