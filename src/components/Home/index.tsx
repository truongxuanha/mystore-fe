import HotProducts from "../HotProducts";
import Banner from "../Banners";
import Loader from "../Loader";
import { useAppSelector } from "../../hooks/useAppDispatch";

function Home() {
  const { loadingCart } = useAppSelector((state) => state.cart);
  {
    loadingCart && <Loader />;
  }
  return (
    <>
      <div className='w-full mx-auto'>
        <Banner />
        <HotProducts />
      </div>
    </>
  );
}

export default Home;
