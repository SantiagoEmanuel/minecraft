import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

const config = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const preference = new Preference(config);
export const payment = new Payment(config);
