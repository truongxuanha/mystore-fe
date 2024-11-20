import { UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { useForm } from "react-hook-form";
import { authProfle } from "redux/auth/authThunk";
import { texts } from "contains/texts";
import { SEX } from "types/contain.type";
import { UserAccount } from "types";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { infoUser } = useAppSelector((state) => state.auth);

  const { register, handleSubmit, setValue } = useForm<UserAccount>({
    defaultValues: {
      account_name: "",
      full_name: "",
      phone: "",
      email: "",
      sex: "",
      birth_day: "",
    },
  });

  useEffect(() => {
    dispatch(authProfle());
  }, [dispatch]);

  useEffect(() => {
    if (infoUser) {
      setValue("account_name", infoUser.account_name || "");
      setValue("phone", infoUser.phone || "");
      setValue("email", infoUser.email || "");
    }
  }, [infoUser, setValue]);

  const onSubmit = () => {
    console.log("hello");
  };

  return (
    <div className="flex max-w-4xl mx-auto mt-8">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-l-lg shadow-md">
        <div className="text-center mb-6">
          <UserCircleIcon className="w-24 h-24 mx-auto rounded-full bg-orange-200/80 mb-3" />
          <p className="text-lg font-semibold">{infoUser?.account_name}</p>
        </div>
        <ul className="space-y-4 text-gray-700">
          {[texts.account.INFO, texts.account.PROFILE, texts.account.ADDRESS, texts.account.REPASS, texts.account.ORDER, texts.account.NOTIFY].map(
            (title, idx) => (
              <li key={idx} className="hover:text-colorRed hover:cursor-pointer">
                {title}
              </li>
            ),
          )}
        </ul>
      </div>

      {/* Form */}
      <div className="w-3/4 bg-white p-6 rounded-r-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">{texts.account.INFO_MANAGER}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/4">{texts.account.NAME_LOGIN}</label>
            <input
              type="text"
              {...register("account_name")}
              className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/4">{texts.account.FULL_NAME}</label>
            <input type="text" {...register("full_name")} className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="flex items-center">
            <label className="w-1/4">{texts.account.PHONE_NUMBER}</label>
            <input type="text" {...register("phone")} className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="flex items-center">
            <label className="w-1/4">{texts.account.EMAIL}</label>
            <input type="email" {...register("email")} className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="flex items-center">
            <label className="w-1/4">{texts.account.SEX}</label>
            <div className="w-2/4 flex space-x-4">
              <label className="flex items-center">
                <input type="radio" value={SEX.MALE} {...register("sex")} className="mr-2" />
                {SEX.MALE}
              </label>
              <label className="flex items-center">
                <input type="radio" value={SEX.FEMALE} {...register("sex")} className="mr-2" />
                {SEX.FEMALE}
              </label>
              <label className="flex items-center">
                <input type="radio" value={SEX.OTHER} {...register("sex")} className="mr-2" />
                {SEX.OTHER}
              </label>
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-1/4">{texts.account.BIRTHDAY}</label>
            <input type="date" {...register("birth_day")} className="w-2/4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded-md mt-6">
            {texts.common.SAVE}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
