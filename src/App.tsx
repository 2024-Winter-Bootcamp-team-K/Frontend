import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayPage from "./pages/PlayPage";
import LoadingScenarioPage from "./pages/LoadingScenarioPage";
import InitChatPage from "./pages/InitChatPage";
import ChoosePage from "./pages/ChoosePage";
import FailPage from "./pages/FailPage";
import GiveUpPage from "./pages/GiveUpPage";
import SuccessPage from "./pages/SuccessPage";
import EndingPage from "./pages/EndingPage";
import EvidencePage from "./pages/EvidencePage";
import SuspectPage from "./pages/SuspectPage";
import StartPage from "./pages/StartPage";
import SignupBox from "./pages/SignupBox";
import ChattingPage from "./pages/ChattingPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/start" element={<StartPage />} />
        <Route path="/register" element={<SignupBox />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/loading" element={<LoadingScenarioPage />} />
        <Route path="/initchat" element={<InitChatPage />} />
        <Route path="/choose" element={<ChoosePage />} />
        <Route path="/fail" element={<FailPage />} />
        <Route path="/give-up" element={<GiveUpPage />} />
        <Route path="/Success" element={<SuccessPage />} />
        <Route path="/Ending" element={<EndingPage />} />
        <Route path="/loading" element={<LoadingScenarioPage />} />
        <Route path="/evidence" element={<EvidencePage />} />
        <Route path="/suspect" element={<SuspectPage />} />
        <Route path="/chat" element={<ChattingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
