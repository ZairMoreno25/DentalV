import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import Historiales from "./pages/Historiales"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/historiales" element={<Historiales />} />
          <Route path="/pacientes" element={<div className="p-8">Pacientes View</div>} />
          <Route path="/doctores" element={<div className="p-8">Doctores View</div>} />
          <Route path="/clinicas" element={<div className="p-8">Clínicas View</div>} />
          <Route path="/metricas" element={<div className="p-8">Métricas View</div>} />
          <Route path="/compras" element={<div className="p-8">Compras View</div>} />
          <Route path="/ajustes" element={<div className="p-8">Ajustes View</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
