
export const mailHtml=(data)=>{
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Task Submission Confirmation - TESLA NITP</title>
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'); /* Using Inter for modern look */

        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', Arial, sans-serif;
            background-color: #f4f7f6; /* Light, neutral background */
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            width: 100% !important;
            min-width: 100%;
        }

        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        td {
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .header {
            background-color: #5C4B5C; /* Deep purple/plum, professional yet distinct */
            padding: 24px;
            text-align: center;
            color: #ffffff;
            font-size: 24px;
            font-weight: 700;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        .content {
            padding: 30px;
            color: #333333;
            line-height: 1.6;
            font-size: 16px;
        }

        .content p {
            margin-bottom: 1em;
            margin-top: 0;
        }

        .footer {
            background-color: #e8e8e8;
            padding: 20px 30px;
            text-align: center;
            color: #777777;
            font-size: 13px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }

        .button {
            display: inline-block;
            padding: 12px 25px;
            margin-top: 20px;
            background-color: #6C5B7B; /* Slightly lighter purple for buttons */
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            font-size: 15px;
        }

        /* Responsive styles */
        @media screen and (max-width: 620px) {
            .container {
                width: 100% !important;
                border-radius: 0;
                box-shadow: none;
            }
            .header, .content, .footer {
                padding-left: 15px !important;
                padding-right: 15px !important;
            }
            .header {
                font-size: 20px !important;
            }
            .content {
                font-size: 15px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f4f7f6; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; width: 100% !important; min-width: 100%;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" class="container" width="600" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                    <!-- Header -->
                    <tr>
                        <td class="header" style="background-color: #5C4B5C; padding: 24px; text-align: center; color: #ffffff; font-size: 24px; font-weight: 700; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                            TESLA NITP
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 30px; color: #333333; line-height: 1.6; font-size: 16px;">
                            <p>Dear ${data.name},</p>
                            <p>We hope this email finds you well. 👋</p>
                            <p>This is to confirm that we have successfully received your recent task submission. We truly appreciate your promptness and dedication in completing the assigned work. Your commitment to excellence is highly valued by our club. ✨</p>
                            <p>Your contribution is incredibly valuable to TESLA NITP, and we thank you for your continued enthusiasm and effort.</p>
                            <p>We look forward to your continued active participation and collaboration in our future club activities! 🚀</p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td class="footer" style="background-color: #e8e8e8; padding: 20px 30px; text-align: center; color: #777777; font-size: 13px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                            <p style="margin-bottom: 5px; margin-top: 0;">Best regards,</p>
                            <p style="margin-bottom: 0; margin-top: 0;">The TESLA NITP Team</p>
                            <p style="margin-top: 10px; margin-bottom: 0;">August 8, 2025</p>
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
