
  

# Rukita Project

  

> This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) typescript template.


## Features

The main features of the **Rukita Project** include:

1.  **Starter kit**
	- [CNA](https://nextjs.org/  "create-next-app") (create-next-app)

2.  **UI Toolkit & Styling**
	- [Tailwindcss](https://tailwindcss.com/  "https://tailwindcss.com/"), Rapidly build modern websites without ever leaving your HTML.

3.  **Utilities and other tools**
	- [react-leaflet](https://react-leaflet.js.org/  "https://react-leaflet.js.org/"), React components for Leaflet maps
	- [React icons](https://react-icons.github.io/react-icons  "React Icons"), Icons collection with react components
	- [Swiper](https://swiperjs.com/  "swiperjs"), The Most Modern Mobile Touch Slider
	- [Axios](https://axios-http.com/  "Axios"),  Promise based HTTP client for the browser and node.js


## Requirements

This should be installed on your computer in order to get up and running:

-  **[Node.js](https://nodejs.org/en/)** Required node version is >= `12.10.*`
-  **[npm](https://www.npmjs.com/)** Version `6.10.*`


## Get Started

let's start using the React Starter project by following the steps below.

### installation & setup your project

1.  **Clone Repo** Make sure you have a **Rukita-project** clone repository.

	```bash
	git clone https://github.com/alaunal/rukita-project.git
	```
	
2. **Setup environment variables**
	> find the `.env-template` file in the root directory, then copy paste it at the same level and rename it as `.env.local`. or copy the script below and then adjust this in each variable.
	
	```bash
	NEXT_PUBLIC_X_RAPIDAPI_KEY=<RAPIDAPI_KEY>
	NEXT_PUBLIC_X_RAPIDAPI_HOST=<RAPIDAPI_HOST>
	NEXT_PUBLIC_X_RAPIDAPI_BASE_HOST=<RAPIDAPI_BASE_HOST>

	NEXT_PUBLIC_NOMINATIM_BASE_URL=https://nominatim.openstreetmap.org/search
	NEXT_PUBLIC_GOOGLE_API_KEY=<GOOGLE_API_KEY> -- optional
	```

3.  **Install dependencies**

	```bash
	cd rukita-project
	```
	```bash
	npm install
	```

4.  **Data source API**
	> https://rapidapi.com/tipsters/api/priceline-com-provider

### Serve or deploy Project
In the project directory, you can run:

#### Serve development
First, run the development server:

```bash
npm run dev
```

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

  

#### Deployment

  

```bash
npm install
```

```bash
npm run build
```

```bash
npm run start
```

  

> directory `.next` as root build bundle

  

See the section about [deployment](https://nextjs.org/docs/deployment) for more information.