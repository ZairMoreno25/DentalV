import { Outlet } from "react-router-dom"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-sans">
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
