import QRCode from "qrcode";

class QRCodeService {
  async generate(payload) {
    if (!payload || typeof payload !== "string") {
      throw new Error("QR payload must be a string");
    }

    return QRCode.toDataURL(payload, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 300,
    });
  }
}

export default new QRCodeService();
