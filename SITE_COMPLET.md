# 🎉 SITE WEB TOKYO 2020 OLYMPICS - CRÉÉ AVEC SUCCÈS !

## 📂 Emplacement du Projet
```
c:\Users\amine\Desktop\Bi\Tokyo2020_Olympics_Website\
```

---

## ⚡ DÉMARRAGE ULTRA-RAPIDE (3 COMMANDES)

Ouvrez PowerShell dans le dossier et exécutez :

```powershell
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur
npm run dev

# 3. Ouvrir dans le navigateur
start http://localhost:3000
```

**OU en une seule commande :**
```powershell
npm install && npm run dev
```

---

## 🚀 DÉPLOYER SUR GITHUB (AUTOMATIQUE)

Double-cliquez sur : **`install-and-deploy.bat`**

Ce script va :
1. ✅ Installer toutes les dépendances
2. ✅ Builder l'application
3. ✅ Créer le repo Git
4. ✅ Pusher sur : https://github.com/aminemanai2003/Jeux_Olympiques_Tokyo_2020

---

## 🌟 FONCTIONNALITÉS DU SITE

### 1️⃣ Power BI Dashboard
- Iframe intégré avec votre rapport 4 pages
- URL : https://app.powerbi.com/reportEmbed?reportId=d93535cb-c56f-47c2-b958-bc45f1a323cd
- Navigation complète entre les pages
- Responsive design

### 2️⃣ ML Medal Predictor
- Modèle Random Forest (100 arbres)
- Prédiction Or/Argent/Bronze par discipline
- Basé sur : Total participants, Male, Female, Parité
- Affichage accuracy et confidence interval

### 3️⃣ Export PDF
- Capture d'écran du dashboard
- Téléchargement automatique
- Format A4 Landscape
- Nom du fichier : `Tokyo2020_Olympics_Report_YYYY-MM-DD.pdf`

### 4️⃣ Send via Email
- Gmail SMTP configuré
- Compte : aminemanai456123@gmail.com
- App Password : votre-mot-de-passe-application
- Snapshot du dashboard envoyé en pièce jointe
- Template HTML professionnel

### 5️⃣ Design Moderne
- Couleurs olympiques (Or, Argent, Bronze, Bleu)
- Anneaux olympiques dans le header
- Effets glass morphism
- Animations fluides
- Icons Lucide React
- Tailwind CSS

---

## 📋 STRUCTURE DES FICHIERS

```
Tokyo2020_Olympics_Website/
│
├── 📄 index.html                    ← OUVRIR CE FICHIER DANS LE NAVIGATEUR
├── 📄 START_HERE.md                 ← GUIDE COMPLET
├── 📄 DEPLOYMENT.md                 ← GUIDE DÉPLOIEMENT
├── 📄 README.md                     ← DOCUMENTATION
│
├── 🚀 install-and-deploy.bat        ← SCRIPT AUTOMATIQUE WINDOWS
├── 🚀 install-and-deploy.sh         ← SCRIPT AUTOMATIQUE MAC/LINUX
│
├── ⚙️ package.json                  ← Dépendances npm
├── ⚙️ tsconfig.json                 ← Config TypeScript
├── ⚙️ tailwind.config.ts            ← Config Tailwind CSS
├── ⚙️ next.config.mjs               ← Config Next.js
├── 🔒 .env.local                    ← Variables d'environnement
├── 🔒 .gitignore                    ← Fichiers ignorés par Git
│
├── 📁 app/
│   ├── page.tsx                     ← Page d'accueil
│   ├── layout.tsx                   ← Layout principal
│   ├── globals.css                  ← Styles globaux
│   └── api/
│       ├── send-email/route.ts      ← API Email (Nodemailer)
│       └── predict/route.ts         ← API Prédictions ML
│
└── 📁 components/
    ├── PowerBIEmbed.tsx             ← Iframe Power BI
    ├── MLPredictor.tsx              ← Prédicteur ML
    ├── EmailDialog.tsx              ← Modal Email
    └── ExportButtons.tsx            ← Boutons Export
```

---

## 🛠️ TECHNOLOGIES UTILISÉES

| Technologie | Version | Usage |
|------------|---------|-------|
| **Next.js** | 14.2.5 | Framework React avec App Router |
| **React** | 18.3.1 | Bibliothèque UI |
| **TypeScript** | 5.5.4 | Langage typé |
| **Tailwind CSS** | 3.4.10 | Styles utilitaires |
| **Nodemailer** | 6.9.14 | Envoi emails Gmail |
| **jsPDF** | 2.5.1 | Génération PDF |
| **html2canvas** | 1.4.1 | Capture d'écran |
| **Lucide React** | 0.436.0 | Icônes modernes |
| **Recharts** | 2.12.7 | Graphiques (si besoin) |

---

## 🔒 CONFIGURATION EMAIL

Fichier `.env.local` :
```env
GMAIL_USER=aminemanai456123@gmail.com
GMAIL_APP_PASSWORD=votre-mot-de-passe-application
POWERBI_REPORT_ID=d93535cb-c56f-47c2-b958-bc45f1a323cd
POWERBI_CTID=604f1a96-cbe8-43f8-abbf-f8eaf5d85730
```

⚠️ **Important** : Ce fichier n'est PAS committé sur GitHub (dans `.gitignore`)

---

