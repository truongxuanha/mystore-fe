import { assets } from "assets";
import ImageLazy from "customs/ImageLazy";
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";
import { TabType } from "types";
import ForPassword from "./ForPassword";

function AuthPage() {
  const [tab, setTab] = useState<TabType>(TabType.LOGIN);
  return (
    <div className="flex min-h-full w-full md:w-[800px] overflow-hidden mx-auto">
      <div className="mt-10 mx-auto flex items-center justify-center rounded-md w-full md:w-[800px]">
        <div className="bg- hidden md:w-1/2 md:flex h-full flex-col items-center shadow-md bg-white py-5 border">
          <div className="font-extrabold text-3xl text-center bg-white rounded-full flex flex-col items-center justify-center mt-1 mb-10">
            <div>
              <span className="text-colorPrimary text-shadow">Wel</span>
              <span className="text-green-300">come</span>
            </div>
            <div>
              <span className="text-orange-300 mx-2">to</span>
              <span className="text-green-500">My</span>
              <span className="text-orange-700">Store</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-full bg-white">
            <div className="w-full h-full">
              <ImageLazy src={assets.imageLogin} alt="logo" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[500px] md:h-[550px] relative bg-white">
          <Login setTab={setTab} tab={tab} />
          <Register setTab={setTab} tab={tab} />
          <ForPassword setTab={setTab} tab={tab} />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
