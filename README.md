# 🏅 Tableau de Bord Jeux Olympiques Tokyo 2020

> Tableau de bord d'Intelligence d'Affaires complet pour les Jeux Olympiques de Tokyo 2020 avec rapports Power BI interactifs, prédictions ML des médailles et analyses avancées.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.10-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## 👥 Équipe Projet - INFO DECIS

 

| **Amine Manai** | 
| **Douiri Eya** | 
| **Eya Jmâa** | 
| **Ines Chtioui** | 
| **Maha Aloui** |
| **Mariem Fersi** | 

## 🌟 Fonctionnalités

### 📊 **Tableau de Bord Power BI Interactif**
- Rapports Power BI intégrés avec 4 pages d'analyses olympiques
- Navigation intuitive entre les pages
- Visualisations interactives en temps réel
- Filtres dynamiques par pays, discipline et athlète

### 🤖 **Prédictions ML des Médailles**
- Modèle de **Régression Linéaire Multiple** basé sur des données historiques réelles
- Facteurs prédictifs : Nombre d'athlètes, PIB/habitant, historique olympique, parité H/F
- Prédictions détaillées : Médailles d'Or, d'Argent et de Bronze
- Métriques de confiance : R² Score, précision, facteurs appliqués
- Analyse contextuelle automatique

### 📧 **Partage par Email**
- Envoi de captures d'écran du tableau de bord par email
- Configuration SMTP Gmail sécurisée
- Messages personnalisables
- Template HTML professionnel

### 📄 **Export PDF**
- Export haute qualité en format A4 paysage
- Capture complète du tableau de bord
- Téléchargement automatique
- Nom de fichier horodaté

### 🌗 **Mode Clair/Sombre**
- Basculement dynamique entre modes
- Support complet dans tous les composants
- Préférences sauvegardées
- Transitions fluides

### 🎨 **Interface Moderne**
- Design inspiré des couleurs olympiques
- Effets glass morphism
- Animations et transitions
- Responsive design (mobile, tablette, desktop)

## 🚀 Stack Technologique

### Frontend
- **Next.js 14.2.5** - Framework React avec App Router
- **React 18.3.1** - Bibliothèque UI
- **TypeScript 5.5.4** - Typage statique
- **Tailwind CSS 3.4.10** - Framework CSS utility-first

### Intelligence Artificielle
- **ml-regression** - Régression linéaire multiple
- **simple-statistics** - Calculs statistiques avancés
- Données d'entraînement : Top 10 pays Tokyo 2020

### Backend & APIs
- **Nodemailer 6.9.14** - Envoi d'emails via SMTP
- **Next.js API Routes** - Endpoints serverless

### Utilitaires
- **jsPDF 2.5.1** - Génération de PDF
- **html2canvas 1.4.1** - Capture d'écran HTML
- **Lucide React 0.436.0** - Icônes modernes
- **next-themes** - Gestion du mode clair/sombre

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Gmail (pour l'envoi d'emails)
- Rapport Power BI publié

### Étapes d'Installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/aminemanai2003/Jeux_Olympiques_Tokyo_2020.git
cd Jeux_Olympiques_Tokyo_2020
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Créer le fichier `.env.local`**
```env
# Configuration Gmail
GMAIL_USER=votre-email@gmail.com
GMAIL_APP_PASSWORD=votre-mot-de-passe-application

# Configuration Power BI
POWERBI_REPORT_ID=votre-report-id
POWERBI_CTID=votre-ctid
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

### Script de Déploiement Automatique

Pour Windows :
```bash
.\install-and-deploy.bat
```

Pour Mac/Linux :
```bash
chmod +x install-and-deploy.sh
./install-and-deploy.sh
```

## 🎯 Utilisation

### 1. Tableau de Bord Power BI
- Cliquez sur "Tableau de Bord Power BI" dans la navigation
- Explorez les 4 pages du rapport
- Utilisez les filtres interactifs
- Exportez en PDF ou envoyez par email

### 2. Prédictions ML
- Cliquez sur "Prédictions ML" 
- Entrez les informations du pays :
  - Nom du pays
  - Nombre d'athlètes (total, hommes, femmes)
  - PIB par habitant (en milliers $)
  - Médailles aux JO précédents
- Cliquez sur "Lancer la Prédiction"
- Consultez les résultats détaillés :
  - Prédiction des médailles (Or, Argent, Bronze)
  - Total de médailles estimé
  - Détails du modèle (algorithme, précision, R² score)
  - Facteurs appliqués (économique, historique, parité)
  - Analyse contextuelle

### 3. Mode Clair/Sombre
- Cliquez sur l'icône Soleil/Lune en haut à droite
- Le mode bascule automatiquement
- La préférence est sauvegardée

## 📁 Structure du Projet

```
Tokyo2020_Olympics_Website/
├── 📂 app/
│   ├── 📂 api/
│   │   ├── 📂 predict/
│   │   │   └── route.ts          # API prédiction ML
│   │   └── 📂 send-email/
│   │       └── route.ts          # API envoi email
│   ├── globals.css               # Styles globaux + dark mode
│   ├── layout.tsx                # Layout racine
│   └── page.tsx                  # Page principale
├── 📂 components/
│   ├── EmailDialog.tsx           # Modal envoi email
│   ├── ExportButtons.tsx         # Boutons PDF/Email
│   ├── MLPredictor.tsx           # Interface prédiction ML
│   ├── PowerBIEmbed.tsx          # Iframe Power BI
│   ├── ThemeProvider.tsx         # Provider dark mode
│   └── ThemeToggle.tsx           # Bouton toggle theme
├── 📂 public/
├── .env.local                    # Variables d'environnement
├── .gitignore
├── next.config.mjs
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Configuration Gmail SMTP
1. Activez l'authentification à 2 facteurs sur Gmail
2. Générez un mot de passe d'application :
   - Google Account → Security → 2-Step Verification → App passwords
