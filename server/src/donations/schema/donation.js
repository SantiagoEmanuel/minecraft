import z from "zod";

const donationSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  unit_price: z.number(),
  quantity: z.number(),
});

const payerSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
});

export function validateDonation(input) {
  return donationSchema.safeParse(input);
}

export function validatePayer(input) {
  return payerSchema.safeParse(input);
}