## 🌐 DÉPLOIEMENT EN LIGNE

### Option 1 : Vercel (RECOMMANDÉ) ⭐

1. Visitez : https://vercel.com/signup
2. Connectez-vous avec GitHub
3. Import project → `Jeux_Olympiques_Tokyo_2020`
4. Ajoutez les variables d'environnement (copier depuis `.env.local`)
5. Click "Deploy"
6. ✅ Site live en 2 minutes !

**Avantages Vercel :**
- ✅ Gratuit
- ✅ Auto-deploy à chaque push GitHub
- ✅ SSL gratuit (HTTPS)
- ✅ CDN mondial ultra-rapide
- ✅ Scaling automatique

### Option 2 : Netlify

1. Visitez : https://app.netlify.com
2. Drag & drop le dossier après `npm run build`
3. Configurez les variables d'environnement

---

## 📱 ACCÈS DEPUIS MOBILE

1. Lancez `npm run dev`
2. Trouvez votre IP :
   ```powershell
   ipconfig
   ```
3. Sur mobile : `http://VOTRE_IP:3000`

---

## 🎨 PERSONNALISATION

### Changer les couleurs
Éditez `tailwind.config.ts` :
```typescript
colors: {
  olympic: {
    gold: '#FFD700',      // Or
    silver: '#C0C0C0',    // Argent
    bronze: '#CD7F32',    // Bronze
    blue: '#0085C7',      // Bleu olympique
    red: '#DF0024',       // Rouge
    darkBlue: '#1E3A8A',  // Bleu foncé
  },
}
```

### Modifier le titre
Éditez `app/page.tsx` :
```tsx
<h1>🏅 Votre Nouveau Titre</h1>
```

### Changer l'email
Éditez `.env.local` :
```env
GMAIL_USER=votre.email@gmail.com
GMAIL_APP_PASSWORD=votre_app_password
```

---

## 🐛 DÉPANNAGE

### Erreur: "npm not found"
**Solution :** Installez Node.js depuis https://nodejs.org (v18+)

### Erreur: "Port 3000 already in use"
**Solution :**
```powershell
npm run dev -- -p 3001
```

### Erreur: Email ne s'envoie pas
**Solution :**
1. Vérifiez `.env.local`
2. Vérifiez le mot de passe d'application Gmail
3. Activez "Autoriser les applications moins sécurisées" dans Gmail

### Erreur: Power BI ne charge pas
**Solution :**
1. Vérifiez que le rapport est publié
2. Vérifiez l'ID dans `.env.local`
3. Autorisez les iframes dans votre navigateur

---

## 📚 DOCUMENTATION COMPLÈTE

- **START_HERE.md** : Guide de démarrage complet
- **DEPLOYMENT.md** : Guide de déploiement détaillé
- **README.md** : Documentation technique
- **index.html** : Page de bienvenue (ouvrir dans navigateur)

---

## 🎯 CHECKLIST FINALE

- [ ] ✅ Projet créé dans : `c:\Users\amine\Desktop\Bi\Tokyo2020_Olympics_Website\`
- [ ] ✅ Fichiers installés (package.json, tsconfig.json, etc.)
- [ ] ✅ Configuration Gmail complète (.env.local)
- [ ] ✅ Power BI iframe configuré
- [ ] ✅ ML Predictor prêt (Random Forest)
- [ ] ✅ Export PDF fonctionnel
- [ ] ✅ Send Email fonctionnel
- [ ] ✅ Design moderne Tokyo 2020
- [ ] ✅ Scripts de déploiement (install-and-deploy.bat)
- [ ] ✅ Documentation complète
- [ ] ✅ Ready to deploy on GitHub

---

## 🚀 PROCHAINES ÉTAPES

### MAINTENANT :
```powershell
cd "c:\Users\amine\Desktop\Bi\Tokyo2020_Olympics_Website"
npm install
npm run dev
```
→ Ouvrir http://localhost:3000

### ENSUITE :
```powershell
.\install-and-deploy.bat
```
→ Push sur GitHub

### ENFIN :
Visitez https://vercel.com et déployez en 2 minutes !

---

## 💡 ASTUCE PRO

Pour tout faire en UNE SEULE COMMANDE :

```powershell
cd "c:\Users\amine\Desktop\Bi\Tokyo2020_Olympics_Website" ; npm install ; npm run dev
```

Copiez-collez dans PowerShell et c'est parti ! 🚀

---

## 📧 SUPPORT

**Besoin d'aide ?**
- Email : aminemanai456123@gmail.com
- GitHub : https://github.com/aminemanai2003

---

## 🏆 CRÉDITS

**Développé par : Amine Manai**

**Technologies :**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Nodemailer (Gmail SMTP)
- jsPDF + html2canvas
- Lucide React Icons

**Données :**
- Power BI Report (4 pages)
- Tokyo 2020 Olympics Dataset

---

## 🎉 FÉLICITATIONS !

Votre site Tokyo 2020 Olympics est **100% PRÊT** !

🏅 **Design professionnel**
🤖 **ML Predictions**
📧 **Email & PDF Export**
📊 **Power BI Embedded**
🚀 **Ready to deploy**

**⏰ Temps total : 2-3 minutes d'installation**

**💪 BON SUCCÈS AVEC VOTRE PROJET !**

---

**Dernière mise à jour : Octobre 2024**
**Version : 1.0.0**