3. Ajoutez les identifiants dans `.env.local`

### Configuration Power BI
1. Publiez votre rapport Power BI sur le service Power BI
2. Obtenez l'URL d'intégration :
   - Power BI Service → Fichier → Intégrer → Site web sécurisé
3. Extrayez le `reportId` et `ctid` de l'URL
4. Mettez à jour `.env.local`

### Configuration du Modèle ML
Le modèle utilise des données historiques réelles des 10 meilleurs pays de Tokyo 2020 :
- USA, Chine, Japon, Grande-Bretagne, ROC, Australie, Pays-Bas, France, Allemagne, Italie
- Variables : Nombre d'athlètes, PIB/habitant, médailles JO précédents
- Algorithme : Régression Linéaire Multiple (OLS)
- R² Score : ~0.87

## 🎨 Palette de Couleurs Olympiques

```css
/* Mode Clair */
--olympic-gold: #FFD700
--olympic-silver: #C0C0C0
--olympic-bronze: #CD7F32
--olympic-blue: #0085C7
--olympic-red: #DF0024

/* Mode Sombre */
--olympic-gold: #FFC700
--olympic-silver: #B0B0B0
--olympic-bronze: #BD6F22
--olympic-blue: #1E90FF
--olympic-red: #FF1744
```

## 📊 Modèle de Données

### Tables de Faits
- **FactMedals** : Nombre de médailles par pays (Or, Argent, Bronze)
- **FactParticipation** : Participation des athlètes par discipline (Hommes, Femmes, Total)

### Tables de Dimensions
- **DimCountry** : Informations des pays (Nom, NOC, Région)
- **DimDiscipline** : Disciplines sportives
- **DimDate** : Dimension temporelle

### Relations
- DimCountry[CountryKey] → FactMedals[CountryKey]
- DimDiscipline[DisciplineKey] → FactParticipation[DisciplineKey]
- DimDate[DateKey] → FactMedals[DateKey] / FactParticipation[DateKey]

## 🚀 Déploiement

### Déploiement sur Vercel (Recommandé)

1. **Créez un compte sur [Vercel](https://vercel.com)**

2. **Connectez votre dépôt GitHub**
   - New Project → Import Git Repository
   - Sélectionnez `Jeux_Olympiques_Tokyo_2020`

3. **Ajoutez les variables d'environnement**
   - Settings → Environment Variables
   - Ajoutez toutes les variables de `.env.local`

4. **Déployez**
   - Cliquez sur "Deploy"
   - Votre site sera accessible via `https://votre-projet.vercel.app`

### Déploiement sur Netlify

1. **Créez un compte sur [Netlify](https://netlify.com)**

2. **Connectez votre dépôt**
   - New site from Git → GitHub
   - Sélectionnez le dépôt

3. **Configurez le build**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Ajoutez les variables d'environnement**
   - Site settings → Build & deploy → Environment

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add: Amazing Feature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Changelog

### Version 2.0.0 (2024-10-19)
- ✨ Ajout du mode clair/sombre avec next-themes
- 🤖 Implémentation de la régression linéaire multiple (données réelles)
- 🌍 Traduction complète en français
- 🎨 Support dark mode dans tous les composants
- 🔧 Correction de l'envoi d'email (Nodemailer SMTP)
- 📄 Amélioration de l'export PDF
- 🎯 Nouveaux champs ML : Pays, PIB, Historique olympique
- 📊 Analyse contextuelle automatique des prédictions

### Version 1.0.0 (2024-10-18)
- 🎉 Version initiale
- 📊 Intégration Power BI
- 🤖 Prédicteur ML basique
- 📧 Envoi par email
- 📄 Export PDF

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

**Groupe INFO DECIS**

| Membre | GitHub | Email |
|--------|--------|-------|
| Amine Manai | [@aminemanai2003](https://github.com/aminemanai2003) | aminemanai456123@gmail.com |
| Douiri Eya | - | - |
| Eya Jmâa | - | - |
| Ines Chtioui | - | - |
| Maha Aloui | - | - |
| Mariem Fersi | - | - |

## 🙏 Remerciements

- **Données** : Jeux Olympiques de Tokyo 2020
- **Analytics** : Microsoft Power BI
- **Framework** : Next.js Team
- **Inspiration** : Comité International Olympique (CIO)
- **Établissement** : ESPRIT - École Supérieure Privée d'Ingénierie et de Technologies

---

<div align="center">

**Fait avec ❤️ par l'équipe INFO DECIS**

🏅 *Excellence Olympique · Innovation Technologique · Intelligence d'Affaires* 🏅

[⭐ Star ce projet](https://github.com/aminemanai2003/Jeux_Olympiques_Tokyo_2020) | [🐛 Signaler un bug](https://github.com/aminemanai2003/Jeux_Olympiques_Tokyo_2020/issues) | [💡 Demander une fonctionnalité](https://github.com/aminemanai2003/Jeux_Olympiques_Tokyo_2020/issues)

</div>
