import mongoose from "mongoose";
import nodemailer from "nodemailer";

let isConnected = false;

async function connectDB() {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
}

const ContactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

const Contact =
    mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, message } = req.body;


    try {
        await connectDB();

        await Contact.create({ name, email, message });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: "📩 New Portfolio Contact Message",
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
        });

        return res.status(201).json({ success: true });
    } catch (error) {
        console.error("Contact API Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
