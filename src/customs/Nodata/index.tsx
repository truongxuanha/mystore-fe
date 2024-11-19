import React from "react";
type Props = {
  children: React.ReactNode;
  background?: boolean;
};
function Nodata({ children, background }: Props) {
  return (
    <div className="flex justify-center w-full ">
      <span className={`${background ? "bg-colorPrimary text-colorBody" : "text-black"} p-2 rounded-md cursor-pointer`}>{children}</span>
    </div>
  );
}

export default Nodata;
