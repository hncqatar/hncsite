import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* -------------------- CORS -------------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://business.hotncool.qa",
  "http://business.hotncool.qa",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "1mb" }));

/* -------------------- TEST ROUTE -------------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HOTNCOOL backend is running",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HOTNCOOL API is running",
  });
});

/* -------------------- HELPERS -------------------- */

const clean = (value = "") => {
  return String(value).replace(/[<>]/g, "").trim().slice(0, 1200);
};

/* -------------------- SEND EMAIL API -------------------- */

app.post("/api/send-email", async (req, res) => {
  try {
    const name = clean(req.body.name);
    const mobile = clean(req.body.mobile);
    const email = clean(req.body.email);
    const message = clean(req.body.message);

    if (!name || !mobile || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS;
    const TARGET_EMAIL = process.env.TARGET_EMAIL || GMAIL_USER;

    if (!GMAIL_USER || !GMAIL_APP_PASS) {
      return res.status(500).json({
        success: false,
        message: "SMTP configuration missing.",
      });
    }

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
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          background: #050B1F;
          color: #ffffff;
          padding: 24px;
          border-radius: 18px;
        ">
          <h2 style="
            color: #EF233C;
            margin-top: 0;
            border-bottom: 1px solid rgba(255,255,255,0.15);
            padding-bottom: 12px;
          ">
            HOTNCOOL Business Website Enquiry
          </h2>

          <p><b>Name:</b> ${name}</p>
          <p><b>Mobile:</b> ${mobile}</p>
          <p><b>Email:</b> ${email}</p>

          <div style="
            margin-top: 20px;
            padding: 16px;
            background: rgba(255,255,255,0.06);
            border-left: 4px solid #EF233C;
            border-radius: 12px;
            line-height: 1.6;
          ">
            ${message}
          </div>

          <p style="
            margin-top: 22px;
            font-size: 11px;
            color: rgba(255,255,255,0.45);
            letter-spacing: 1px;
            text-transform: uppercase;
          ">
            HOTNCOOL Restaurant Group
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Email error:", error);

    return res.status(500).json({
      success: false,
      message: "Email sending failed.",
    });
  }
});

/* -------------------- LOCAL SERVER -------------------- */

const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`HOTNCOOL backend running on http://localhost:${PORT}`);
  });
}

/* -------------------- VERCEL EXPORT -------------------- */

export default app;