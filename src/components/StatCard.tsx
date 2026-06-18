import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subValue: string
  subValueType?: "success" | "neutral" | "danger" | "pill"
  icon: ReactNode
  iconBg: string
  iconColor: string
}

export default function StatCard({
  title,
  value,
  subValue,
  subValueType = "neutral",
  icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBg, iconColor)}>
            {icon}
          </div>
          <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase">{title}</h3>
        </div>
        
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-slate-900">{value}</span>
          
          {subValueType === "pill" && (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
              {subValue}
            </span>
          )}
          {subValueType === "neutral" && (
            <span className="text-sm font-medium text-slate-500">{subValue}</span>
          )}
          {subValueType === "danger" && (
            <span className="text-sm font-semibold text-red-600">{subValue}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
