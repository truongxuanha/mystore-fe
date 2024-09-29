import { getManufacturer } from "../../api/manufacturer";
import { useEffect, useState } from "react";
interface ManufactureType {
  id: number;
  img: string;
  name: string;
  slug: string;
}
function Manufacture() {
  const [manufacturer, setManufacturer] = useState<ManufactureType[]>([]);
  useEffect(function () {
    async function fectMenu() {
      const data = await getManufacturer();
      setManufacturer(data);
    }
    fectMenu();
  }, []);
  return (
    <div className='grid grid-flow-col h-[50px]'>
      {manufacturer.map((data) => (
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
