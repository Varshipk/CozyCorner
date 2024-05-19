import express from 'express';
 import { createListing, deleteListing, getListing, getListings, updateListing } from "../controllers/listing.controller.js";
import { verifyTkn } from '../utils/authUser.js';

 

const Router =express.Router();

Router.post('/create',verifyTkn,createListing)
Router.delete('/delete/:id',verifyTkn,deleteListing)
Router.post('/update/:id',verifyTkn,updateListing)
Router.get('/get/:id',getListing)
Router.get('/get',getListings)


export default Router;