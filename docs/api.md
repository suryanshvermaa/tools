# Mailing Automation API Documentation

## Overview

The Mailing Automation API is a Node.js backend service that provides functionality for data extraction, email generation, and automated email sending. The API uses Express.js with custom middleware and integrates with Google's Gemini AI for intelligent data processing and email content generation.

## Base URL

```
http://localhost:3000
```

## Authentication

Currently, the API doesn't require authentication. However, it uses environment variables for email configuration:
- `MY_EMAIL`: Gmail address for sending emails
- `MY_PASSWORD`: Gmail app password
- `GEMINI_API_KEY`: Google Gemini API key

## API Endpoints

### 1. Health Check

**GET** `/health`

Check if the server is running.

**Response:**
```json
{
  "status": 200,
  "message": "healthy",
  "data": {}
}
```

### 2. Data Processing

#### Generate Data from File or Text

**POST** `/jsonData`

Extract and convert data from uploaded files or text input into JSON format using AI.

**Request:**
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `file` (optional): Upload file (supports CSV, TSV, TXT, HTML, PDF, XLSX)
  - `data` (optional): Text data to process

**Supported File Types:**
- CSV files
- TSV files
- TXT files
- HTML files
- PDF files
- XLSX files

**Response:**
```json
{
  "status": 201,
  "message": "data is converted successfully",
  "data": {
    "respData": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "rollNo": "12345",
        "college": "Example University"
      }
    ]
  }
}
```

#### Get Processed Data

**GET** `/getData`

Retrieve the currently stored processed data.

**Response:**
```json
{
  "status": 200,
  "message": "data fetched successfully!",
  "data": {
    "data": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "rollNo": "12345",
        "college": "Example University"
      }
    ]
  }
}
```

### 3. Email Generation

#### Generate Email Content

**POST** `/generateMail`

Generate HTML email content using AI based on a prompt and sample data.

**Request:**
```json
{
  "prompt": "Write a welcome email for new students"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "success",
  "data": {
    "email": "<html><body><h1>Welcome!</h1>...</body></html>"
  }
}
```

#### Get Generated Email

**GET** `/getMail`

Retrieve the currently generated email HTML content.

**Response:**
```json
{
  "status": 200,
  "message": "mail fetched successfully",
  "data": {
    "mail": "<html><body><h1>Welcome!</h1>...</body></html>"
  }
}
```

#### Update Email Content

**PUT** `/updateMail`

Update the email HTML content.

**Request:**
```json
{
  "mail": "<html><body><h1>Updated Welcome!</h1>...</body></html>"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "mail updated successfully",
  "data": {
    "mail": "<html><body><h1>Updated Welcome!</h1>...</body></html>"
  }
}
```

### 4. Email Sending

#### Send Emails

**POST** `/sendMail`

Send emails to all recipients in the processed data with optional attachments.

**Request:**
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `subject` (required): Email subject line
  - `files` (optional): Up to 4 attachment files

**Response:**
```json
{
  "status": 200,
  "message": "mailing successful",
  "data": {
    "data": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "rollNo": "12345",
        "college": "Example University"
      }
    ],
    "attachments": [
      {
        "fileName": "document.pdf",
        "path": "/path/to/file"
      }
    ],
    "fileInfo": [
      {
        "originalName": "document.pdf",
        "mimeType": "application/pdf",
        "path": "/path/to/file"
      }
    ]
  }
}
```

## Error Handling

The API uses a custom error handling middleware that returns consistent error responses:

**Error Response Format:**
```json
{
  "status": 400,
  "message": "Error description",
  "data": {}
}
```

**Common Error Codes:**
- `400`: Bad Request - Missing required fields or invalid input
- `500`: Internal Server Error - Server-side errors

## File Upload

The API uses Multer middleware for file uploads with the following configuration:
- **Storage:** Disk storage in `src/uploads/` directory
- **File Naming:** Unique timestamp-based naming to prevent conflicts
- **Supported Formats:** CSV, TSV, TXT, HTML, PDF, XLSX

## Data Flow

1. **Data Processing:**
   - Upload file or provide text data via `/jsonData`
   - AI extracts structured data and stores in `src/data/data.json`
   - Retrieve processed data via `/getData`

2. **Email Generation:**
   - Provide prompt via `/generateMail`
   - AI generates HTML email content using sample data
   - Store and retrieve email content via `/getMail` and `/updateMail`

3. **Email Sending:**
   - Send emails to all recipients via `/sendMail`
   - Supports attachments (up to 4 files)
   - Uses Gmail SMTP for delivery

## Dependencies

### Core Dependencies
- `expresspro`: Custom Express.js framework
- `nodemailer`: Email sending functionality
- `multer`: File upload handling
- `@google/genai`: Google Gemini AI integration

### File Processing Dependencies
- `pdf-text-reader`: PDF text extraction
- `node-xlsx`: Excel file processing
- `fs/promises`: File system operations

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=3000
MY_EMAIL=your-email@gmail.com
MY_PASSWORD=your-gmail-app-password
GEMINI_API_KEY=your-gemini-api-key
```

## Example Usage

### Complete Workflow

1. **Upload and Process Data:**
   ```bash
   curl -X POST http://localhost:3000/jsonData \
     -F "file=@data.csv"
   ```

2. **Generate Email Content:**
   ```bash
   curl -X POST http://localhost:3000/generateMail \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Write a welcome email for new students"}'
   ```

3. **Send Emails:**
   ```bash
   curl -X POST http://localhost:3000/sendMail \
     -F "subject=Welcome to Our Institution" \
     -F "files=@attachment1.pdf" \
     -F "files=@attachment2.docx"
   ```

## Notes

- The API uses Google Gemini AI for intelligent data extraction and email generation
- File uploads are stored temporarily in the `src/uploads/` directory
- Processed data is persisted in `src/data/data.json`
- Email templates are dynamically generated and stored in `src/mails/mailContent.js`
- The service requires Gmail SMTP configuration for email delivery 