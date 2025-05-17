<p align="center">
  <img 
    src="https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Cloud&fontSize=80&animation=fadeIn&desc=Cloud:%20A%20stylish%20weather%20app%20with%20live%20forecasts%20and%20dynamic%20backgrounds.&fontAlignY=35"
    alt="Cloud Weather Web App Banner"
    style="max-width: 100%; height: auto;"
  />
</p>

# Cloud 🌩️

[![Live Demo](https://img.shields.io/badge/demo-vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://cloud-liart-three.vercel.app/) 
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

A next-gen weather dashboard with real-time system monitoring, built with Next.js 14. Features AI-powered notifications, dynamic weather visualizations, and seamless Telegram integration for deployment alerts.

![Dashboard Preview](https://raw.githubusercontent.com/devarpanlohar/cloud/main/public/desktop_view.gif)

## ✨ Highlights

- **Smart Location Handling**
  - Instant geolocation detection
  - Crosshair button for current location
  - Case-insensitive search with auto-complete
  - Search history caching

- **Immersive Weather Experience**
  - Full-screen condition-matched videos
  - Live weather metric animations
  - 12-hour temperature graphs
  - 7-day forecast carousel

- **Proactive Monitoring**
  - Telegram alerts for:
    - Deployment success/failure
    - GitHub PRs/issues/forks
    - System health status
  - AI-generated contextual messages
  - Smart webhook management

## 🛠 Tech Stack

**Core Framework**  
Next.js 14 (App Router) | React 18 | Tailwind CSS

**APIs & Services**  
- Weather API | OpenStreetMap Nominatim  
- Telegram Bot API | GitHub Webhooks  
- Framer Motion | Lottie Animations  

**Infrastructure**  
Vercel Hosting | Edge Network Caching

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- [Weather API Key](https://www.weatherapi.com/)
- Telegram Bot Token ([@BotFather](https://t.me/BotFather))

### Quick Install

```bash
git clone https://github.com/devarpanlohar/cloud.git
cd cloud
npm install
cp .env.local.example .env.local
```

Configure your `.env.local`:
```ini
WEATHER_API_KEY=your_key_here
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
CACHE_TTL=3600  # 1 hour cache
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build && npm start
```

## 📊 System Architecture

```
cloud/
├── 📁 public/                   # Static assets served directly
│   ├── 📁 videos/               # Weather-condition video backgrounds
│   │   ├── sunny.mp4            # Clear sky animation
│   │   └── ...                  # Other weather condition videos
│
├── 📁 src/                      # Application source code
│   ├── 📁 app/                  # Next.js 14+ App Router
│   │   ├── 📁 api/              # API endpoints
│   │   │   ├── 📁 github-webhook/  # GitHub event webhook handler
│   │   │   │   └── route.js     # (λ) Process repo events → Telegram
│   │   │   ├── 📁 reverse_geocode/ # Location resolution endpoint
│   │   │   │   └── route.js     # (λ) Convert coords → human-readable
│   │   │   ├── 📁 vercel-deploy/   # Deployment webhook handler
│   │   │   │   └── route.js     # (λ) Deployment status notifications
│   │   │   └── 📁 weather/      # Weather data endpoint
│   │   │       └── route.js     # (λ) Fetch+transform weather API
│   │   │
│   │   ├── 📁 components/       # Reusable UI components
│   │   │   └── 📁 weather/      # Weather-specific components
│   │   │       ├── DataVisualizations.jsx  # Charts/graphs
│   │   │       └── MetricCards.jsx         # Weather metric tiles
│   │   │
│   │   ├── 📁 utils/            # Helper functions/modules
│   │   │   └── animations.js    # Framer Motion configs
│   │   │
│   │   ├── globals.css          # Tailwind/global styles
│   │   ├── layout.js            # Root layout component
│   │   └── page.js              # Main dashboard page
│   │
│   └── 📁 lottie/               # Weather condition animations
│       ├── sunny.json           # Sunny day Lottie
│       └── ...                  # Other weather animations
│
├── .env.local.example           # Env template
├── next.config.js               # Next.js config
├── package.json                 # Project manifest
├── README.md                    # Documentation
└── tailwind.config.js           # Tailwind CSS config

# KEY:
# 📁 = Directory
# (λ) = Serverless function endpoint
# → = Data transformation flow
```

## 🌐 Webhook Configuration

1. **GitHub Events**  
   `POST /api/github-webhook`
   - Handles: pushes, PRs, issues, forks
   - Security: HMAC validation

2. **Vercel Deployments**  
   `POST /api/vercel-deploy`
   - Tracks: build status, deployment URL
   - Features: Rollback alerts

## 📱 Feature Breakdown

| Component          | Technologies Used          | Key Features                               |
|--------------------|----------------------------|--------------------------------------------|
| Weather Dashboard  | Lottie, Framer Motion      | Real-time metrics, Animated transitions    |
| Notification System| Telegram Bot API, Webhooks | Context-aware alerts, AI-generated messages|
| Background System  | HTML5 Video, Canvas        | Condition-matched videos, Smooth blending |
| API Layer          | Next.js Route Handlers     | Caching, Rate limiting, Error handling     |

## 🤝 Contributing

We welcome contributions! Please see our [contribution guidelines](CONTRIBUTING.md) for:  
- Adding new notification platforms  
- Improving animation performance  
- Enhancing webhook security  

## 📜 License

MIT Licensed. See [LICENSE](LICENSE) for full text.

---

**Real-time Insights Never Looked This Good**  
Get live system updates directly in Telegram while enjoying smooth weather transitions and predictive forecasts.  

*Stay ahead of the storm with Cloud's proactive monitoring system!* ⚡

> 
> *Happy coding!* 🚀  
> — [@devarpanlohar](https://github.com/devarpanlohar)