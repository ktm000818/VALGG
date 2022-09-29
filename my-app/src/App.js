import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import "./App.css";
import Profile from "./profile/Profile";
import Header from "./header/Header";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}