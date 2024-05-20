import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const Search = () => {
  const navigate = useNavigate();
  const [searchbarData, setSearchbarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offers: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSearchbarData({ ...searchbarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSearchbarData({ ...searchbarData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "offers" ||
      e.target.id === "furnished"
    ) {
      setSearchbarData({
        ...searchbarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchbarData({ ...searchbarData, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchbarData.searchTerm);
    urlParams.set("type", searchbarData.type);
    urlParams.set("parking", searchbarData.parking);
    urlParams.set("furnished", searchbarData.furnished);
    urlParams.set("offers", searchbarData.offers);
    urlParams.set("sort", searchbarData.sort);
    urlParams.set("order", searchbarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get("searchTerm");
    const typeUrl = urlParams.get("type");
    const parkingUrl = urlParams.get("parking");
    const furnishedUrl = urlParams.get("furnished");
    const offersUrl = urlParams.get("offers");
    const sorturl = urlParams.get("sort");
    const orderUrl = urlParams.get("order");
    if (
      searchTermUrl ||
      typeUrl ||
      parkingUrl ||
      furnishedUrl ||
      offersUrl ||
      sorturl ||
      orderUrl
    ) {
      setSearchbarData({
        searchTerm: searchTermUrl || "",
        type: typeUrl || "all",
        parking: parkingUrl === "true" ? true : false,
        furnished: furnishedUrl === "true" ? true : false,
        offers: offersUrl === "true" ? true : false,
        sort: sorturl || "created_at",
        order: orderUrl || "desc",
      });
    }
    const searchQuery = urlParams.toString();
    fetchListing(searchQuery);
  }, [location.search]);

  const fetchListing = async (searchQuery) => {
    setLoading(true);
    setShowMore(false);
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length > 8) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
    setListings(data);
    setLoading(false);
  };

  const showMoreClick = async () => {
    const noOfListings = listings.length;
    const startIndex = noOfListings;
    const urlParams = new URLSearchParams();
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 8) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term:</label>
            <input
              type="text"
              placeholder="Search..."
              id="searchTerm"
              className="border w-full p-3 rounded-lg"
              value={searchbarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                checked={searchbarData.type === "all"}
                onChange={handleChange}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={searchbarData.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={searchbarData.type === "sale"}
                onChange={handleChange}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offers"
                className="w-5"
                checked={searchbarData.offers}
                onChange={handleChange}
              />
              <span>Offers</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={searchbarData.parking}
                onChange={handleChange}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={searchbarData.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="border p-3 rounded-md"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-gray-700 rounded-md p-3 text-white hover:opacity-90">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold p-3 border-b mt-7">Listings:</h1>
        <div className="flex flex-wrap gap-4 p-7">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No Listing Found</p>
          )}
          {loading && (
            <p className="text-center w-full text-xl text-slate-700">
              Loading....
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
        </div>
        {showMore && (
          <button
            onClick={showMoreClick}
            className="text-red-500 hover:underline p-7 w-full text-center"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
