# 🏅 Tokyo 2020 Olympics Dashboard - Deployment Guide

## 📋 Quick Start

### Windows Users
```bash
# Double-click this file or run in PowerShell:
.\install-and-deploy.bat
```

### Mac/Linux Users
```bash
# Make executable and run:
chmod +x install-and-deploy.sh
./install-and-deploy.sh
```

## 🚀 Manual Installation

If you prefer to install manually:

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# Visit: http://localhost:3000
```

## 📦 Build for Production

```bash
# Build optimized production version
npm run build

# Start production server
npm start
```

## 🌐 Deploy to Vercel (Recommended)

1. Push code to GitHub (already done by script)
2. Visit [vercel.com](https://vercel.com)
3. Import your repository: `Jeux_Olympiques_Tokyo_2020`
4. Vercel will auto-detect Next.js and deploy
5. Add environment variables in Vercel dashboard:
   - `GMAIL_USER`: aminemanai456123@gmail.com
   - `GMAIL_APP_PASSWORD`: vpnu jans ifqf zlid

## 🔧 Environment Variables

Create `.env.local` file (already included):

```env
GMAIL_USER=aminemanai456123@gmail.com
GMAIL_APP_PASSWORD=vpnu jans ifqf zlid
POWERBI_REPORT_ID=d93535cb-c56f-47c2-b958-bc45f1a323cd
POWERBI_CTID=604f1a96-cbe8-43f8-abbf-f8eaf5d85730
```

## 📊 Features Included

✅ Power BI embedded dashboard (4 pages)
✅ ML predictions (Random Forest model)
✅ PDF export functionality
✅ Email sending with Gmail SMTP
✅ Responsive design (mobile/tablet/desktop)
✅ Modern UI with Tailwind CSS
✅ TypeScript for type safety

## 🐛 Troubleshooting

### Issue: npm install fails
**Solution**: Make sure Node.js 18+ is installed
```bash
node --version  # Should be v18 or higher
```

### Issue: Port 3000 already in use
**Solution**: Use a different port
```bash
npm run dev -- -p 3001
```

### Issue: Email not sending
**Solution**: 
1. Check Gmail app password is correct
2. Enable "Less secure app access" in Gmail (if needed)
3. Verify `.env.local` file exists

### Issue: Power BI iframe not loading
**Solution**:
1. Check your Power BI report is published
2. Verify report ID in `.env.local`
3. Check browser allows iframes

## 📱 Access from Mobile

After running `npm run dev`, find your local IP:

```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

Access from phone: `http://YOUR_IP:3000`

## 🔒 Security Notes

- Gmail app password is stored in `.env.local` (not committed to git)
- `.gitignore` prevents sensitive files from being uploaded
- For production, use proper secret management

## 📚 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **ML**: TensorFlow.js concepts
- **Charts**: Recharts
- **PDF**: jsPDF + html2canvas
- **Email**: Nodemailer (Gmail SMTP)
- **Icons**: Lucide React

## 👤 Author

**Amine Manai**
- Email: aminemanai456123@gmail.com
- GitHub: [@aminemanai2003](https://github.com/aminemanai2003)

## 📄 License

MIT License - Feel free to use this project!

---

**Need Help?** Open an issue on GitHub or contact via email.

🎉 **Enjoy your Tokyo 2020 Olympics Dashboard!**
