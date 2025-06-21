
export const mailHtml=(data)=>{
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Announcement: Abhivriti</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        td {
            padding: 0;
            vertical-align: top;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .header {
            background-color: #4CAF50; /* A pleasant green */
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            line-height: 1.2;
        }
        .content {
            padding: 30px;
            line-height: 1.6;
            color: #555;
        }
        .content h2 {
            color: #333;
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 20px;
        }
        .content p {
            margin-bottom: 15px;
        }
        .event-details {
            background-color: #e8f5e9; /* Lighter green background */
            padding: 20px;
            border-radius: 5px;
            margin-top: 25px;
            margin-bottom: 25px;
        }
        .event-details p {
            margin: 8px 0;
            font-size: 16px;
            color: #2e7d32; /* Darker green text */
        }
        .footer {
            background-color: #f0f0f0;
            color: #888;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        .emoji {
            font-size: 1.2em;
            vertical-align: middle;
        }

        /* Responsive styles */
        @media only screen and (max-width: 620px) {
            .container {
                margin: 0 !important;
                border-radius: 0 !important;
                box-shadow: none !important;
            }
            .header, .content, .footer {
                padding: 20px !important;
            }
            .header h1 {
                font-size: 24px !important;
            }
            .content h2 {
                font-size: 20px !important;
            }
            .event-details {
                padding: 15px !important;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table role="presentation" class="container" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="header">
                            <h1>🎉 Event Announcement: Abhivriti 🎉</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <p>Dear ${data.name},</p>
                            <p>We are thrilled to announce an exciting upcoming event that you won't want to miss! Get ready for <strong>Abhivriti</strong>, a grand event designed to inspire and engage.</p>
                            <p>Abhivriti promises to be an enriching experience, bringing together innovative ideas and enthusiastic participants. It's a fantastic opportunity to learn, network, and contribute to a vibrant atmosphere.</p>

                            <div class="event-details">
                                <p><span class="emoji">🗓️</span> <strong>Date:</strong> August 10, 2025</p>
                                <p><span class="emoji">⏰</span> <strong>Time:</strong> 10:00 AM - 4:00 PM</p>
                                <p><span class="emoji">📍</span> <strong>Venue:</strong> Main Auditorium</p>
                            </div>

                            <p>Whether you're looking to expand your knowledge, meet like-minded individuals, or simply enjoy a day of engaging activities, Abhivriti has something for everyone.</p>
                            <p>Registration for Abhivriti is now open! We encourage you to register early to secure your spot and be a part of this memorable event.</p>
                            <p>We look forward to welcoming you to Abhivriti!</p>
                            <p>Best regards,<br>The Event Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                            <p>&copy; 2025 All Rights Reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>  
    `
}
