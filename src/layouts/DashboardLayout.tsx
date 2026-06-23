import { Outlet, Navigate } from "react-router-dom"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"

export default function DashboardLayout() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen bg-slate-50/50 dark:bg-[#15171C] overflow-hidden font-sans transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
