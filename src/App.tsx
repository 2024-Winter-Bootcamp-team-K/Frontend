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
import MainPage from "./pages/MainPage"; // 메인 페이지
import MakeScenarioPage from "./pages/MakeScenarioPage"; // 시나리오 생성 페이지
import NextPage from "./pages/NextPage";
import NextPage2 from "./pages/NextPage2";
import LoginBox from "./pages/LoginBox";
import { AudioProvider } from "./pages/MainAudioContext";
import PlayHistoryPage from "./pages/PlayHistoryPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<SignupBox />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/initchat" element={<InitChatPage />} />
        <Route path="/choose" element={<ChoosePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/resultLoading" element={<ResultLoadingPage />} />
        <Route path="/Ending" element={<EndingPage />} />
        <Route path="/evidence" element={<EvidencePage />} />
        <Route path="/suspect" element={<SuspectPage />} />
        <Route path="/chat" element={<ChattingPage />} />
        <Route path="/NextPage" element={<NextPage />} />
        <Route path="/NextPage2" element={<NextPage2 />} />
        <Route path="/loginbox" element={<LoginBox />} />
        <Route
          path="/MainPage"
          element={
            <AudioProvider>
              <MainPage />
            </AudioProvider>
          }
        />
        <Route
          path="/history"
          element={
            <AudioProvider>
              <PlayHistoryPage />
            </AudioProvider>
          }
        />
        <Route
          path="/MakeScenarioPage"
          element={
            <AudioProvider>
              <MakeScenarioPage />
            </AudioProvider>
          }
        />
        <Route
          path="/loading"
          element={
            <AudioProvider>
              <LoadingScenarioPage />
            </AudioProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
