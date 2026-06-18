import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "Completado" | "En Tratamiento" | "Firma Pendiente" | "Inactivo"
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    "Completado": "bg-teal-100 text-teal-700 hover:bg-teal-100/80",
    "En Tratamiento": "bg-blue-100 text-blue-700 hover:bg-blue-100/80",
    "Firma Pendiente": "bg-red-100 text-red-700 hover:bg-red-100/80",
    "Inactivo": "bg-slate-100 text-slate-600 hover:bg-slate-100/80",
  }

  return (
    <Badge variant="secondary" className={cn("rounded-full px-3 py-0.5 font-semibold shadow-none border-transparent", styles[status])}>
      {status}
    </Badge>
  )
}
