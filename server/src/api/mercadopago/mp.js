import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

export const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const preference = new Preference(client);
export const payment = new Payment(client);
