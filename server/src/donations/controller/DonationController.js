import { DonationModel } from "../model/DonationModel.js";
import { validateDonation, validatePayer } from "../schema/donation.js";

export class DonationController {
  static async getDonations(req, res) {
    const result = await DonationModel.getAll();

    if (!result.success) {
      return res.status(result.status).send({
        message: result.message,
      });
    }

    return res.status(result.status).send({
      message: result.message,
      data: {
        donations: result.donations,
        total: result.total,
      },
    });
  }
  static async create(req, res) {
    const { donation } = req.body;

    donation.item.quantity = Number.parseFloat(donation.item.quantity);
    donation.item.unit_price = Number.parseFloat(donation.item.unit_price);

    const donateValidation = validateDonation(donation.item);
    const payerValidation = validatePayer(donation.payer);

    if (!donateValidation.success) {
      return res.status(400).send({
        success: false,
        message: donateValidation.error.message,
      });
    }
    if (!payerValidation.success) {
      return res.status(400).send({
        success: false,
        message: payerValidation.error.message,
      });
    }

    const result = await DonationModel.generatePreference({
      item: donateValidation.data,
      payer: payerValidation.data,
    });

    if (!result.success) {
      return res.status(result.status).send({
        message: result.message,
      });
    }

    return res.status(result.status).send({
      message: result.message,
      data: {
        preferenceId: result.data.preferenceId,
        sandbox: result.data.sandbox,
      },
    });
  }
  static async notification(req, res) {
    const { data } = req.body;

    const result = await DonationModel.checkNotification({
      id: data.id,
    });

    return res.status(result.status).send({
      message: result.message,
      success: result.success,
    });
  }
}
