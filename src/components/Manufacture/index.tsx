import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import { getManuThunk } from "../../redux/reducer/manuReducer/manuThunk";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../redux/reducer/productReducer/productThunk";

function Manufacture() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { manuItems } = useAppSelector((state) => state.manufacturer);
  useEffect(
    function() {
      if (manuItems.length === 0 || !manuItems) {
        dispatch(getManuThunk());
      }
    },
    [dispatch],
  );
  const handleGotoManu = (id: number) => {
    dispatch(getProducts({ manufacturer: id }));
    navigate(`/product?manufacture=${id}`);
  };
  return (
    <div className="grid grid-flow-col h-[50px]">
      {manuItems.map((data) => (
        <div key={data.id} onClick={() => handleGotoManu(data.id)} className="bg-white flex justify-center items-center border h-[50px] cursor-pointer">
          <img src={data.img} alt="" />
        </div>
      ))}
    </div>
  );
}

export default Manufacture;
