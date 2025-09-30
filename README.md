# Automated Tools Platform

A comprehensive full-stack application suite for email automation and data processing, featuring AI-powered content generation, file processing, and bulk mailing capabilities. The platform consists of multiple interconnected tools designed to streamline data extraction, email composition, and automated communication workflows.

## 🚀 Features

### Core Capabilities
- **AI-Powered Data Extraction**: Convert raw data from CSV, XLSX, PDF, TSV, and TXT files into structured JSON using Google's Gemini AI
- **Intelligent Email Generation**: Create personalized emails using AI with custom prompts and dynamic data insertion
- **Bulk Email Automation**: Send personalized emails to multiple recipients with attachment support
- **File Processing**: Handle multiple file formats with automatic data parsing and validation
- **Modern Web Interface**: React-based frontend with TypeScript, Tailwind CSS, and shadcn/ui components
- **Docker Support**: Containerized deployment with Docker Compose for easy scaling
- **Real-time Processing**: Live feedback and status updates during data processing and email operations

### Technical Features
- **RESTful API**: Express.js backend with comprehensive API endpoints
- **AI Integration**: Google Gemini AI for content generation and data extraction
- **File Upload**: Secure file handling with Multer middleware
- **Email Service**: Nodemailer integration for reliable email delivery
- **Responsive Design**: Mobile-first UI with modern component library
- **Type Safety**: Full TypeScript support in frontend components

## 📁 Project Structure

```
tools/
├── AutomatedTools/                 # Main application
│   ├── frontend/                   # React TypeScript frontend
│   │   ├── src/
│   │   │   ├── components/         # Reusable UI components
│   │   │   │   ├── ui/            # shadcn/ui component library
│   │   │   │   ├── EmailGenerator.tsx
│   │   │   │   ├── EmailComposer.tsx
│   │   │   │   ├── FileProcessor.tsx
│   │   │   │   └── MailSender.tsx
│   │   │   ├── pages/             # Route components
│   │   │   ├── hooks/             # Custom React hooks
│   │   │   └── lib/               # Utility functions
│   │   ├── public/                # Static assets
│   │   ├── package.json           # Frontend dependencies
│   │   ├── vite.config.ts         # Vite configuration
│   │   ├── tailwind.config.ts     # Tailwind CSS config
│   │   └── Dockerfile             # Frontend container
│   │
│   ├── src/                       # Node.js backend
│   │   ├── apis/                  # API routes and controllers
│   │   │   ├── routes.js          # Main router
│   │   │   ├── data.controller.js # Data processing endpoints
│   │   │   └── mail.controller.js # Email management endpoints
│   │   ├── config/                # Application configuration
│   │   ├── data/                  # Processed JSON data storage
│   │   ├── gemini/                # Google Gemini AI integration
│   │   │   ├── data_extractor.js  # AI data extraction
│   │   │   ├── mail_writer.js     # AI email generation
│   │   │   └── system_prompt*.js  # AI prompt configurations
│   │   ├── mails/                 # Email templates and sending
│   │   ├── middlewares/           # Express middleware
│   │   └── utils/                 # Utility functions
│   │
│   ├── testing/                   # Test files and scripts
│   ├── docs/                      # Documentation
│   ├── docker-compose.yml         # Multi-container setup
│   ├── Dockerfile                 # Backend container
│   └── package.json               # Backend dependencies
│
└── mailAi/                        # Additional AI mail bot (placeholder)
    ├── index.js
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- Docker and Docker Compose (optional)
- Google Gemini API key

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tools/AutomatedTools
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables**
   ```env
   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Email Configuration
   MY_EMAIL=your_email@example.com
   EMAIL_PASSWORD=your_app_password
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```

### Installation Methods

#### Method 1: Docker Compose (Recommended)
```bash
# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost
# Backend: http://localhost:3000
```

#### Method 2: Manual Installation
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Start backend (from root directory)
npm start

# Start frontend (in another terminal)
cd frontend
npm run dev
```

## 🎯 Usage Guide

### 1. Data Processing Workflow

**Step 1: Upload or Input Data**
- Navigate to "Data Extractor from Raw" page
- Upload CSV, XLSX, PDF, TSV, or TXT files
- Alternatively, paste raw data directly

**Step 2: AI Processing**
- The system uses Google Gemini AI to extract structured data
- Data is converted to JSON format with standardized fields
- Email addresses are automatically identified and validated

