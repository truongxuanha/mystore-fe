import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { authProfle } from "redux/auth/authThunk";

import { texts } from "libs/contains/texts";
import Breadcrumd from "customs/Breacrumb";
import { assets } from "assets/index";
import { UserIcon } from "@heroicons/react/24/outline";
import { NavLink, Outlet } from "react-router-dom";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  document.title = "Trang cá nhân";
  const { infoUser } = useAppSelector((state) => state.auth);
  const accounts = [
    {
      id: 1,
      title: texts.account.INFO,
      icon: <UserIcon width={20} height={20} color="blue" />,

      subItem: [
        {
          id: 2,
          title: texts.account.PROFILE,
          urlLink: "/account/profile",
        },
        {
          id: 3,
          title: texts.account.ADDRESS,
          urlLink: "/account/address",
        },
        {
          id: 4,
          title: texts.account.REPASS,
          urlLink: "/account/password",
        },
        {
          id: 5,
          title: texts.account.ORDER,
          urlLink: "/account/purchase",
        },
      ],
    },
  ];
  useEffect(() => {
    dispatch(authProfle());
  }, [dispatch]);

  return (
    <div className="bg-gray-100">
      <Breadcrumd page="Tài khoản" breadcrumbs={[{ title: "Trang chủ", urlLink: "/" }]} />
      <div className="md:flex container mx-auto py-10">
        <div className="md:w-1/4 p-4">
          <div className="text-center mb-6 flex flex-col items-center">
            <img src={assets.noAvatar} className="w-20 h-20 rounded-full" />
            <p className="text-lg font-semibold">{infoUser?.account_name ?? "No Name"}</p>
          </div>
          <ul className=" text-gray-700 flex flex-col ">
            {accounts.map((item) => (
              <>
                <li key={item.title} className="hover:text-colorRed hover:cursor-pointer">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </li>
                {item.subItem?.map((sub) => (
                  <NavLink to={sub.urlLink} className="item-profile ml-10 my-1 hover:text-colorRed hover:cursor-pointer" key={sub.id}>
                    {sub.title}
                  </NavLink>
                ))}
              </>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4 bg-white p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
