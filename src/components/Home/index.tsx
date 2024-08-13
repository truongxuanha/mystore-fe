import HotProducts from "../HotProducts";
import Banner from "../Banners";
import Loader from "../Loader";
import { useAppSelector } from "../../hooks/useAppDispatch";
import ProductNews from "../ProductNews";

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
        <ProductNews />
      </div>
    </>
  );
}

export default Home;
