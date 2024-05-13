import express from 'express';
 import { createListing } from "../controllers/listing.controller.js";
import { verifyTkn } from '../utils/authUser.js';

 

const Router =express.Router();

Router.post('/create',verifyTkn,createListing)

export default Router;