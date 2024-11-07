import React from "react";
type Props = {
  children: React.ReactNode;
};
function Nodata({ children }: Props) {
  return (
    <div className="flex justify-center w-full ">
      <span className="bg-colorPrimary text-colorBody p-2 rounded-md cursor-pointer">{children}</span>
    </div>
  );
}

export default Nodata;
