import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import "./App.css";
import Profile from "./profile/Profile";
import Header from "./header/Header";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <Suspense fallback={<div>loading.</div>}>
            <Header />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </RecoilRoot>
      </BrowserRouter>
    </>

  )
}