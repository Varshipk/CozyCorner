import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard";

export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, SetSaleListings] = useState([]);
  useEffect(() => {
    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);
  const fetchOfferListings = async () => {
    try {
      const res = await fetch("/api/listing/get?offers=true&limit=4");
      const data = await res.json();
      setOfferListings(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRentListings = async () => {
    try {
      const res = await fetch("/api/listing/get?type=rent&limit=4");
      const data = await res.json();
      setRentListings(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSaleListings = async () => {
    try {
      const res = await fetch("/api/listing/get?type=sale&limit=4");
      const data = await res.json();
      SetSaleListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-5xl font-bold">
          Your destination for <span className="text-slate-600">memorable</span>
          <br /> stays and adventures.
        </h1>
        <div className="">
          Make every stay special with CozyCorner! From charming cottages to
          luxurious homes
          <br /> find the ideal place for your next vacation
        </div>
        <Link
          to="/search"
          className="text-xs sm:text-sm font-bold text-blue-800 hover:underline"
        >
          Let's get started
        </Link>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="font-bold text-2xl">Recent Offers</h2>
              <Link
                className="text-sm hover:underline text-blue-800 font-semibold"
                to={"/search?offers=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings &&
                offerListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="font-bold text-2xl">Recent palaces for rent</h2>
              <Link
                className="text-sm hover:underline text-blue-800 font-semibold"
                to={"/search?type=rent"}
              >
                Show more palaces for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings &&
                rentListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="font-bold text-2xl">Recent palaces for sale</h2>
              <Link
                className="text-sm hover:underline text-blue-800 font-semibold"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings &&
                saleListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
