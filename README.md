<p align="center">
  <img 
    src="https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Cloud&fontSize=80&animation=fadeIn&desc=Cloud:%20A%20stylish%20weather%20app%20with%20live%20forecasts%20and%20dynamic%20backgrounds.&fontAlignY=35"
    alt="Cloud Weather Web App Banner"
    style="max-width: 100%; height: auto;"
  />
</p>

# Cloud

[Click here](https://cloud-liart-three.vercel.app/) to visit the live page.

A sophisticated weather web app with real-time notifications, built with Next.js. Features immersive weather forecasts and Telegram integration for deployment alerts and GitHub event tracking.

## Table of Contents

- [Cloud](#cloud)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Live Preview](#live-preview)
    - [Desktop View](#desktop-view)
    - [Mobile View](#mobile-view)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Customization](#customization)
  - [Contributing](#contributing)
  - [License](#license)

## Features

* **Real-time Notifications**: Telegram integration for deployment alerts and GitHub event tracking
* **Smart Webhooks**: Automatic notifications for pushes, issues, PRs, forks, and deployments
* **Search by Location**: Enter any city or address to fetch current weather and 7-day forecast
* **Geolocation**: Detect current location with one click for instant weather data
* **Dynamic Backgrounds**: Full-screen video backgrounds synced with weather conditions
* **AI-Powered Status**: JARVIS-style greetings and contextual system messages
* **Responsive Design**: Mobile-first layout with Tailwind CSS
* **Cache Management**: Smart cache busting and 1-hour API data revalidation

## **Live Preview**

🌩️ **Now with Real-time System Alerts** - Get Telegram notifications for all critical system events!

### **Desktop View**  
> ![Desktop Demo GIF](https://raw.githubusercontent.com/devarpanlohar/cloud/main/public/desktop_view.gif)  
*Now featuring deployment status updates and GitHub event tracking in the notification panel*

### **Mobile View**  
> ![Mobile Demo GIF](https://raw.githubusercontent.com/devarpanlohar/cloud/main/public/mobile_view.gif)  
*Instant Telegram alerts directly to your mobile device for all system events*

## Tech Stack

* **Framework**: Next.js (App Router, Client Components)
* **Notifications**: Telegram Bot API
* **Styling**: Tailwind CSS
* **APIs**: 
  - Weather API
  - OpenStreetMap Nominatim
  - GitHub Webhooks
* **Utilities**: Axios for HTTP requests

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* Telegram bot token (get from [@BotFather](https://t.me/BotFather))
* GitHub webhook configured for your repository

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/devarpanlohar/cloud.git
   cd cloud
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (see below)

4. Start development server:
   ```bash
   npm run dev
   ```

### Environment Variables

`.env.local` file requirements:
```bash
# Core Services
WEATHER_API_KEY=your_weather_service_key

# Telegram Integration
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Optional
CACHE_TTL=300  # Cache duration in seconds
```
Change the `.env.local.example` to `.env.local`

## Usage

1. **Weather Interface**:
   - Search locations or detect automatically
   - Clear data with one click
   - Watch background adapt to conditions

2. **Notification System**:
   - Receive Telegram alerts for:
     - Successful deployments
     - GitHub pushes/PRs/issues
     - Deployment status changes
     - Repository forks
   - Context-aware messages with:
     - Time-based greetings
     - System health updates
     - Interactive links

3. **Webhook Management**:
   - Configure GitHub and Vercel webhooks to:
     - POST to `/api/github-webhook` for repository events
     - POST to `/api/vercel-deploy` for deployment alerts

## Project Structure

```
cloud
└── public/
    ├── weather-backgrounds/   # Condition-based videos
    ├── weather-icons/         # Visual indicators
    ├── src/
    │   └── app/
    │       ├── api/
    │       │   ├── github-webhook/
    │       │   │   └── route.js
    │       │   ├── reverse_geocode/
    │       │   │   └── route.js
    │       │   ├── vercel-deploy/
    │       │   │   └── route.js
    │       │   └── weather_forecast_data/
    │       │       └── route.js
    │       ├── globals.css    # Tailwind and global styles
    │       ├── layout.js      # Global layout
    │       └── page.js        # Main weather interface
    ├── .env.local.example
    ├── next.config.js
    ├── tailwind.config.js
    ├── package.json
    └── README.md
```

## Customization

* **Notification Content**:
  - Modify `route.js` files in `/api/github-webhook` to:
    - Change message templates
    - Add new event handlers
    - Customize AI-style quotes in `getEllaQuote()`

* **Telegram Integration**:
  - Adjust parse_mode (HTML/Markdown)
  - Add inline buttons via `reply_markup`
  - Modify notification thresholds

* **Webhook Security**:
  - Add secret validation in route handlers
  - Implement request signature checking

## Contributing

Enhancements particularly welcome for:
- Additional notification platforms (Slack/Discord)
- Improved error handling for webhooks
- Localization support for weather alerts

Follow standard contribution guidelines:
1. Fork & create feature branch
2. Commit changes with descriptive messages
3. Test notification flows
4. Open PR with documentation updates

## License

[MIT License](LICENSE)

---

> **🚀 Enhanced with Real-time Monitoring**  
> The system now features proactive monitoring through Telegram:  
> - Immediate deployment status alerts  
> - GitHub event tracking  
> - System health notifications  
>  
> *Stay informed wherever you are!*  
> *Happy coding!* 🚀  
> — [@devarpanlohar](https://github.com/devarpanlohar)