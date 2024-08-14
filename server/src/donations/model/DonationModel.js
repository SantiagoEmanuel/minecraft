import { payment, preference } from "../../api/mercadopago/mp.js";
import { db } from "../../api/database/turso.js";
import { config } from "dotenv";
config();

export class DonationModel {
  static async getAll() {
    return await db
      .execute(
        "SELECT users.username, donations.amount, donations.status, donations.date, donations.id, donations.message FROM users INNER JOIN donations ON users.id = donations.userId"
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
          donations: rows,
          total: total,
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
      const { id, sandbox_init_point } = await preference.create({
        body: {
          items: [item],
          payer: payer,
          payment_methods: {
            installments: 1,
          },
          binary_mode: true,
          // notification_url: "",
        },
      });

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
      return {
        status: 400,
        success: false,
        message: error,
      };
    }
  }
  static generateDonation({ email, donation, preferenceId }) {
    db.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    }).then(({ rows }) => {
      db.execute({
        sql: "INSERT INTO donations (userId, amount, status, date, preferenceId, message) VALUES (?, ?, ?, ?, ?, ?);",
        args: [
          rows[0].id,
          donation.unit_price,
          false,
          new Date().toISOString().split("T")[0],
          preferenceId,
          donation.description,
        ],
      });
    });
  }
  static checkNotification({ id }) {
    payment
      .get({
        id,
      })
      .then((response) => {
        console.log(response.id);

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
