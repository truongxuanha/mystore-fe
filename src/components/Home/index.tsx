import HotProducts from "../HotProducts";
import Banner from "../Banners";

import ProductNews from "../ProductNews";
import Manufacture from "../Manufacture";

function Home() {
  return (
    <>
      <div className="w-full mx-auto">
        <Manufacture />
        <Banner />
        <HotProducts />
        <ProductNews />
      </div>
    </>
  );
}

export default Home;
