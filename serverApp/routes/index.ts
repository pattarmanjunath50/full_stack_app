const router = require('express').Router();
import { TravelController } from '../controllers/travel';

// Save Enquiry details
router.post('/save', TravelController.saveTravelDetails);

// List the Travel Enquiries
router.get('/list', TravelController.listTravelDetails);


export const Router = router;