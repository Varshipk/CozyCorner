import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchLandlord();
  }, [listing.userRef]);

  const fetchLandlord = async () => {
    try {
      const res = await fetch(`/api/user/${listing.userRef}`);
      const data = await res.json();

      setLandlord(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for <span className="font-semibold lowercase">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            onChange={onChange}
            placeholder="Enter your message"
            className="w-full border border-gray-300 rounded-md p-3"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-md hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
