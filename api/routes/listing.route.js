import express from 'express';
 import { createListing, deleteListing } from "../controllers/listing.controller.js";
import { verifyTkn } from '../utils/authUser.js';

 

const Router =express.Router();

Router.post('/create',verifyTkn,createListing)
Router.delete('/delete/:id',verifyTkn,deleteListing)

export default Router;