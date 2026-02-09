import QRCode from "qrcode";
import jwt from 'jsonwebtoken';
import "dotenv/config.js"

class QRCodeService {
  async generate(payload) {
    if (!payload || typeof payload !== "string") {
      throw new Error("QR payload must be a string");
    }

    const token = jwt.sign(
      {
        ticketId: payload.id,
        type: 'SCAN'
      },
      process.env.QR_SECRET,
      {expiresIn: '1h'}
    )

    const scanUrl = `${process.env.API_BASE_URL}/api/operator/scan?token=${token}`

    const qrImage = await QRCode.toDataURL(scanUrl)

    return qrImage
  }
}

export default new QRCodeService();
