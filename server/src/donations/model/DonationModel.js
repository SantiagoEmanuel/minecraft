import { client, payment, preference } from "../../api/mercadopago/mp.js";
import { db } from "../../api/database/turso.js";
import { v4 } from "uuid";
import { config } from "dotenv";
import { Preference } from "mercadopago";
config();

export class DonationModel {
  static async getAll() {
    return await db
      .execute(
        "SELECT users.username, donations.amount, donations.status, donations.donated_at as date, donations.id, donations.message FROM users INNER JOIN donations ON users.id = donations.user_id"
      )
      .then(({ rows }) => {
        if (rows.length == 0) {
          return {
            success: false,
            status: 200,
            message: "No hay donaciones disponibles",
          };
        }
        let total = 0;

        rows.map(({ amount }) => (total += amount));

        return {
          success: true,
          status: 200,
          message: "Se han encontrado donaciones",
          data: {
            donations: rows,
            total: total,
          },
        };
      })
      .catch((err) => {
        return {
          success: false,
          status: 400,
          message: err.message,
        };
      });
  }
  static async generatePreference({ payer, item }) {
    try {
      const { id, sandbox_init_point } = await new Preference(client).create({
        body: {
          items: [item],
          payer: payer,
          payment_methods: {
            installments: 1,
          },
          binary_mode: true,
          notification_url:
            "https://minecraft-nnsl.onrender.com/donations/notification",
        },
      });

      console.log(id, sandbox_init_point);

      this.generateDonation({
        email: payer.email,
        donation: item,
        preferenceId: id,
      });

      return {
        status: 201,
        success: true,
        message: "¡Preferencia creada con éxito!",
        data: {
          preferenceId: id,
          sandbox: sandbox_init_point,
        },
      };
    } catch (error) {
      console.log({ error });
      return {
        status: 400,
        success: false,
        message: error,
      };
    }
  }
  static async generateDonation({ email, donation, preferenceId }) {
    const { rows } = await db.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    });
    if (!rows.length) {
      return;
    }

    console.log("llegamos x2");

    await db.execute({
      sql: "INSERT INTO donations (id, user_id, amount, status, preference_id, message) VALUES (?, ?, ?, ?, ?, ?);",
      args: [
        v4(),
        rows[0].id,
        donation.unit_price,
        false,
        preferenceId,
        donation.description,
      ],
    });
    return;
  }
  static async checkNotification({ id }) {
    return await payment
      .get({
        id,
      })
      .then((response) => {
        console.log({ response });
        return {
          status: 200,
          success: true,
          message: "Pago comprobado",
        };
      })
      .catch((error) => {
        console.log(error);
        return {
          status: 400,
          success: false,
          message: "Pago no realizado",
        };
      });
  }
}
