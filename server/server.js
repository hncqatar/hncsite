import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

// Load configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS setup to allow queries from the React app
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
  methods: ["POST"],
  credentials: true
}));

app.use(express.json());

// Main dispatch endpoint
app.post("/api/send-email", async (req, res) => {
  const { name, mobile, email, feedback } = req.body;

  // Basic validation check
  if (!name || !mobile || !email || !feedback) {
    return res.status(400).json({ error: "All enquiry fields are required." });
  }

  // Retrieve secrets from environment
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS;
  const TARGET_EMAIL = process.env.TARGET_EMAIL || GMAIL_USER;

  if (!GMAIL_USER || !GMAIL_APP_PASS) {
    console.error("Gmail configuration variables GMAIL_USER and GMAIL_APP_PASS are not set inside server/.env");
    return res.status(500).json({ error: "SMTP credentials are missing on the server backend." });
  }

  try {
    // Configure standard Gmail SMTP transport channel
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASS // Gmail App Password (16 characters)
      }
    });

    // Create high-premium HTML template layout
    const mailOptions = {
      from: `"${name}" <${GMAIL_USER}>`,
      to: TARGET_EMAIL,
      replyTo: email,
      subject: `🔥 HOTNCOOL Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fcfcfc;">
          <h2 style="color: #EF233C; border-bottom: 2px solid #EF233C; padding-bottom: 10px; margin-top: 0; text-transform: uppercase;">HOTNCOOL Enquiry</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 130px;">Sender Name:</td>
              <td style="padding: 8px 0; color: #111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Mobile No:</td>
              <td style="padding: 8px 0; color: #111;">${mobile}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0; color: #111;"><a href="mailto:${email}" style="color: #EF233C; text-decoration: none;">${email}</a></td>
            </tr>
          </table>

          <div style="margin-top: 25px; padding: 15px; background-color: #f7f7f7; border-left: 4px solid #EF233C; border-radius: 4px;">
            <h4 style="margin: 0 0 10px 0; color: #EF233C; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Enquiry / Feedback Details:</h4>
            <p style="margin: 0; color: #333; line-height: 1.6; font-style: italic;">"${feedback}"</p>
          </div>

          <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px; text-align: center; font-size: 10px; color: #aaa; text-transform: uppercase; letter-spacing: 1px;">
            HOTNCOOL RESTAURANT GROUP • ESTABLISHED 1991
          </div>
        </div>
      `
    };

    // Dispatch
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully dispatched from ${email} to ${TARGET_EMAIL}`);
    return res.status(200).json({ message: "Enquiry email dispatched successfully." });
    
  } catch (error) {
    console.error("Nodemailer SMTP failed to send mail:", error);
    return res.status(500).json({ error: "SMTP transmission channel failed. Check Gmail app password permissions." });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 HOTNCOOL Enquiry SMTP server active on http://localhost:${PORT}`);
});
