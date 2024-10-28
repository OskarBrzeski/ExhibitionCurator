# Exhibition Curator Project
[![Netlify Status](https://api.netlify.com/api/v1/badges/fe9c10e8-31cf-42d4-a36f-c95792fb3266/deploy-status)](https://app.netlify.com/sites/exhibitoncurator/deploys)

https://exhibitoncurator.netlify.app/

Exhibition Curator reaches out to the MET Museum and Cleveland Museum APIs to display artworks in an easy to understand manner.

You can also create your own artwork exhibitions by adding artworks into your collection and pressing the button at the bottom of the collection page.

Other people's exhibitions can be viewed either by entering the exhibition id inside the exhibiton page, or my using a direct link to the exhibition, such as:
https://exhibitoncurator.netlify.app/exhibition?id=1gj01OGb1ODKWNC3WMi9Wb5WWQva

## Run Locally

Clone and set up the repo
```bash
git clone https://github.com/OskarBrzeski/ExhibitionCurator.git
cd ExhibitionCurator
npm install
```

Build the server locally
```bash
npm run build
```
Vite will build the project into the `dist` folder. You can then choose how to deploy it. An easy way to deploy it locally is
```bash
npx http-server dist
```
You may be prompted to install `http-server`. Once you do so, the server will run at http://localhost:8080/

## Development

Run the server locally
```bash
npm run dev
```
The server will run at http://localhost:5173/