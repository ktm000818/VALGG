import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserSearchAutoComplete from "./Components/UserSearchAutoComplete";
import MainPage from "./mainPage/MainPage";
import "./App.css";
import Profile from "./profile/Profile";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="header">
          <div>
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M4.781 6.375C4.515 6.044 4.067 5.916 3.669 6.057 3.268 6.197 3 6.575 3 7v18c0 
                  .232.081.457.228.636l14 17C17.418 42.866 17.701 43 18 43h14c.384 0 
                  .735-.221.901-.566.167-.347.12-.758-.121-1.059L4.781 6.375zM46.336 
                  7.059c-.396-.146-.842-.02-1.11.309l-18 22c-.245.299-.295.712-.13 
                  1.062C27.262 30.777 27.614 31 28 31h14c.304 0 .591-.138.781-.375l4-5C46.923 
                  25.447 47 25.228 47 25V8C47 7.577 46.734 7.2 46.336 7.059z"
              />
            </svg>
            VALORANT
          </div>
          <UserSearchAutoComplete />
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}