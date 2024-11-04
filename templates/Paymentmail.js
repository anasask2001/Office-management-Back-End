export const Paymentmail = (selectdate,amount) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rent Payment Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #4CAF50;
        }
        .details {
            margin-top: 20px;
        }
        .details p {
            font-size: 16px;
            margin: 10px 0;
        }
        .details p span {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Rent Payment Confirmation</h1>
        <p>Dear,</p>
        <p>Thank you for your payment. Here are the details of your transaction:</p>
        <div class="details">
            <p><span>Name: </span></p>
            <p><span>Email: </span></p>
            <p><span>Payment Amount:${amount} </span></p>
            <p><span>Payment Date:${selectdate} </span></p>
            <p><span>Payment Method:${"https://rzp.io/rzp/YUl8muoX"} </span></p>
         

        </div>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best regards,<br>Your Property Management Team</p>
    </div>
</body>
</html>`;
