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
import MainPage from "./pages/MainPage";
import MakeScenarioPage from "./pages/MakeScenarioPage";
import LoginBox from "./pages/LoginBox";
import { AudioProvider } from "./pages/MainAudioContext";
import PlayHistoryPage from "./pages/PlayHistoryPage";
import { UserProvider } from './hooks/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* 시작 페이지 */}
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<SignupBox />} />
          <Route path="/loginbox" element={<LoginBox />} />
          <Route path="/video" element={<VideoPage />} />

          {/* 메인 페이지 */}
          <Route path="/MainPage/:userId" element={ <AudioProvider> <MainPage /> </AudioProvider> } />
          <Route path="/history/:scenarioId" element={ <AudioProvider> <PlayHistoryPage /> </AudioProvider> } />
          <Route path="/MakeScenarioPage" element={ <AudioProvider> <MakeScenarioPage /> </AudioProvider> } />

          {/* 시나리오 진입 페이지 */}
          <Route path="/loading/:scenario_id" element={ <AudioProvider> <LoadingScenarioPage /> </AudioProvider> } />
          <Route path="/initchat/:scenario_id" element={<InitChatPage />} />
          
          {/* 플레이 페이지 */}
          <Route path="/play/:scenario_id" element={<PlayPage />} />
          <Route path="/evidence/:scenarioId" element={<EvidencePage />} />
          <Route path="/suspect/:scenarioId" element={<SuspectPage />} />
          <Route path="/chat/:suspect_id" element={<ChattingPage />} />
          <Route path="/choose/:suspectId" element={<ChoosePage />} />
          <Route path="/result/:scenarioId" element={<ResultPage />} />
          <Route path="/resultLoading/:suspectId" element={<ResultLoadingPage />} />
          <Route path="/Ending/:scenarioId" element={<EndingPage />} />





          
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
