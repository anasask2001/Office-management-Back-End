export const logintemplateintern = (firstname, lastname, stack,batch, email, password) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Success</title>
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
        <h1>Registration Successful!</h1>
        <p>Thank you for registering. Here are your details:</p>
        <div class="details">
            <p><span>Name: </span>${firstname} ${lastname}</p>
            <p><span>Email: </span>${email}</p>
               <p><span>Stack: </span>${stack}</p>
                  <p><span>Batch: </span>${batch}</p>
            <p><span>Password: </span>${password}</p>
           
        </div>
    </div>
</body>
</html>`;
