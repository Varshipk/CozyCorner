import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/slice/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const fRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [perc, setPerc] = useState(0);
  const [fileUploadError, SetFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings,setUserListings] =useState([]);
  const dispatch = useDispatch();
  console.log(formData);
  console.log(fileUploadError);
  useEffect(() => {
    if (file) {
      handleFile(file);
    }
  }, [file]);
  const handleFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(Math.round(progress));
      },
      (error) => {
        SetFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL }),
        );
      },
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handlesignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        showListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
       const handleListingDelete = async(listingId)=>{
        try{
               const res =await fetch(`/api/listing/delete/${listingId}`,{
                method:"DELETE"
               } );
               const data=res.json();
               if(data.message===false){
                console.log(data.message);
                return ;
               }
               setUserListings((prev)=>prev.filter((listing)=>listing._id!=listingId));
        } catch(error){
          console.log(error.message);
        }

       }
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-center font-semibold  text-3xl my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className=" mt-2 object-cover rounded-full self-center cursor-pointer h-24 w-24"
        />
        <p className="text-sm selt-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Image not upload(Image should be less than 4MB )
            </span>
          ) : perc > 0 && perc < 100 ? (
            <span className="text-slatw-700">{`Uploading ${perc}%`}</span>
          ) : perc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          className="rounded-md border p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="rounded-md border p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="rounded-md border p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="p-3 bg-slate-700 text-white uppercase rounded-md hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading.." : "update"}
        </button>
        <Link
          className="bg-green-700 uppercase p-3 text-white rounded-md text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete account
        </span>
        <span onClick={handlesignOut} className="text-green-600 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-4">{error ? error : ""}</p>
      <p className="text-green-500 mt-4">
        {success ? "User updated successfully" : ""}
      </p>
      <button
        onClick={handleShowListings}
        className="uppercase text-green-700 w-full"
      >
        Show Listings
      </button>
      <p>{showListingsError ? "Error in  show listings" : ""}</p>
      {
        userListings && userListings.length>0 &&
        <div className="flex flex-col gap-4">
          <h1 className="text-center my-6 font-semibold text-xl">Your Listing</h1>
      {  
       userListings.map((listing)=>(
          <div className="border p-3 rounded-md flex justify-between items-center gap-2" key={listing._id}>
            <Link to={`listing/${listing._id}`} >
              <img src={listing.imageUrls[0]} alt='listing-image' className="h-16 w-16 object-contain" />
              
            </Link>
            <Link className="font-semibold hover:underline flex-1 truncate " to={`listing/${listing._id}`} >
              <p >{listing.name}</p>
            </Link>
            <div className="flex flex-col items-center">
              <button onClick={()=>handleListingDelete(listing._id)} className="uppercase text-red-700">Delete</button>
           <Link to={`/update-listing/${listing._id}`}><button  className="uppercase text-green-700">Edit</button> </Link>   
            </div>        
        </div>
        )) }
     </div> }
    </div>
  );
}
