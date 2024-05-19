import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AddListing from "./pages/AddListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";


export default function App() {
  return (
    <div>
          <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element ={<About/>} />
            <Route path='/sign-in' element ={<SignIn/>} />
            <Route path='/sign-up' element ={<SignUp/>} />
            <Route path='/listing/:listingId' element ={<Listing/>} />
            <Route path='/search' element={<Search/>}/>
            <Route element={<PrivateRoute/>}>
            <Route path='/profile' element ={<Profile/>} />
            <Route path='/create-listing' element={<AddListing/>} />
            <Route path='/update-listing/:listingId' element={<UpdateListing/>} />
            </Route>
          </Routes>
          </BrowserRouter>
    </div>
  )
}

