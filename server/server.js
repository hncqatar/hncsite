import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["POST"],
  })
);

app.use(express.json({ limit: "1mb" }));

const clean = (value = "") =>
  String(value).replace(/[<>]/g, "").trim().slice(0, 1200);

app.post("/api/send-email", async (req, res) => {
  const name = clean(req.body.name);
  const mobile = clean(req.body.mobile);
  const email = clean(req.body.email);
  const message = clean(req.body.message);

  if (!name || !mobile || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS;
  const TARGET_EMAIL = process.env.TARGET_EMAIL || GMAIL_USER;

  if (!GMAIL_USER || !GMAIL_APP_PASS) {
    return res.status(500).json({ error: "SMTP configuration missing." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HOTNCOOL Business Website" <${GMAIL_USER}>`,
      to: TARGET_EMAIL,
      replyTo: email,
      subject: `HOTNCOOL Business Website Enquiry - ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;background:#050B1F;color:#ffffff;padding:24px;border-radius:18px;">
          <h2 style="color:#EF233C;margin-top:0;">HOTNCOOL Business Website Enquiry</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Mobile:</b> ${mobile}</p>
          <p><b>Email:</b> ${email}</p>
          <div style="margin-top:20px;padding:16px;background:#ffffff0f;border-left:4px solid #EF233C;border-radius:12px;">
            ${message}
          </div>
        </div>
      `,
    });

    return res.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Email sending failed." });
  }
});

app.listen(PORT, () => {
  console.log(`HOTNCOOL contact server running on http://localhost:${PORT}`);
});
