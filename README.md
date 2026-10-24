# TP Docker Compose — Architecture Web Multi-Services

Ce projet implémente une stack conteneurisée complète et sécurisée composée de 4 services orchestrés via **Docker Compose** :
- **Nginx** (Reverse Proxy / Point d'entrée unique)
- **Frontend** (Application Web React)
- **Backend** (API REST Node.js / Express)
- **Database** (Base de données PostgreSQL 15 avec volume persistant)

---

## 🏗️ Architecture Réseau et Sécurité

Afin de respecter le principe du moindre privilège et de réduire la surface d'attaque, les flux sont isolés sur deux réseaux virtuels distincts (`bridge`) :

Machine Hôte (Port 80)
│
▼
┌─────────┐
│  Nginx  │  (Réseau frontend-net & backend-net)
└────┬────┘
│
┌─────┴───────────────┐
▼                     ▼
┌──────────┐      ┌──────────┐
│ Frontend │      │ Backend  │  (Réseau backend-net uniquement)
└──────────┘      └────┬─────┘
│
▼
┌──────────┐
│    db    │  (PostgreSQL 15 + Volume pgdata)
└──────────┘

- **`frontend-net`** : Réseau dédié aux échanges web entre Nginx et le Frontend React.
- **`backend-net`** : Réseau privé unissant Nginx, le Backend Express et la base PostgreSQL.
- **Isolation de la BDD** : PostgreSQL (`db`) ne publie aucun port sur la machine hôte et n'est pas accessible depuis le Frontend.
- **Healthcheck** : Le service `backend` attend que PostgreSQL soit réellement prêt à accepter des connexions (`pg_isready`) avant de démarrer.

---

## 🚀 Démarrage Rapide

### Configuration initiale
Assurez-vous de disposer d'un fichier `.env` à la racine du projet contenant les variables d'environnement nécessaires :
Exemple :
env
POSTGRES_DB=appdb
POSTGRES_USER=admin
POSTGRES_PASSWORD=azerty

Lancer la stack
Exécutez la commande suivante à la racine pour compiler les images et lancer l'ensemble des conteneurs en arrière-plan :

docker compose up -d --build

🧪 Vérification et Tests
Frontend React : http://localhost/

API 1 (Route BDD) : http://localhost/api1

API 2 (Route Backend) : http://localhost/api2

📁 Structure du Projet
.
├── .dockerignore
├── .env
├── .gitignore
├── README.md
├── docker-compose.yml
├── back/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── front/
│   ├── .dockerignore
│   └── Dockerfile
└── nginx/
    ├── Dockerfile
    └── default.conf
