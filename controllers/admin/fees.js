import { Intern } from "../../models/intern.js";
import { Paymentmail } from "../../templates/Paymentmail.js";
import transport from "../../config/nodemailer.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.ID_KEY,
  key_secret: process.env.KEY_SECRET,

});

export const payfees = async (req, res) => {
  const { selectdate, amount } = req.body;

  if (!selectdate || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
   
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Math.random()}`,
      notes: {
        date: selectdate,
      },
    };

    const paymentLink = await razorpay.orders.create(options);

    const interns = await Intern.find();
    const emails = interns.map((intern) => intern.email);
    const mail = emails.join(",");

    
    const htmlContent = Paymentmail(selectdate,amount, paymentLink.short_url);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: mail,
      subject: "Attention: Rent and Fees Due!",
      html: htmlContent,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email", error });
      }
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Emails sent successfully!" });
    });
  } catch (error) {
    console.error("Error creating payment link: ", error);
    return res.status(500).json({ message: "Error creating payment link", error });
  }
};
