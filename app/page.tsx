import Image from 'next/image';
import Searchbar from '@/components/Searchbar';
import HeroCarousel from '@/components/HeroCarousel';
import { getAllProducts } from '@/lib/actions';
import ProductCard from '@/components/ProductCard';

const Home = async () => {
  const allProducts = await getAllProducts();
  return (
    <>
      <section className="px-6 md:px-20 py-24 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Savings Start Here:
              {/* <Image src="/assets/icons/arrow-right.svg" alt="arrow-right" width={16} height={16} /> */}
            </p>
            <h1 className="head-text">
              Unleash the Power of
              <span className="text-green-dark"> PriceCheck</span>{' '}
              <span className="small-text">(Beta Version)</span>
            </h1>

            <p className="mt-6">
              Stop guessing. Be certain. Track your product prices and save money on your online
              shopping. Compare the loweset, highest, and current prices to make sure you are
              getting the best deal you can!
            </p>
            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
