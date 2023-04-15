import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<LoginPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="*" element={<div>404 NOT FOUND</div>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
