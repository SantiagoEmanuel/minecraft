import { Router } from "express";
import { db } from "../../api/database/turso.js";
import { v4 as uuid } from "uuid";
import { payment, preference } from "../../api/mercadopago/mp.js";

export const donationsRoute = Router();

donationsRoute.get("/", async (_req, res) => {
  const { rows } = await db.execute(
    "select users.username, users.avatar, donations.amount, donations.date, donations.status, donations.message from donations inner join users on donations.userId = users.id"
  );

  if (rows.length === 0) {
    return res.status(400).send({
      message: "No hay donaciones disponibles!",
    });
  }

  let total = 0;

  rows.forEach((donation) => {
    total += donation.amount;
  });

  return res.status(200).send({
    message: "Estas son las donaciones disponibles!",
    data: {
      donations: rows,
      total: total,
    },
  });
});

donationsRoute.post("/create", async (req, res) => {
  const { amount, userId, name, surname, message } = req.body;
  const date = new Date().toISOString().split("T")[0];
  preference
    .create({
      body: {
        items: [
          {
            id: uuid(),
            title: `Donación de ${name} ${surname}`,
            description: "Donación realizada para mantener el servidor",
            quantity: 1,
            currency_id: "ARS",
            unit_price: Number.parseFloat(amount),
          },
        ],
        payer: {
          name: name,
          surname: surname,
        },
        payment_methods: {
          installments: 1,
        },
        binary_mode: true,
        // notification_url: "http://localhost:3000/donations/notification",
      },
    })
    .then((response) => {
      try {
        db.execute({
          sql: "insert into donations ( userId, amount, status, date, message, preferenceId) values ( ?, ?, ?, ?, ?, ?)",
          args: [
            userId,
            Number.parseFloat(amount),
            false,
            date,
            message,
            response.id,
          ],
        });
      } catch (err) {
        return res.status(500).send({
          message: "Error en la base de datos!",
        });
      }

      return res.status(201).send({
        preferenceId: response.id,
        sandbox: response.sandbox_init_point,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        message: "Error al crear la preferencia!",
        error: err.message,
      });
    });
});

donationsRoute.post("/notification", (req, res) => {
  const { data } = req.body;

  payment
    .get(data.id)
    .then((response) => {
      if (response.status === "approved") {
        db.execute({
          sql: "update donations set status = true where id = ?",
          args: [data.id],
        });
      }
      return res.status(200);
    })
    .catch(() => {
      return res.status(200);
    });
});
