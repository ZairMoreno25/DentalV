import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import Historiales from "./pages/Historiales"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="historiales" element={<Historiales />} />
          <Route path="pacientes" element={<div className="p-8">Pacientes View</div>} />
          <Route path="doctores" element={<div className="p-8">Doctores View</div>} />
          <Route path="clinicas" element={<div className="p-8">Clínicas View</div>} />
          <Route path="ajustes" element={<div className="p-8">Ajustes View</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
