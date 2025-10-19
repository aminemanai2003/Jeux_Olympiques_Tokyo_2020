# 🏅 Tokyo 2020 Olympics Dashboard

Modern web application for Tokyo 2020 Olympics analytics with embedded Power BI reports, ML predictions, and advanced features.

## 🚀 Features

- 📊 **Embedded Power BI Report** - Interactive dashboard with 4 pages
- 🤖 **ML Predictions** - Medal predictions using TensorFlow.js
- 📧 **Email Reports** - Send dashboard snapshots via email
- 📄 **PDF Export** - Download reports as PDF
- 🎨 **Modern UI** - Built with Next.js, TypeScript, and Tailwind CSS
- 📱 **Responsive Design** - Works on all devices

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Access

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📧 Email Configuration

Gmail SMTP is pre-configured. Snapshots are sent to: aminemanai456123@gmail.com

## 🔒 Environment Variables

Create `.env.local` file (already configured):
- GMAIL_USER
- GMAIL_APP_PASSWORD
- POWERBI_REPORT_ID
- POWERBI_CTID

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **ML**: TensorFlow.js
- **Charts**: Recharts
- **PDF**: jsPDF + html2canvas
- **Email**: Nodemailer

## 📦 Project Structure

```
Tokyo2020_Olympics_Website/
├── app/
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── api/
│       ├── send-email/   # Email API
│       └── predict/      # ML prediction API
├── components/
│   ├── PowerBIEmbed.tsx  # Power BI iframe
│   ├── MLPredictor.tsx   # ML predictions
│   ├── EmailDialog.tsx   # Email modal
│   └── ExportButtons.tsx # Export controls
├── lib/
│   ├── utils.ts          # Utilities
│   └── ml-model.ts       # ML model logic
└── public/               # Static assets
```

## 🎯 Usage

1. **View Dashboard**: Navigate through Power BI pages
2. **ML Predictions**: Enter discipline data to predict medals
3. **Export PDF**: Click "Download PDF" button
4. **Send Email**: Click "Send Email" and enter recipient

## 📄 License

MIT

## 👤 Author

Amine Manai
