import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChoosePage from "./pages/ChoosePage";
import FailPage from "./pages/FailPage";
import GiveUpPage from "./pages/GiveUpPage";
import SuccessPage from "./pages/SuccessPage";
import PlayPage from "./pages/PlayPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/choose" element={<ChoosePage />} />
        <Route path="/fail" element={<FailPage />} />
        <Route path="/give-up" element={<GiveUpPage />} />
        <Route path="/Success" element={<SuccessPage />} />
        <Route path="/play" element={<PlayPage />} />
      </Routes>
    </Router>
  );
};

export default App;
