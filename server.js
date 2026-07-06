import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mizzan888@gmail.com",
    pass: "rstgefnesntiepf" // your Gmail App Password (NO SPACES)
  }
});

app.post("/send-email", async (req, res) => {
  const { name, pickup, dropoff, phone, email } = req.body;

  const mailOptions = {
    from: "mizzan888@gmail.com",
    to: email,
    subject: "Your Albuquerque Taxi Booking Confirmation",
    text: `
Hello ${name},

Your taxi booking has been confirmed!

Pickup Location: ${pickup}
Drop-off Location: ${dropoff}
Phone Number: ${phone}

Thank you for choosing Albuquerque Taxi Service!
We look forward to serving you.

Best regards,
ABQ Taxi Team
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, error });
  }
});

app.listen(3000, () => console.log("Email server running on port 3000"));
