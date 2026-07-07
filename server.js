import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  const { name, pickup, dropoff, phone, email } = req.body;

  try {
    await resend.emails.send({
      from: "RosasTransportation@rosastransport.com",
      to: "mizzan888@gmail.com",
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
    });

    res.json({ success: true });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, error });
  }
});

// Render port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
