import HotProducts from "../hotproduct";
import Banner from "../banner";

function Home() {
  return (
    <div className='w-full mx-auto'>
      <Banner />
      <HotProducts />
    </div>
  );
}

export default Home;
