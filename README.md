# Autotori Frontend

React + Vite frontend for the car aggregator platform.

## Features

- 🔍 Search cars across multiple sources (Saka, Autokeskus, Kamux)
- 🎯 Advanced filtering (price, year, mileage, fuel, transmission, location)
- 📊 Multiple sort options
- 📱 Responsive design
- ⚡ Fast Vite dev server with HMR

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:3001`

### Installation

```powershell
cd k:\wasal_tech\frontend
npm install
```

### Development

```powershell
npm run dev
```

Opens at `http://localhost:5173`

### Build for Production

```powershell
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx      # Search input
│   │   ├── Filters.jsx        # Filter controls
│   │   ├── CarGrid.jsx        # Car listing grid
│   │   └── Pagination.jsx     # Page navigation
│   ├── App.jsx                # Main app component
│   ├── api.js                 # Backend API calls
│   ├── main.jsx               # React entry point
│   └── index.css              # Tailwind styles
├── index.html
├── vite.config.js             # Vite config with proxy
├── tailwind.config.js
└── package.json
```

## API Integration

The frontend proxies API calls to the backend:
- `/api/search` → search cars with filters
- `/api/sources` → list available sources

Configured in `vite.config.js`:
```js
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true
  }
}
```

## Technologies

- **React 18** - UI library
- **Vite 5** - Build tool & dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Native Fetch API** - HTTP requests

## Available Filters

- **Source**: All, Saka, Autokeskus, Kamux
- **Sort**: Relevance, Price, Year, Mileage
- **Price Range**: Min/Max in EUR
- **Year Range**: Min/Max year
- **Mileage Range**: Min/Max km
- **Fuel Type**: Diesel, Petrol, Electric, Hybrid
- **Transmission**: Automatic, Manual

## Environment

Default ports:
- Frontend: `5173`
- Backend API: `3001` (proxied via Vite)

To change backend URL, edit `vite.config.js`.
