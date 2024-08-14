import { Router } from "express";
import { DonationController } from "../controller/DonationController.js";

export const donationsRoute = Router();

donationsRoute.get("/", DonationController.getDonations);
donationsRoute.post("/create", DonationController.create);
donationsRoute.post("/notification", DonationController.notification);
