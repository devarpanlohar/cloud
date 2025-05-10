<p align="center">
  <img 
    src="https://capsule-render.vercel.app/api?type=slice&height=300&color=gradient&text=Cloud&fontSize=80&animation=fadeIn&desc=Cloud:%20A%20stylish%20weather%20app%20with%20live%20forecasts%20and%20dynamic%20backgrounds.&fontAlignY=35"
    alt="Cloud Weather Web App Banner"
    style="max-width: 100%; height: auto;"
  />
</p>

# Cloud

[Click here to visit the live page.](https://cloud-liart-three.vercel.app/)

A sleek, responsive weather web app built with Next.js that delivers real-time weather forecasts and immersive background videos based on current conditions.

## Table of Contents

- [Cloud](#cloud)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [**Live Preview**](#live-preview)
    - [**Desktop View**](#desktop-view)
    - [**Mobile View**](#mobile-view)
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

* **Search by Location**: Enter any city or address to fetch current weather and a 7-day forecast.
* **Geolocation**: Detect your current location with one click for instant weather data.
* **Dynamic Backgrounds**: Enjoy immersive full-screen video backgrounds that change based on weather conditions (rain, snow, clear sky, clouds, etc.).
* **Responsive Design**: Mobile-first layout with Tailwind CSS ensures a great experience on any device.
* **Light/Dark Mode**: Automatic theme adjustments for readability in any lighting.
* **Cache Busting**: Prevent stale weather data with on-demand cache-busting query parameters.

## **Live Preview**  

🌦️ **A Fully Responsive Weather Web App** – Works seamlessly on **both desktop and mobile devices!**  

Check out the live previews below:  

### **Desktop View**  
> ![Desktop Demo GIF](https://raw.githubusercontent.com/devarpanlohar/cloud/main/public/desktop_view.gif)  
*Sleek, interactive interface optimized for larger screens with dynamic weather data visualization.*  

### **Mobile View**  
> ![Mobile Demo GIF](https://raw.githubusercontent.com/devarpanlohar/cloud/main/public/mobile_view.gif)  
*Clean, touch-friendly design with smooth animations, perfect for on-the-go weather updates.*

## Tech Stack

* **Framework**: Next.js (App Router, Client Components)
* **Styling**: Tailwind CSS
* **Data Fetching**: Fetch API for calls to custom Next.js API routes
* **Geocoding & Weather**: Custom `/api/reverse_geocode` and `/api/weather_forecast_data` routes

## Getting Started

### Prerequisites

* Node.js (v16 or higher)
* npm or Yarn or pnpm or Bun

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devarpanlohar/cloud.git
   cd cloud
   ```

2. Install dependencies:

   ```bash
   npm install
   # or yarn
   # or pnpm install
   # or bun install
   ```

3. Add environment variables:
   Create a `.env` file in the root directory and configure your API keys (see below).

4. Start the development server:

   ```bash
   npm run dev
   # or yarn dev
   # or pnpm dev
   # or bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Rename `.env.local.example` to `.env` and provide the following keys:

```bash
# Geocoding (reverse geocode) API key
GEOCODE_API_KEY=your_geocode_service_key

# Weather forecast API key
WEATHER_API_KEY=your_weather_service_key

# Optional: Override default cache duration (in seconds)
CACHE_TTL=300
```

## Usage

1. **Search**: Enter a city name (e.g., "New York") or address and click **Get Weather**.
2. **Detect Location**: Click the geolocation button to auto-detect coordinates and fetch weather.
3. **Clear**: Reset the form and clear existing data.
4. **Enjoy**: Watch the background video change to match current weather!

## Project Structure

```
├── public
│   ├── weather-backgrounds/   # Video clips mapped to weather conditions
│   └── weather-icons/         # PNG icons for conditions
├── src
│   ├── app
│   │   ├── page.jsx           # Main weather component (client)
│   │   └── layout.jsx         # Global layout and providers
│   ├── components             # Reusable UI components
│   ├── styles                 # Tailwind and global styles
│   └── pages
│       ├── api
│       │   ├── reverse_geocode.js
│       │   └── weather_forecast_data.js
├── .env
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## Customization

* **Adding New Backgrounds**: Drop your MP4 files into `public/weather-backgrounds` and update the `WEATHER_BACKGROUNDS` map in `page.jsx`.
* **Styling Tweaks**: Modify Tailwind classes or extend the config for custom themes.
* **Data Providers**: Swap out the API logic in `api/reverse_geocode.js` and `api/weather_forecast_data.js` to use different services.

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

*Make sure you have the same convention in your project.*

## License

[MIT License](LICENSE)

---

> **🌟 Thanks for visiting!**  
> If this project helped you or you'd like to contribute, feel free to:  
> - ⭐ **Star the repo** (if you found it useful)  
> - � **Report issues** (I welcome feedback!)  
> - 🛠️ **Submit PRs** (Let's build together)  
>  
> *Happy coding!* 🚀  
> — [@devarpanlohar](https://github.com/devarpanlohar)