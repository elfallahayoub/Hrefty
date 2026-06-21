# Hrefty

Plateforme de mise en relation entre clients et artisans (techniciens). Les clients publient des demandes de service, les artisans soumettent des offres, et les deux parties communiquent en temps réel via un système de messagerie intégré.

---

## Stack technique

| Couche | Technologies |
|---|---|
| **Frontend** | React 19, Redux Toolkit, React Router DOM 7, Bootstrap 5, SASS, Axios, Pusher JS |
| **Backend** | Laravel 12, Laravel Sanctum, MySQL, Pusher PHP |
| **Auth** | Laravel Sanctum (tokens API) |
| **Temps réel** | Pusher (messagerie instantanée) |

---

## Fonctionnalités principales

- **3 rôles** : Client, Artisan, Admin — chacun avec son tableau de bord dédié
- **Demandes** : les clients créent des demandes de service avec photos, budget, localisation et date d'exécution
- **Offres** : les artisans soumettent des offres sur les demandes, les clients acceptent ou refusent
- **Messagerie** : conversations en temps réel entre client et artisan pour chaque offre
- **Évaluations** : les clients notent les artisans (1 à 5 étoiles) avec commentaires
- **Profils artisans** : spécialité, ville, note moyenne, statistiques
- **Panneau admin** : gestion des demandes, offres, techniciens et publicités

---

## Structure du projet

```
Hrefty/
├── back-end/          # API Laravel
│   ├── app/
│   │   ├── Models/    # User, Client, Artisan, Demande, Offre, Evaluation, Message...
│   │   └── Http/Controllers/
│   ├── database/migrations/
│   └── routes/api.php
│
└── hrefty/            # Frontend React
    └── src/
        ├── components/
        │   ├── homePage/
        │   ├── authPages/
        │   ├── clientDashboard/
        │   ├── artisanDashboard/
        │   ├── adminDashboard/
        │   └── chat/
        └── redux/Slices/
```

---

## Installation

### Prérequis

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL
- Compte Pusher (pour la messagerie temps réel)

---

### Backend (Laravel)

```bash
cd back-end

# Installer les dépendances
composer install

# Configurer l'environnement
cp .env.example .env
php artisan key:generate
```

Modifier `.env` :

```env
DB_DATABASE=hrefty
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=pusher
PUSHER_APP_ID=your_app_id
PUSHER_APP_KEY=your_app_key
PUSHER_APP_SECRET=your_app_secret
PUSHER_APP_CLUSTER=your_cluster
```

```bash
# Créer la base de données et exécuter les migrations
php artisan migrate

# Lancer le serveur
php artisan serve
```

L'API sera disponible sur `http://localhost:8000`.

---

### Frontend (React)

```bash
cd hrefty

# Installer les dépendances
npm install

# Lancer l'application
npm start
```

L'application sera disponible sur `http://localhost:3000`.

---

## Modèles de données

```
User ──┬── Client ──── Demande ──── Offre ──── Conversation ──── Message
       ├── Artisan ──── Offre          │
       └── Admin        └── Evaluation  └── Specialite
                                        └── Ads
```

| Modèle | Description |
|---|---|
| `User` | Authentification, rôle (admin / client / technicien) |
| `Client` | Profil client, liée à ses demandes et évaluations |
| `Artisan` | Profil artisan, spécialité, ville, statut |
| `Demande` | Demande de service (titre, budget, photo, statut) |
| `Offre` | Offre d'un artisan sur une demande |
| `Evaluation` | Note et commentaire d'un client sur un artisan |
| `Conversation` | Fil de discussion lié à une offre |
| `Message` | Message individuel entre client et artisan |
| `Specialite` | Catégorie de service (plomberie, électricité…) |
| `Ads` | Publicités gérées par l'admin |

---

## API — Endpoints principaux

```
POST   /api/register               Inscription
POST   /api/login                  Connexion
GET    /api/me                     Utilisateur connecté

GET    /api/demande                Liste des demandes
POST   /api/demande                Créer une demande
PUT    /api/demande/{id}           Modifier une demande

POST   /api/offre                  Soumettre une offre
PUT    /api/offre/{id}             Accepter / refuser une offre

GET    /api/artisan                Liste des artisans
GET    /api/artisan/{id}           Profil d'un artisan

POST   /api/evaluation             Évaluer un artisan
POST   /api/evaluation/moyenne     Note moyenne d'un artisan

GET    /api/conversations          Conversations de l'utilisateur
POST   /api/messages               Envoyer un message
```

---

## Auteur

**elfallahayoub** — [github.com/elfallahayoub](https://github.com/elfallahayoub)
