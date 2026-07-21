# AI SHIELD — Projet ARGUS

> Bouclier numérique citoyen développé par DIVLAB pour aider à vérifier les contenus, comprendre les risques et signaler les menaces numériques.

AI SHIELD, présenté sous le nom **Projet ARGUS**, est un écosystème camerounais de cybersécurité assistée par intelligence artificielle. Il associe une application mobile Flutter, une API FastAPI, des moteurs d’analyse spécialisés et des services de persistance pour offrir au citoyen un parcours simple : **voir, vérifier, comprendre et protéger**.

Le dépôt contient l’application mobile et son backend. La landing page de présentation est maintenue séparément dans `ai-shield-landing`.

## Sommaire

- [Pourquoi ARGUS ?](#pourquoi-argus-)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Organisation du dépôt](#organisation-du-dépôt)
- [Technologies](#technologies)
- [Démarrage rapide](#démarrage-rapide)
- [Configuration du frontend](#configuration-du-frontend)
- [Configuration du backend](#configuration-du-backend)
- [Référence API](#référence-api)
- [Pipeline d’analyse](#pipeline-danalyse)
- [Données et services externes](#données-et-services-externes)
- [Tests et qualité](#tests-et-qualité)
- [Préparer une démonstration](#préparer-une-démonstration)
- [Déploiement](#déploiement)
- [Limites du MVP](#limites-du-mvp)
- [Dépannage](#dépannage)
- [Confidentialité et licence](#confidentialité-et-licence)

## Pourquoi ARGUS ?

Dans la mythologie grecque, Argus Panoptès est un gardien aux cent yeux. Le projet reprend cette image de vigilance continue : plusieurs outils observent des signaux différents, confrontent leurs résultats et produisent une décision compréhensible.

ARGUS répond à quatre enjeux concrets :

- la circulation de faux documents et de contenus manipulés ;
- l’essor des deepfakes audio, image et vidéo ;
- les arnaques qui exploitent l’urgence, l’autorité ou les codes secrets ;
- le besoin de solutions adaptées au français, au camfranglais et aux usages camerounais.

Le système fournit des **indices et des niveaux de risque**. Il ne remplace pas une expertise judiciaire, administrative ou journalistique.

## Fonctionnalités

### 1. Authentification de documents

- import d’une image ou d’un document pris en charge ;
- OCR et extraction des informations visibles ;
- contrôle de structure, de signature et de cohérence ;
- analyse forensique, notamment ELA pour les images ;
- verdict accompagné d’explications et d’un rapport.

L’application mobile utilise le pipeline orchestré pour obtenir un dossier d’analyse complet. Une route directe de vérification documentaire reste également disponible dans l’API.

### 2. Filtre média intelligent

- analyse des images, vidéos et pistes audio ;
- extraction de caractéristiques visuelles ou acoustiques ;
- recherche de signaux de génération ou de modification par IA ;
- repli sur des règles locales lorsque les modèles lourds sont indisponibles.

### 3. Vérification de provenance

- calcul d’empreintes SHA-256 et perceptuelles ;
- extraction de métadonnées EXIF ou PDF ;
- détection et validation C2PA lorsqu’un validateur est installé ;
- comparaison avec l’index local des fichiers déjà observés ;
- recherche Web optionnelle avec Google Vision.

Une première observation dans l’index ne prouve pas qu’un contenu est authentique. Le rapport indique explicitement cette limite.

### 4. Sentinelle linguistique

- transcription audio avec Whisper lorsque le moteur est activé ;
- analyse de formulations associées à l’ingénierie sociale ;
- détection de pression, demande d’argent, vol d’identifiants, usurpation d’autorité et promesses irréalistes ;
- recommandations de prudence compréhensibles par le citoyen.

### 5. Signalement citoyen

- création d’un signalement avec motif et description ;
- ajout facultatif d’une pièce jointe ;
- conservation locale prioritaire pour éviter une perte en cas de panne cloud ;
- réplication Supabase facultative ;
- fil de sensibilisations et notifications mobiles.

### 6. Bouclier réseau

- analyse explicable d’une URL ou d’un domaine ;
- décision `ALLOW`, `WARN` ou `BLOCK` ;
- détection de domaines suspects, punycode, liens raccourcis, adresses IP directes et paramètres sensibles ;
- VPN local Android et tunnel SOCKS5 optionnel ;
- identifiants VPN anonymes provisionnés par installation lorsque le service serveur est activé.

### 7. Automatisation mobile

- réception de fichiers partagés depuis une autre application ;
- orientation automatique vers l’analyse adaptée ;
- mode bulle Android pour un accès rapide ;
- notifications locales et distantes ;
- écrans de réglages, abonnement et information.

## Architecture

```text
Utilisateur
   |
   v
Application Flutter (Android / iOS / Web)
   |  Dio, multipart, JSON
   v
API FastAPI /api/v1
   |
   +-- Analyse orchestrée
   |     +-- identification et extraction
   |     +-- classification documentaire
   |     +-- détection IA
   |     +-- provenance
   |     +-- analyse de fraude et de risque
   |
   +-- Services spécialisés
   |     +-- document, média, audio, réseau
   |     +-- signalement, notifications, VPN
   |
   +-- Persistance locale SQLite
   +-- Supabase optionnel
   +-- Qdrant optionnel
   +-- Fournisseurs IA externes optionnels
```

Principes de fonctionnement :

- l’application appelle une API centrale configurable ;
- les fichiers sont envoyés en multipart et les réponses utilisent JSON ;
- les traitements lourds sont exécutés hors de la boucle HTTP ;
- chaque étape d’inférence dispose d’un délai maximal et d’un mécanisme de repli ;
- le fichier brut n’est pas envoyé au LLM de risque : celui-ci reçoit un dossier de caractéristiques ;
- les rapports sont enregistrés localement avant une éventuelle réplication cloud.

## Organisation du dépôt

```text
AI-SHIELD-main/
├── ai_shield/                 Application Flutter
│   ├── lib/core/              API, modèles, défense et widgets communs
│   ├── lib/features/          Modules fonctionnels et écrans
│   ├── lib/services/          VPN et services transversaux
│   ├── android/               Intégration Android, VPN et partage
│   ├── ios/                   Projet iOS
│   └── test/                  Tests Flutter
├── backend/                   API et moteurs d’analyse
│   ├── app/routes/            Contrats HTTP FastAPI
│   ├── app/services/          Logique métier et orchestration
│   ├── app/extractors/        Extraction image, PDF, audio et vidéo
│   ├── app/classifiers/       Classification et détection
│   ├── app/inference/         Politique locale/API et fournisseurs
│   ├── app/database/          Modèles SQLAlchemy et SQLite
│   ├── deploy/vpn/            Déploiement du relais VPN optionnel
│   ├── tests/                 Tests backend
│   ├── Dockerfile
│   └── docker-compose.yml
├── BACKEND_GUIDE.md           Guide backend historique détaillé
└── AI_SHIELD_CYBER_DEFENSE_ARCHITECTURE.md
```

## Technologies

| Couche | Technologies principales |
|---|---|
| Mobile | Flutter, Dart, Provider, Dio |
| Android natif | Kotlin, `VpnService`, tunnel SOCKS5 natif |
| API | Python 3.11+, FastAPI, Pydantic, Uvicorn |
| Image et document | Pillow, OpenCV, Tesseract, PyMuPDF, pypdf |
| Audio et vidéo | FFmpeg, librosa, soundfile, Whisper |
| IA | PyTorch, Transformers, CLIP et adaptateurs spécialisés |
| Persistance | SQLite/SQLAlchemy, Supabase optionnel |
| Recherche vectorielle | Qdrant optionnel |
| Tests | pytest, Flutter Test |
| Conteneurs | Docker, Docker Compose |

## Démarrage rapide

### Prérequis

- Git ;
- Flutter compatible avec Dart `^3.10.8` ;
- Android Studio ou un appareil Android pour l’application ;
- Python 3.11 ou plus récent pour le backend ;
- FFmpeg et Tesseract OCR avec la langue française hors Docker ;
- Docker Desktop uniquement si le lancement conteneurisé est utilisé.

Les modèles locaux peuvent nécessiter plusieurs gigaoctets. Un GPU est facultatif ; le mode CPU et les mécanismes de repli restent disponibles.

### 1. Lancer le backend sous Windows

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

### 2. Lancer le backend sous Linux ou macOS

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

Vérifications utiles :

- API : `http://localhost:8080`
- état du service : `http://localhost:8080/health`
- état de l’inférence : `http://localhost:8080/health/inference`
- documentation interactive : `http://localhost:8080/docs`

### 3. Lancer l’application Flutter

```powershell
cd ai_shield
flutter pub get
flutter run --dart-define=API_BASE_URL=http://localhost:8080
```

Pour un téléphone physique, remplacez `localhost` par l’adresse IP locale de l’ordinateur qui exécute FastAPI :

```powershell
flutter run --dart-define=API_BASE_URL=http://192.168.1.20:8080
```

Le téléphone et l’ordinateur doivent être sur le même réseau, et le pare-feu doit autoriser le port 8080.

## Configuration du frontend

Les contrôles sont définis à la compilation avec `--dart-define`.

| Variable | Valeur par défaut | Rôle |
|---|---:|---|
| `API_BASE_URL` | `http://localhost:8080` | Adresse de l’API FastAPI |
| `USE_MOCK_API` | `false` | Utilise des réponses locales de démonstration |
| `SUBSCRIPTIONS_ENABLED` | `false` | Active le parcours réel d’abonnement |
| `GRANT_ALL_PREMIUM_FEATURES` | `true` | Débloque les fonctions Premium pour la démonstration |
| `SHOW_DEV_UNLOCKED_BADGES` | `true` | Affiche l’indication du mode débloqué |
| `REMOTE_SENSIBILISATIONS_ENABLED` | `true` | Charge les sensibilisations depuis l’API |
| `DEVICE_NOTIFICATIONS_ENABLED` | `true` | Active les notifications de l’appareil |
| `SUBSCRIPTION_TEST_PLAN` | `premium` | Plan de test : `auto`, `free` ou `premium` |

Exemple de démonstration totalement locale :

```powershell
flutter run --dart-define=USE_MOCK_API=true
```

Exemple connecté au backend avec accès Premium de démonstration :

```powershell
flutter run `
  --dart-define=API_BASE_URL=http://192.168.1.20:8080 `
  --dart-define=USE_MOCK_API=false `
  --dart-define=GRANT_ALL_PREMIUM_FEATURES=true
```

Les erreurs réseau sont traduites en messages utilisateur : connexion impossible, délai dépassé, erreur de certificat, refus métier ou indisponibilité temporaire.

## Configuration du backend

Le backend lit `backend/.env`. Commencez toujours par copier `.env.example`, puis adaptez uniquement les services nécessaires.

### Paramètres principaux

| Variable | Description |
|---|---|
| `PORT` | Port HTTP, 8080 par défaut |
| `ENV` | Environnement d’exécution |
| `CORS_ORIGINS` | Origines Web autorisées, séparées par des virgules |
| `MAX_UPLOAD_SIZE_MB` | Taille maximale d’un fichier |
| `DATABASE_URL` | Base SQLAlchemy, SQLite par défaut |
| `AI_EXECUTION_MODE` | `auto`, `local`, `api` ou `offline` |
| `AI_MODEL_INFERENCE_ENABLED` | Autorise les modèles locaux lourds |
| `AUDIO_TRANSCRIPTION_ENABLED` | Autorise la transcription Whisper |
| `RISK_LLM_ENABLED` | Autorise le LLM d’analyse du risque |

### Fournisseurs optionnels

| Service | Variables principales | Utilisation |
|---|---|---|
| Groq | `GROQ_API_KEY` | risque JSON et transcription de secours |
| Gemini | `GEMINI_API_KEY` | analyse structurée de secours |
| Cloudflare AI | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | transcription de secours |
| Google Vision | `GOOGLE_VISION_API_KEY` | recherche Web de provenance |
| Supabase | `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` | réplication, signalements et stockage |
| Qdrant | `QDRANT_HOST`, `QDRANT_PORT` | recherche vectorielle optionnelle |

Ne placez jamais de vraie clé dans Git. La clé Supabase de service reste exclusivement côté backend.

### Modes d’inférence

| Mode | Comportement |
|---|---|
| `auto` | choisit local ou API selon les ressources et clés disponibles |
| `local` | privilégie les modèles installés localement |
| `api` | privilégie les fournisseurs externes configurés |
| `offline` | désactive les appels externes et utilise les règles locales |

Les étapes indisponibles retournent un résultat prudent plutôt que de faire échouer tout le pipeline.

## Référence API

Toutes les routes métier utilisent le préfixe `/api/v1`.

| Méthode | Route | Fonction |
|---|---|---|
| `GET` | `/health` | état général de l’API |
| `GET` | `/health/inference` | mode et fournisseurs d’inférence disponibles |
| `POST` | `/api/v1/analysis/analyze` | analyse orchestrée d’un fichier |
| `GET` | `/api/v1/analysis/reports/{report_id}` | récupération d’un rapport enregistré |
| `POST` | `/api/v1/document/verify` | vérification directe d’une image documentaire |
| `POST` | `/api/v1/media/analyze` | analyse directe d’un média |
| `POST` | `/api/v1/provenance/check` | provenance d’une image ou d’un PDF |
| `POST` | `/api/v1/sentinel/audio` | transcription et analyse linguistique |
| `POST` | `/api/v1/network/analyze` | score et décision pour une URL |
| `POST` | `/api/v1/reports` | création d’un signalement citoyen |
| `POST` | `/api/v1/reports/attachment` | envoi d’une pièce jointe de signalement |
| `POST` | `/api/v1/report/submit` | ancien contrat de signalement compatible |
| `GET` | `/api/v1/report/verdicts` | liste des verdicts disponibles |
| `GET` | `/api/v1/notifications/mobile` | sensibilisations destinées au mobile |
| `POST` | `/api/v1/subscriptions` | création d’un essai Premium |
| `POST` | `/api/v1/vpn/provision` | identifiants VPN d’une installation |

Exemple d’analyse réseau :

```bash
curl -X POST http://localhost:8080/api/v1/network/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","source":"manual"}'
```

Exemple d’analyse de fichier :

```bash
curl -X POST http://localhost:8080/api/v1/analysis/analyze \
  -F "file=@exemple.png"
```

## Pipeline d’analyse

`POST /api/v1/analysis/analyze` exécute les étapes suivantes :

1. calcul de l’identité, du hash et de la signature binaire ;
2. détermination du type réel du média ;
3. extraction des caractéristiques adaptées au fichier ;
4. vérification structurelle ;
5. détection de génération ou modification par IA ;
6. collecte des indices de provenance ;
7. classification documentaire ;
8. transcription lorsque le contenu est audio et que le moteur est activé ;
9. recherche de signaux de fraude ;
10. fusion des résultats dans un dossier de risque explicable ;
11. sauvegarde locale du rapport et réplication cloud optionnelle.

Les traitements OCR, FFmpeg et Whisper sont isolés de la boucle HTTP. Des délais maximums empêchent un fichier problématique de bloquer durablement le serveur.

## Données et services externes

### Stockage local

SQLite conserve les analyses, rapports opérationnels, signalements et identifiants VPN hachés. Cette configuration est adaptée au développement et à une démonstration sur une seule machine.

### Supabase

Supabase est facultatif. Lorsqu’il est configuré :

- les rapports peuvent être répliqués dans le cloud ;
- les signalements peuvent être envoyés au centre de contrôle ;
- les pièces jointes utilisent un bucket privé ;
- les sensibilisations sont chargées depuis la base distante.

Si Supabase est indisponible, les fonctions essentielles conservent un chemin local. Les tâches de réplication sont suivies et terminées proprement à l’arrêt de FastAPI.

### Qdrant

Qdrant est prévu pour les recherches vectorielles et les extensions de provenance. Le MVP peut fonctionner sans lui pour les analyses qui utilisent les empreintes et règles locales.

## Tests et qualité

### Backend

```powershell
cd backend
python -m pytest -q
```

État vérifié : **24 tests réussis**. Ils couvrent notamment les routes, le pipeline, les mécanismes de repli, la provenance, Sentinel, le VPN et la correction OCR documentaire.

### Frontend

```powershell
cd ai_shield
flutter analyze
flutter test
```

État vérifié : le test Flutter passe. L’analyse statique ne contient aucune erreur bloquante ; les remarques restantes sont des recommandations de style.

### Contrôle manuel recommandé

- ouvrir les six missions depuis le centre de commande ;
- analyser une petite image, un PDF, un audio et une vidéo ;
- vérifier le comportement sans réseau ;
- envoyer un signalement avec et sans pièce jointe ;
- tester les notifications ;
- vérifier l’analyse d’URL ;
- tester le partage Android vers AI SHIELD.

## Préparer une démonstration

Pour une présentation devant un jury, le projet assume volontairement un accès simple :

- toutes les fonctions Premium peuvent être débloquées ;
- l’authentification publique peut rester désactivée ;
- SQLite et les mécanismes de repli suffisent sur une machine contrôlée ;
- le VPN distant peut rester désactivé ;
- le mode mock offre un secours si le réseau de la salle est instable.

Checklist avant la présentation :

- [ ] démarrer FastAPI et vérifier `/health` ;
- [ ] confirmer l’adresse IP du serveur dans `API_BASE_URL` ;
- [ ] connecter le téléphone et le serveur au même réseau ;
- [ ] préparer des fichiers courts et connus pour chaque module ;
- [ ] tester le mode réel puis le mode mock de secours ;
- [ ] ouvrir la landing page, l’ERP et la documentation ;
- [ ] désactiver le VPN si le relais SOCKS5 n’est pas déployé ;
- [ ] ne pas dépendre du téléchargement d’un modèle pendant la présentation.

## Déploiement

### Backend avec Docker Compose

```powershell
cd backend
Copy-Item .env.example .env
docker compose up --build
```

Le compose démarre l’API sur le port 8080 et Qdrant sur le port 6333. Pour conserver durablement SQLite en dehors d’une démonstration, ajoutez un volume de données ou utilisez PostgreSQL.

### Construction Android

```powershell
cd ai_shield
flutter build apk --release `
  --dart-define=API_BASE_URL=https://api.example.com `
  --dart-define=USE_MOCK_API=false
```

Pour une diffusion publique, remplacez la signature Android de développement par une clé release privée et utilisez exclusivement HTTPS.

### Production publique

Avant une ouverture Internet, prévoyez également :

- authentification et autorisation ;
- limitation globale des requêtes ;
- CORS restreint ;
- stockage persistant géré ;
- secrets dans un gestionnaire sécurisé ;
- proxy HTTPS et observabilité ;
- sauvegardes et politique de conservation ;
- validation juridique et politique de confidentialité.

Ces exigences ne bloquent pas une démonstration locale contrôlée.

## Limites du MVP

- les verdicts automatiques sont des aides à la décision, pas des preuves définitives ;
- certains modèles lourds ne sont chargés que si les ressources et poids sont disponibles ;
- les fournisseurs de recherche inversée et d’IA sont facultatifs ;
- la détection acoustique simple ne prouve pas l’identité d’un locuteur ;
- les métadonnées peuvent être absentes ou modifiées ;
- l’absence de C2PA n’est pas un signe de fraude ;
- le paiement réel des abonnements n’est pas encore intégré ;
- la configuration par défaut est optimisée pour le MVP et la présentation, pas pour une exposition publique.

## Dépannage

### Le téléphone ne joint pas l’API

- n’utilisez pas `localhost` sur un téléphone physique ;
- utilisez l’adresse IPv4 locale du PC ;
- vérifiez le Wi-Fi et le pare-feu ;
- lancez Uvicorn avec `--host 0.0.0.0`.

### Tesseract est introuvable

- sous Docker, utilisez l’image fournie ;
- sous Windows, installez Tesseract dans son emplacement standard ;
- sous Linux, installez `tesseract-ocr` et `tesseract-ocr-fra`.

### FFmpeg ne traite pas un média

- vérifiez que `ffmpeg` est présent dans le `PATH` ;
- utilisez un média court et un format courant ;
- consultez les journaux FastAPI pour connaître le format détecté.

### Un modèle IA ne se charge pas

- consultez `/health/inference` ;
- vérifiez la mémoire disponible et le cache des poids ;
- utilisez `AI_EXECUTION_MODE=offline` pour valider les mécanismes locaux ;
- configurez un fournisseur externe uniquement si nécessaire.

### Supabase est indisponible

- vérifiez `SUPABASE_URL` et la clé serveur ;
- appliquez `backend/supabase_schema.sql` au projet ;
- pour la démonstration, laissez Supabase vide et utilisez le stockage local.

## Confidentialité et licence

AI SHIELD / ARGUS est un projet propriétaire de **DIVLAB**. Le code, les modèles, l’architecture détaillée et les mécanismes de défense ne doivent pas être redistribués sans autorisation.

Lorsqu’un contenu sensible est analysé, appliquez les principes suivants : minimisation des données, consentement de l’utilisateur, durée de conservation limitée et accès réservé aux personnes autorisées.

## À propos de DIVLAB

DIVLAB est une initiative camerounaise d’innovation numérique. Le Projet ARGUS traduit sa volonté de développer des technologies responsables, accessibles et ancrées dans les réalités locales.

Site : [divlabs-tech.com](https://divlabs-tech.com)
