# Automation Tools Platform

A full-stack Node.js and React application for automating the extraction, generation, and sending of personalized emails using structured or unstructured data. The platform supports file uploads, AI-powered email generation, and bulk or individual mail delivery, making it ideal for clubs, organizations, or any group needing efficient communication workflows.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage Guide](#usage-guide)
- [API Overview](#api-overview)
- [File & Folder Reference](#file--folder-reference)
- [License](#license)

---

## Features
- **Data Extraction**: Upload CSV, XLSX, PDF, TSV, or TXT files, or paste raw data, and extract structured JSON using AI (Gemini).
- **AI Email Generation**: Compose emails manually, use templates, or generate content with AI based on prompts and data.
- **Bulk & Individual Mailing**: Send emails to individuals, teams, or all club members, with support for attachments.
- **Rich Frontend UI**: Modern React interface with reusable components, documentation, and real-time feedback.
- **Personalization**: Emails are personalized using extracted data fields.
- **File Uploads**: Secure file upload and processing with Multer middleware.
- **Extensible**: Modular backend and frontend for easy customization.

---

## Project Structure

```
mailing_automation/
│
├── data.csv                  # Sample data for testing
├── index.html                # Email template (root)
├── package.json              # Backend dependencies & scripts
├── README.md                 # Project documentation (this file)
│
├── frontend/                 # React frontend app
│   ├── ...                   # (see below for details)
│
├── src/                      # Node.js backend source
│   ├── apis/                 # API controllers & routes
│   ├── config/               # Nodemailer config
│   ├── data/                 # Processed data (JSON)
│   ├── gemini/               # AI prompt & data extraction logic
│   ├── mails/                # Email templates & sending logic
│   ├── middlewares/          # File upload middleware
│   ├── uploads/              # Uploaded files
│   ├── utils/                # Data reading utilities
│   └── index.js              # Backend entry point
│
├── testing/                  # Test scripts
│   └── index.js
```

### Frontend (`frontend/`)
- **src/pages/**: Main app pages (Index, FileProcessor, MailSender, EmailComposer, ClubMail, EmailGenerator, Documentation, NotFound)
- **src/components/**: Core UI components for file processing, mail sending, composing, etc.
- **src/components/ui/**: Reusable UI primitives (buttons, dialogs, forms, etc.)
- **src/hooks/**: Custom React hooks
- **src/lib/**: Utility functions
- **public/**: Static assets
- **index.html**: Frontend entry point
- **Tailwind, ESLint, Vite, TypeScript configs**

### Backend (`src/`)
- **apis/**: Express controllers for data extraction (`data.controller.js`), mail generation/sending (`mail.controller.js`), and route definitions (`routes.js`)
- **config/**: Nodemailer transporter setup for sending emails
- **data/**: Stores processed data as JSON
- **gemini/**: AI prompt logic for data extraction and mail writing (using Google Gemini)
- **mails/**: Email HTML templates, content writer, and sending logic
- **middlewares/**: Multer file upload middleware
- **uploads/**: Uploaded files (runtime)
- **utils/**: Data reading and file parsing utilities
- **index.js**: Main Express app entry point

---

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- Google Gemini API key (for AI features)
- Gmail credentials (for sending emails)

### Backend Setup
```bash
cd mailing_automation
pnpm install
# or npm install
touch .env
# Add your environment variables (see below)
pnpm run dev
```

#### .env Example
```
MY_EMAIL=your_gmail@gmail.com
MY_PASSWORD=your_gmail_app_password
GEMINI_API_KEY=your_google_gemini_api_key
PORT=3000
```

### Frontend Setup
```bash
cd mailing_automation/frontend
pnpm install
# or npm install
pnpm run dev
```

The frontend will run on [http://localhost:4000](http://localhost:4000) by default.

---

## Usage Guide

1. **Extract Data**: Go to "Data Extractor from Raw". Upload a file or paste data. The backend converts it to JSON.
2. **Generate/Compose Email**: Use "Email Generator" for AI-powered content, or "Compose Mail" for manual/templated emails.
3. **Send Mail**: Use "Send Mail" for individual emails, or "Send Mail to Club Members" for bulk/team emails. Attach files if needed.
4. **Documentation**: See the in-app documentation for detailed workflow and tips.

---

## API Overview

- `POST /jsonData` — Upload file or data, returns extracted JSON
- `POST /generateMail` — Generate email HTML from prompt and data
- `POST /sendMail` — Send emails (with attachments)
- `GET /getMail` — Get current email template
- `PUT /updateMail` — Update email template
- `GET /getData` — Get processed data

---

## File & Folder Reference

### Backend
- **src/index.js**: Express app setup, CORS, JSON parsing, routes, error handling
- **src/apis/data.controller.js**: Handles file/data upload, extraction, and JSON conversion
- **src/apis/mail.controller.js**: Handles email generation (AI), sending, and template management
- **src/gemini/**: Google Gemini AI integration for data extraction and mail writing
- **src/mails/mailContent.js**: HTML email template (dynamic, updated by AI)
- **src/mails/sendMail.js**: Sends emails using Nodemailer
- **src/mails/mailContentWriter.js**: Writes new HTML templates to file
- **src/utils/dataFromFile.js**: Reads and parses uploaded files (CSV, PDF, XLSX, etc.)
- **src/middlewares/multer.js**: Multer config for file uploads
- **src/config/index.js**: Nodemailer transporter config
- **src/data/data.json**: Stores processed recipient data

### Frontend
- **src/pages/**: Main navigation and feature pages
- **src/components/**: FileProcessor, MailSender, EmailComposer, ClubMailSender, EmailGenerator, Documentation, etc.
- **src/components/ui/**: UI primitives (button, card, dialog, etc.)
- **src/hooks/**: use-toast, use-mobile, etc.
- **src/lib/utils.ts**: Utility functions

---

## License

This project is licensed under the ISC License. See the LICENSE file for details. 