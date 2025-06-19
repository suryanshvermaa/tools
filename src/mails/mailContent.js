
export const mailHtml=(data)=>{
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Invitation: Abhiyantriki by Tesla Club</title>
    <style type="text/css">
        /* Client-specific Styles */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }

        /* Resets */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            line-height: 1.6;
        }
        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%;
        }
        td {
            padding: 0;
            vertical-align: top;
        }
        a {
            text-decoration: none;
            color: #007bff;
        }
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        /* Container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            overflow: hidden;
        }

        /* Header */
        .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 25px 30px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            line-height: 1.2;
            font-weight: 700;
        }
        .header p {
            margin-top: 5px;
            font-size: 16px;
            opacity: 0.9;
        }

        /* Content */
        .content-section {
            padding: 30px;
            text-align: left;
            font-size: 15px;
            color: #333333;
        }
        .content-section p {
            margin-bottom: 15px;
        }
        .content-section ul {
            list-style: none;
            padding: 0;
            margin-bottom: 20px;
        }
        .content-section ul li {
            margin-bottom: 10px;
            padding-left: 20px;
            position: relative;
        }
        .content-section ul li::before {
            content: '👉'; /* Unicode right pointer finger emoji */
            position: absolute;
            left: 0;
            color: #007bff;
            font-size: 18px;
            line-height: 1;
            top: -2px; /* Adjust vertical alignment */
        }
        .event-details {
            background-color: #e6f2ff;
            border-left: 5px solid #007bff;
            padding: 20px 25px;
            margin-top: 25px;
            border-radius: 4px;
        }
        .event-details strong {
            color: #0056b3;
        }

        /* Call to Action */
        .button-container {
            text-align: center;
            padding: 20px 0;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff !important;
            padding: 12px 25px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
        }
        .button:hover {
            background-color: #0056b3;
        }

        /* Footer */
        .footer {
            background-color: #333333;
            color: #cccccc;
            padding: 25px 30px;
            text-align: center;
            font-size: 13px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        .footer a {
            color: #88bbff;
        }
        .footer p {
            margin: 0;
            padding-top: 5px;
        }

        /* Responsive */
        @media screen and (max-width: 620px) {
            .email-container {
                width: 100% !important;
                max-width: none !important;
                border-radius: 0;
            }
            .header, .content-section, .footer {
                padding: 20px !important;
            }
            .header h1 {
                font-size: 24px !important;
            }
            .content-section {
                font-size: 14px !important;
            }
            .button {
                padding: 10px 20px !important;
                font-size: 15px !important;
            }
        }
    </style>
</head>
<body>
    <div style="background-color: #f4f4f4; padding: 20px 0;">
        <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
            <tr>
                <td class="header">
                    <h1>Abhiyantriki ✨</h1>
                    <p>An Exclusive Event by Tesla Club, NIT Patna</p>
                </td>
            </tr>
            <tr>
                <td class="content-section">
                    <p>Dear ${data.name},</p>
                    <p>Get ready to ignite your curiosity and dive into the world of innovation! 🚀</p>
                    <p>The Tesla Club of NIT Patna is thrilled to invite you to <strong>Abhiyantriki</strong>, an exclusive event designed to inspire, educate, and connect future leaders in technology and engineering. Whether you're a seasoned tech enthusiast or just beginning your journey, Abhiyantriki promises an enriching experience.</p>

                    <div class="event-details">
                        <p style="margin-top: 0; font-size: 17px; font-weight: bold; color: #0056b3;">Event Details:</p>
                        <ul>
                            <li><strong>Event Name:</strong> Abhiyantriki</li>
                            <li><strong>Date:</strong> February 2nd, 2026</li>
                            <li><strong>Time:</strong> To be announced (Stay tuned for updates!)</li>
                            <li><strong>Venue:</strong> Incubation Center, NIT Patna</li>
                        </ul>
                    </div>

                    <p>Join us for an insightful session where we'll explore groundbreaking ideas, engage in thought-provoking discussions, and network with like-minded individuals. Don't miss this opportunity to be a part of something extraordinary!</p>

                    <div class="button-container">
                        <a href="#" class="button">RSVP Now!</a>
                    </div>

                    <p style="margin-top: 25px;">We look forward to welcoming you!</p>
                    <p>Best regards,<br>The Tesla Club Team<br>NIT Patna</p>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <p>&copy; 2023 Tesla Club, NIT Patna. All rights reserved.</p>
                    <p><a href="#">Unsubscribe</a> from future emails.</p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>  
    `
}
