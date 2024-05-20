import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { list } from "firebase/storage";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white hover:shadow-lg transition-shadow overflow-hidden shadow-md rounded-md w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing-cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 "
        />

        <div className="p-3 flex flex-col w-full gap-2">
          <p className="text-lg font-semibold truncate">{listing.name}</p>
          <div className="flex gap-1 items-center">
            <MdLocationOn className="h-4 w-4   text-red-500" />
            <p className="text-sm w-full truncate">{listing.address}</p>
          </div>
          <p className="text-sm line-clamp-2">{listing.description}</p>
          <p className="font-semibold mt-2">
            Rs:{" "}
            {listing.offers
              ? listing.discountPrice.toLocaleString("US-en")
              : listing.regularPrice.toLocaleString("US-en")}
            {listing.type === "rent" && "/month"}
          </p>
          <div className=" flex items-center gap-4">
            <div className="font-bold flex items-center">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold flex items-center">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
