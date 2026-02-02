import * as crypto from "node:crypto";
import blockchainService from "./blockchainService";

class WalletService {
  constructor() {
    this.algorithm = "aes-256-cbc";
    this.encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY);

    this.wallets = new Map();
  }

  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
  }

  decrypt(text) {
    const parts = text.split(":");
    const iv = Buffer.from(parts[0], "hex");
    const encryptedText = parts[1];
    const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }

  createWalletForUser(userId) {
    const wallet = blockchainService.createUserWallet();

    const encryptedPrivateKey = this.encrypt(wallet.privateKey);

    this.wallets.set(userId, {
      address: wallet.address,
      encryptedPrivateKey: encryptedPrivateKey,
    });

    return {
      userId,
      address: wallet.address,
    };
  }

  getUserWallet(userId) {
    return this.wallets.get(userId);
  }

  getPrivateKey(userId) {
    const wallet = this.wallets.get(userId);
    if (!wallet) return null;
    return this.decrypt(wallet.encryptedPrivateKey);
  }
}

export default new WalletService();
