import houseIcon from "assets/house_chimney.svg";
import staffIcon from "assets/staff_icon.svg";
import customerIcon from "assets/customer_icon.svg";
import manufactureIcon from "assets/manufacture_icon.svg";
import productIcon from "assets/product_icon.svg";
import orderByIcon from "assets/order_by_icon.svg";
import bannerSidebarIcon from "assets/banner_sidebar_icon.svg";
import statisticalIcon from "assets/statistical_icon.svg";
import postIcon from "assets/post_icon.svg";

import houseIconActive from "assets/house_chimney_active.svg";
import staffIconActive from "assets/staff_icon_active.svg";
import customerIconActive from "assets/customer_icon_active.svg";
import manufactureIconActive from "assets/manufacture_icon_active.svg";
import productIconActive from "assets/product_icon_active.svg";
import orderByIconActive from "assets/order_by_icon_active.svg";
import bannerSidebarIconActive from "assets/banner_sidebar_icon_active.svg";
import statisticalIconActive from "assets/statistical_icon_active.svg";
import postIconActive from "assets/post_icon_active.svg";

const menuSideBar = [
  {
    id: "dashboard",
    path: "dashboard",
    title: "Trang chủ",
    icon: houseIcon,
    active: houseIconActive,
  },
  {
    id: "staff",
    path: "staff",
    title: "Quản lý nhân viên",
    icon: staffIcon,
    active: staffIconActive,
  },
  {
    id: "customer",
    path: "customer",
    title: "Khách hàng",
    icon: customerIcon,
    active: customerIconActive,
  },
  {
    id: "provider",
    path: "provider",
    title: "Nhà cung cấp",
    icon: manufactureIcon,
    active: manufactureIconActive,
  },
  {
    id: "product",
    path: "product",
    title: "Sản phẩm",
    icon: productIcon,
    active: productIconActive,
  },
  {
    id: "order",
    path: "order",
    title: "Đơn đặt hàng",
    icon: orderByIcon,
    active: orderByIconActive,
  },
  {
    id: "banner",
    path: "banner",
    title: "Quản lý Banner",
    icon: bannerSidebarIcon,
    active: bannerSidebarIconActive,
  },
  {
    id: "list-post",
    path: "list-post",
    title: "Danh mục bài viết",
    icon: statisticalIcon,
    active: statisticalIconActive,
  },
  {
    id: "post",
    path: "post",
    title: "Bài viết",
    icon: postIcon,
    active: postIconActive,
  },
];

export { menuSideBar };
