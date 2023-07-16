import { Request, Response } from "express";
import { DB as db } from "../config/db.config";
import { v4 as uuidv4 } from 'uuid';
import { TravelSchema } from "../models/travel";

export const TravelController = {
    saveTravelDetails: (req: Request, res: Response) => {
        if (req.body && Object.keys(req.body).length) {
            const enquiryData: TravelSchema = {
                travel_id: uuidv4(),
                ...req.body,
                createdDate: new Date().getTime()
            }
            db.enquiries.push(`/enquiries/${enquiryData.travel_id}`, enquiryData);
            res.json(enquiryData);
        } else {
            res.status(500).send('Failed to save');
        }
    },
    listTravelDetails: (req: Request, res: Response) => {
        db.enquiries.getData("/enquiries").then(results => {
            const resultArray = [];
            for(let key in results) {
                resultArray.push(results[key]);
            }
            res.json(resultArray);
        }).catch(err => {
            console.log('error', err);
            res.status(500).send("Error Fetching Enquiries");
        })
    }
}