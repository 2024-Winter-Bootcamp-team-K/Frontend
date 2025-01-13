import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayPage from "./pages/PlayPage";
import LoadingScenarioPage from "./pages/LoadingScenarioPage";
import InitChatPage from "./pages/InitChatPage";
import ChoosePage from "./pages/ChoosePage";
import ResultPage from "./pages/ResultPage";
import ResultLoadingPage from "./pages/ResultLoadingPage";
import EndingPage from "./pages/EndingPage";
import EvidencePage from "./pages/EvidencePage";
import SuspectPage from "./pages/SuspectPage";
import VideoPage from "./pages/VideoPage";
import LogInPage from "./pages/LogInPage";
import SignupBox from "./pages/SignupBox";
import ChattingPage from "./pages/ChattingPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<SignupBox />} />
        <Route path="/video" element={<VideoPage />}  />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/loading" element={<LoadingScenarioPage />} />
        <Route path="/initchat" element={<InitChatPage />} />
        <Route path="/choose" element={<ChoosePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/resultLoading" element={<ResultLoadingPage />} />
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
