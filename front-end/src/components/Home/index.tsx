import HotProducts from "../HotProducts";
import Banner from "../Banners";

import ProductNews from "../ProductNews";

function Home() {
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
