import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { app } from "../firebase";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/slice/userSlice";


export default function Profile() {
  const {currentUser,loading,error} =useSelector((state)=>state.user);
  
  const fRef =useRef(null);
  const [file,setFile]=useState(undefined);
  const [perc,setPerc] =useState(0);
  const [fileUploadError,SetFileUploadError]=useState(false);
  const [formData,setFormData] =useState({});
  const [success,setSuccess] =useState(false);
  const dispatch =useDispatch();
  console.log(formData);
 console.log(fileUploadError);
  useEffect(()=>{
    if(file){
      handleFile(file);
    }
  },[file]);
  const handleFile =(file)=>{
    const storage =getStorage(app);
    const fileName =new Date().getTime()+file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask =uploadBytesResumable(storageRef,file);
    uploadTask.on(
      'state_changed',
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
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
          const  handleChange =(e)=>{
            setFormData({...formData,[e.target.id]:e.target.value})
          }
          const handleSubmit = async (e)=>{
            e.preventDefault();
            try{
                 dispatch(updateUserStart());
                 const res = await fetch(`/api/user/update/${currentUser._id}`,{
                  method:"POST",
                headers:  {
                    'Content-Type':"application/json",
                  },
                  body:JSON.stringify(formData),
                 });
                 const data = await res.json();
                 if(data.success ===false){
                  dispatch(updateUserFailure(data.message));
                  return;
                 }
                 dispatch(updateUserSuccess(data));
                 setSuccess(true);
                 
            } catch(error){
              dispatch(updateUserFailure(error.message));
             
            }
          }
          const handleDelete = async () => {
            try {
              dispatch(deleteUserStart());
              const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
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
        
       
  return (
    <div className="max-w-lg p-3 mx-auto">
    <h1 className="text-center font-semibold  text-3xl my-7">Profile</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input 
      onChange={(e)=>setFile(e.target.files[0])}
      type='file' ref={fRef} hidden accept="image/*" />
      <img 
      onClick={()=>fRef.current.click()} 
      src={formData.avatar ||currentUser.avatar} alt="profile" 
      className=" mt-2 object-cover rounded-full self-center cursor-pointer h-24 w-24"/>
      <p className="text-sm selt-center">
        {fileUploadError ? (
          <span className="text-red-700">Image not upload(Image should be less than 4MB )</span>
        ) : perc > 0 && perc <100 ?(
          <span className="text-slatw-700">{`Uploading ${perc}%`}</span>
        ) : perc ===100 ? (
          <span className="text-green-700">Image successfully uploaded!</span>
        ) :(
          ''
        )
        }
      </p>
      <input type="text" placeholder="Username" id="username" defaultValue={currentUser.username} className="rounded-md border p-3" onChange={handleChange} />
      <input type="email" placeholder="Email" id="email" defaultValue={currentUser.email} className="rounded-md border p-3" onChange={handleChange}/>
      <input type="password" placeholder="Password" id="password" className="rounded-md border p-3"  onChange={handleChange} />
      <button disabled={loading} className="p-3 bg-slate-700 text-white uppercase rounded-md hover:opacity-95 disabled:opacity-80">{loading ?"Loading..":"update"}</button>
    </form>
    <div className="flex justify-between mt-4">
      <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete account</span>
      <span className="text-green-600 cursor-pointer">Sign out</span>
    </div>
    <p className="text-red-700 mt-4">{error?error:""}</p>
    <p className="text-green-500 mt-4">{success?"User updated successfully":""}</p>
    </div>
  )
}