**Step 3: Review Extracted Data**
- View the processed JSON data
- Verify field mappings and data accuracy

### 2. Email Generation

**Manual Composition**
- Use the "Compose Mail" feature for custom emails
- Rich text editor with formatting options
- Preview functionality before sending

**AI-Generated Content**
- Access "Email Generator" for AI-powered email creation
- Provide prompts describing the desired email content
- AI generates personalized emails using extracted data

### 3. Bulk Email Sending

**Configure Email Campaign**
- Navigate to "Send Mail" section
- Select processed data as recipient list
- Add subject line and attachments

**Personalization**
- Emails are automatically personalized using data fields
- Dynamic content insertion (e.g., `${data.name}`, `${data.company}`)
- Custom templates with professional styling

## 🔧 API Reference

### Data Processing Endpoints

#### Extract Data from File/Text
```http
POST /jsonData
Content-Type: multipart/form-data

# With file
- file: (file upload)

# With raw data
{
  "data": "raw text data to process"
}
```

#### Get Processed Data
```http
GET /getData
```

### Email Management Endpoints

#### Generate AI Email
```http
POST /generateMail
Content-Type: application/json

{
  "prompt": "Generate a welcome email for new club members"
}
```

#### Send Bulk Emails
```http
POST /sendMail
Content-Type: multipart/form-data

- subject: "Email Subject"
- files: (optional attachments)
```

#### Get Current Email Template
```http
GET /getMail
```

#### Update Email Template
```http
PUT /updateMail
Content-Type: application/json

{
  "mail": "<html>Updated email content</html>"
}
```

## 🏗️ Architecture Overview

### Backend Architecture
- **Express.js**: Web framework with expresspro for enhanced functionality
- **Modular Design**: Separated controllers, services, and utilities
- **AI Integration**: Google Gemini for intelligent data processing
- **File Processing**: Multer for secure file uploads
- **Email Service**: Nodemailer with attachment support

### Frontend Architecture
- **React 18**: Modern React with functional components
- **TypeScript**: Full type safety and better developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible component library
- **React Router**: Client-side routing
- **TanStack Query**: Data fetching and state management

### Data Flow
1. **Data Input**: Files or raw text uploaded through frontend
2. **AI Processing**: Gemini AI extracts and structures data
3. **Storage**: Processed data stored as JSON
4. **Email Generation**: AI creates personalized email content
5. **Delivery**: Bulk emails sent with personalization and attachments

## 🧪 Testing

### Backend Testing
```bash
# Run test suite
npm test

# Test specific functionality
node testing/index.js
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## 🐳 Docker Configuration

### Development Environment
```bash
# Start development environment
docker-compose up

# Rebuild containers
docker-compose up --build

# View logs
docker-compose logs -f
```

### Production Deployment
```bash
# Build production images
docker-compose -f docker-compose.prod.yml up --build

# Scale services
docker-compose up --scale backend=3
```

## 📊 Key Components

### AI-Powered Features
- **Data Extraction**: Converts unstructured data to JSON using advanced NLP
- **Email Generation**: Creates contextual, professional emails
- **Smart Personalization**: Dynamic content based on recipient data

### Security Features
- **File Validation**: Secure file upload with type checking
- **Data Sanitization**: Input validation and sanitization
- **Environment Variables**: Secure configuration management

### Performance Optimizations
- **Async Processing**: Non-blocking operations for better performance
- **Caching**: Intelligent caching of processed data
- **Containerization**: Optimized Docker images for fast deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Variables Reference

```env
# Required
GEMINI_API_KEY=your_gemini_api_key
MY_EMAIL=your_email@domain.com
EMAIL_PASSWORD=your_app_password

# Optional
PORT=3000
NODE_ENV=development
VITE_BACKEND_API=http://localhost:3000
```

## 🔍 Troubleshooting

### Common Issues

**Gemini API Errors**
- Verify API key is correct
- Check API quota and billing status
- Ensure proper network connectivity

**Email Delivery Issues**
- Verify SMTP credentials
- Check email provider app password settings
- Review firewall and network restrictions

**File Upload Problems**
- Check file size limits
- Verify supported file formats
- Review disk space availability

## 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent data processing
- React and the modern web development ecosystem
- Open source libraries and contributors
- shadcn/ui for beautiful, accessible components

---
