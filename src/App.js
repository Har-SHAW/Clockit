import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login_page";
import Dashboard from "./dashboard";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<LoginPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="*" element={<div>404 NOT FOUND</div>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
