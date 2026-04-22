import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, theme, App as AntApp } from "antd";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clientes from "./pages/Clients";
import RotaProtegida from "./components/RotaProtegida";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <AntApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route
              path="/clientes"
              element={
                <RotaProtegida>
                  <Clientes />
                </RotaProtegida>
              }
            />
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;