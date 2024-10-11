import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import { getManuThunk } from "../../redux/reducer/manuReducer/manuThunk";

function Manufacture() {
  const dispatch = useAppDispatch();
  const { manuItems } = useAppSelector((state) => state.manufacturer);
  useEffect(
    function () {
      if (manuItems.length === 0 || !manuItems) {
        dispatch(getManuThunk());
      }
    },
    [dispatch]
  );
  return (
    <div className='grid grid-flow-col h-[50px]'>
      {manuItems.map((data) => (
        <div
          key={data.id}
          className='bg-white flex justify-center items-center border h-[50px]'
        >
          <img src={data.img} alt='' />
        </div>
      ))}
    </div>
  );
}

export default Manufacture;
