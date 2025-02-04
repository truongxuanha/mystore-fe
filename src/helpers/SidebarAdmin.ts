import houseIcon from "assets/house_chimney.svg";
import staffIcon from "assets/staff_icon.svg";
import customerIcon from "assets/customer_icon.svg";
import manufactureIcon from "assets/manufacture_icon.svg";
import orderByIcon from "assets/order_by_icon.svg";
import bannerSidebarIcon from "assets/banner_sidebar_icon.svg";
import statisticalIcon from "assets/statistical_icon.svg";
import houseIconActive from "assets/house_chimney_active.svg";
import staffIconActive from "assets/staff_icon_active.svg";
import customerIconActive from "assets/customer_icon_active.svg";
import manufactureIconActive from "assets/manufacture_icon_active.svg";
import orderByIconActive from "assets/order_by_icon_active.svg";
import bannerSidebarIconActive from "assets/banner_sidebar_icon_active.svg";
import statisticalIconActive from "assets/statistical_icon_active.svg";
import iconTag from "assets/tag_icon.svg";
import iconTagActive from "assets/tag_icon_active.svg";
import iconProduct from "assets/icon_product.svg";
import iconProductActive from "assets/icon_product_active.svg";

const menuSideBar = [
  {
    id: "dashboard",
    path: "dashboard",
    title: "Trang chủ",
    active: houseIcon,
    icon: houseIconActive,
  },
  {
    id: "staff",
    path: "staff",
    title: "Quản lý nhân viên",
    active: staffIcon,
    icon: staffIconActive,
  },
  {
    id: "customer",
    path: "customer",
    title: "Khách hàng",
    active: customerIcon,
    icon: customerIconActive,
  },
  {
    id: "provider",
    path: "provider",
    title: "Nhà cung cấp",
    active: manufactureIcon,
    icon: manufactureIconActive,
  },
  {
    id: "product",
    path: "product",
    title: "Sản phẩm",
    active: iconProduct,
    icon: iconProductActive,
  },
  {
    id: "product-transaction",
    path: "product-transaction",
    title: "Nhập hàng",
    active: iconTag,
    icon: iconTagActive,
    subNav: [
      {
        id: 1,
        title: "Danh sách nhập",
        path: "",
      },
      {
        id: 2,
        title: "Nhập hàng",
        path: "",
      },
      {
        id: 3,
        title: "Xuất hàng",
        path: "",
      },
    ],
  },
  {
    id: "order",
    path: "order",
    title: "Đơn đặt hàng",
    active: orderByIcon,
    icon: orderByIconActive,
  },
  {
    id: "banner",
    path: "banner",
    title: "Quản lý Banner",
    active: bannerSidebarIcon,
    icon: bannerSidebarIconActive,
  },
  {
    id: "popup",
    path: "popup",
    title: "Quản lý Popup",
    active: statisticalIcon,
    icon: statisticalIconActive,
  },
];

export { menuSideBar };
