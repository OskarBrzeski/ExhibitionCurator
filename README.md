# Exhibition Curator Project
[![Netlify Status](https://api.netlify.com/api/v1/badges/fe9c10e8-31cf-42d4-a36f-c95792fb3266/deploy-status)](https://app.netlify.com/sites/exhibitoncurator/deploys)

https://exhibitoncurator.netlify.app/

Exhibition Curator reaches out to the MET Museum API to display artworks in an easy to understand manner.

## Development

Clone and set up the repo
```bash
git clone https://github.com/OskarBrzeski/ExhibitionCurator.git
cd ExhibitionCurator
npm install
```

Run the server locally
```bash
npm run dev
```
The server will run at http://localhost:5173/

Build the server locally
```bash
npm run build && cd dist && npx http-server && cd ..
```
You can then choose how to deploy it. An easy way to deploy it locally is
```bash
cd dist && npx http-server && cd ..
```
You may be prompted to install `http-server`. Once you do so, the server will run at http://localhost:8080/
