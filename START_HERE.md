# 🎉 VOTRE SITE EST PRÊT !

## 📂 Emplacement
```
c:\Users\amine\Desktop\Bi\Tokyo2020_Olympics_Website\
```

## 🚀 INSTALLATION RAPIDE (2 MINUTES)

### Étape 1: Ouvrir le dossier
```powershell
cd "c:\Users\amine\Desktop\Bi\Tokyo2020_Olympics_Website"
```

### Étape 2: Installer et Déployer (UN SEUL CLIC !)
**Double-cliquez sur:** `install-and-deploy.bat`

OU exécutez dans PowerShell:
```powershell
.\install-and-deploy.bat
```

✅ Ce script va automatiquement :
1. Installer toutes les dépendances (npm install)
2. Builder l'application
3. Créer le dépôt Git
4. Pusher sur GitHub : https://github.com/aminemanai2003/Jeux_Olympiques_Tokyo_2020

---

## 💻 LANCER EN LOCAL

Après l'installation:

```powershell
npm run dev
```

Puis ouvrez: **http://localhost:3000**

---

## 🌟 FONCTIONNALITÉS INCLUSES

✅ **Power BI Embedded** - Votre rapport 4 pages intégré
✅ **ML Predictions** - Modèle Random Forest pour prédire les médailles
✅ **Export PDF** - Télécharger le dashboard en PDF
✅ **Send Email** - Envoyer des snapshots par email (Gmail configuré)
✅ **Design Moderne** - UI professionnelle aux couleurs olympiques
✅ **Responsive** - Fonctionne sur mobile/tablette/desktop

---

## 📧 EMAIL CONFIGURÉ

- **Compte**: aminemanai456123@gmail.com
- **App Password**: vpnu jans ifqf zlid (déjà configuré)
- Les snapshots seront envoyés depuis ce compte

---

## 🎨 APERÇU DU SITE

### Page d'accueil
- Header avec logo olympique 🏅
- 2 onglets : "Power BI Dashboard" & "ML Predictions"
- Boutons "Download PDF" et "Send Email"
- Power BI iframe intégré
- Stats cards (206 pays, 11,326 athlètes, 50 disciplines)
- Footer avec crédits

### Page ML Predictions
- Formulaire : Total participants, Male, Female
- Calcul automatique de la parité
- Bouton "Run Prediction"
- Résultats : Médailles Or/Argent/Bronze
- Détails du modèle (Random Forest, accuracy, etc.)

---

## 🌐 DÉPLOYER EN LIGNE (GRATUIT)

### Option 1: Vercel (RECOMMANDÉ - 5 minutes)

1. Visitez: https://vercel.com/signup
2. Connectez-vous avec GitHub
3. Import project → Sélectionnez `Jeux_Olympiques_Tokyo_2020`
4. Ajoutez les variables d'environnement:
   - `GMAIL_USER`: aminemanai456123@gmail.com
   - `GMAIL_APP_PASSWORD`: vpnu jans ifqf zlid
5. Click "Deploy"
6. ✅ Votre site sera live en 2 minutes !

### Option 2: Netlify

1. Visitez: https://app.netlify.com
2. Drag & drop le dossier `.next` après build
3. Configurez les variables d'environnement

---

## 📱 TESTER SUR MOBILE

1. Lancez `npm run dev`
2. Trouvez votre IP locale:
   ```powershell
   ipconfig
   ```
3. Sur votre téléphone, ouvrez: `http://VOTRE_IP:3000`

---

## 🔧 STRUCTURE DU PROJET

```
Tokyo2020_Olympics_Website/
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── layout.tsx            # Layout principal
│   ├── globals.css           # Styles globaux
│   └── api/
│       ├── send-email/       # API envoi email
│       └── predict/          # API prédictions ML
├── components/
│   ├── PowerBIEmbed.tsx      # Iframe Power BI
│   ├── MLPredictor.tsx       # Prédictions ML
│   ├── EmailDialog.tsx       # Modal email
│   └── ExportButtons.tsx     # Boutons export
├── .env.local                # Variables d'environnement
├── package.json              # Dépendances
└── README.md                 # Documentation
```

---

## 💡 PERSONNALISATION

### Changer les couleurs
Éditez `tailwind.config.ts`:
```typescript
olympic: {
  gold: '#FFD700',    // Or
  silver: '#C0C0C0',  // Argent
  bronze: '#CD7F32',  // Bronze
  blue: '#0085C7',    // Bleu olympique
}
```

### Modifier le Power BI Report ID
Éditez `.env.local`:
```env
POWERBI_REPORT_ID=VOTRE_NOUVEAU_ID
```

---

## ⚡ COMMANDES UTILES

```powershell
npm run dev          # Lancer en mode développement
npm run build        # Builder pour production
npm start            # Lancer en production
npm run lint         # Vérifier le code
```

---

## 🐛 DÉPANNAGE

### Problème: "npm" n'est pas reconnu
**Solution**: Installez Node.js depuis https://nodejs.org (v18 ou supérieur)

### Problème: Port 3000 déjà utilisé
**Solution**: 
```powershell
npm run dev -- -p 3001
```

### Problème: Email ne s'envoie pas
**Solution**: Vérifiez que le mot de passe d'application Gmail est correct dans `.env.local`

### Problème: Power BI ne charge pas
**Solution**: 
1. Vérifiez que votre rapport Power BI est publié
2. Vérifiez l'ID du rapport dans `.env.local`

---

## 📞 SUPPORT

**Besoin d'aide ?**
- Email: aminemanai456123@gmail.com
- GitHub: https://github.com/aminemanai2003

---

## 🎯 PROCHAINES ÉTAPES

1. ✅ Double-cliquez sur `install-and-deploy.bat`
2. ✅ Attendez l'installation (2-3 minutes)
3. ✅ Lancez `npm run dev`
4. ✅ Ouvrez http://localhost:3000
5. 🎉 Profitez de votre dashboard !

---

## 🏆 TECHNOLOGIES UTILISÉES

- **Next.js 14** - Framework React moderne
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Nodemailer** - Envoi d'emails
- **jsPDF** - Génération PDF
- **html2canvas** - Capture d'écran
- **Lucide React** - Icônes modernes

---

**🎉 FÉLICITATIONS ! VOTRE SITE TOKYO 2020 OLYMPICS EST PRÊT !**

💪 Créé par Amine Manai
🏅 Powered by Next.js, Power BI & ML

---

**⏰ TEMPS TOTAL D'INSTALLATION: 2-3 MINUTES**

**🚀 BON DÉPLOIEMENT !**
