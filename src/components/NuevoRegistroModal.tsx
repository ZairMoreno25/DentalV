import { createPortal } from "react-dom";
import { X, Search, Phone, Mail, Calendar, History, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NuevoRegistroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NuevoRegistroModal({
  isOpen,
  onClose,
}: NuevoRegistroModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] animate-in fade-in duration-[800ms] ease-in-out"
        onClick={onClose}
      />

      {/* Modal Container - Liquidglass style with light purple/opaque touch */}
      <div className="relative w-[700px] max-w-[95vw] rounded-[24px] p-8 shadow-2xl bg-[#ebe8f3]/85 backdrop-blur-xl border border-white/60 z-10 animate-in fade-in zoom-in-90 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white/40 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-700">Registro Clínico</h2>
        </div>

        {/* Content Body */}
        <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          
          {/* 1. Nombre del Paciente */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">
              Nombre del Paciente
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                defaultValue="María Elena Vásquez"
                className="pl-9 bg-white/70 border-white/40 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-colors h-11 shadow-sm rounded-xl text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* 2. Info Container */}
          <div className="grid grid-cols-3 gap-4 bg-white/40 border border-white/50 rounded-xl p-4 shadow-sm">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Teléfono</label>
              <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                +52 55 1234 5678
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Email</label>
              <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                maria.v@email.com
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Edad</label>
              <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                34 años
              </div>
            </div>
          </div>

          {/* 3. Registro de Citas Realizadas */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-800">Registro de Citas Realizadas</h3>
            </div>
            
            <div className="bg-white/60 border border-white/50 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="text-slate-600 text-xs font-bold border-b border-white/50 bg-white/30">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Fecha</th>
                    <th className="px-4 py-3 font-semibold">Motivo</th>
                    <th className="px-4 py-3 font-semibold">Doctor</th>
                    <th className="px-4 py-3 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-white/40 last:border-0 hover:bg-white/40 transition-colors">
                    <td className="px-4 py-3 font-medium">12 Oct 2023</td>
                    <td className="px-4 py-3">Limpieza General</td>
                    <td className="px-4 py-3">Dr. Garcia</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        Completada
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/40 transition-colors">
                    <td className="px-4 py-3 font-medium">05 Sep 2023</td>
                    <td className="px-4 py-3">Evaluación Ortodoncia</td>
                    <td className="px-4 py-3">Dra. Ruiz</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        Completada
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Notas Clínicas Actuales */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Notas Clínicas Actuales</label>
            <textarea
              placeholder="Ingrese detalles de la consulta actual..."
              className="w-full p-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500 transition-colors rounded-xl text-sm text-slate-700 shadow-sm min-h-[100px] resize-none"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex justify-end items-center gap-3 mt-6 pt-5 border-t border-white/40">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-blue-300 text-blue-700 bg-blue-50/50 hover:bg-blue-100 hover:text-blue-800 font-semibold rounded-xl px-5 transition-colors"
          >
            Cancelar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm shadow-blue-200/50 px-6 rounded-xl transition-all active:scale-95 gap-2">
            <Save className="w-4 h-4" />
            Guardar Registro
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
