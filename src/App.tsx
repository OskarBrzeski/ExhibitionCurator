import { Route, Routes } from "react-router-dom";

import CollectionPage from "./pages/CollectionPage.tsx";
import ExhibitionPage from "./pages/ExhibitionPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NavBar from "./components/NavBar.tsx";
import ObjectPage from "./pages/ObjectPage.tsx";
import ResultsPage from "./pages/ResultsPage.tsx";

function App() {
  return (
    <>
      <NavBar />
      <main className="max-w-lg mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/exhibition" element={<ExhibitionPage />} />
          <Route path="/object/:source/:objectId" element={<ObjectPage />} />
          <Route path="/objects/:source" element={<ResultsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
