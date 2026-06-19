import { useRef } from "react";
import { createPortal } from "react-dom";
import { X, User, Calendar, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NuevaCitaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NuevaCitaModal({
  isOpen,
  onClose,
}: NuevaCitaModalProps) {
  if (!isOpen) return null;

  const minutesInputRef = useRef<HTMLInputElement>(null);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] animate-in fade-in duration-[800ms] ease-in-out"
        onClick={onClose}
      />

      {/* Modal Container - Liquidglass style with light purple/opaque touch */}
      <div className="relative w-[540px] max-w-[95vw] rounded-[24px] p-8 shadow-2xl bg-[#ebe8f3]/85 backdrop-blur-xl border border-white/60 z-10 animate-in fade-in zoom-in-90 slide-in-from-bottom-8 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white/40 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Nueva Cita</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Complete la información para agendar un nuevo paciente.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Nombre */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Escriba aqui"
                className="pl-9 bg-white/70 border-white/40 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-colors h-11 shadow-sm rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Teléfono */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type="tel"
                  maxLength={10}
                  placeholder="0000000000"
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  className="pl-9 bg-white/70 border-white/40 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-colors h-11 shadow-sm rounded-xl" 
                />
              </div>
            </div>

            {/* Correo electrónico */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="ejemplo@correo.com"
                  type="email"
                  className="pl-9 bg-white/70 border-white/40 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-colors h-11 shadow-sm rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Género */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Género</label>
              <select className="w-full h-11 px-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500 transition-colors rounded-xl text-sm text-slate-700 shadow-sm appearance-none">
                <option value="">Seleccione</option>
                <option value="m">Masculino</option>
                <option value="f">Femenino</option>
                <option value="o">Otro</option>
              </select>
            </div>

            {/* Edad */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Edad</label>
              <Input
                placeholder="00"
                type="number"
                min={0}
                max={100}
                onInput={(e) => {
                  const val = e.currentTarget.value;
                  if (Number(val) > 100) {
                    e.currentTarget.value = val.slice(0, -1);
                  }
                  if (Number(val) < 0) {
                    e.currentTarget.value = "0";
                  }
                }}
                className="bg-white/70 border-white/40 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-colors h-11 shadow-sm rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Fecha de la cita */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Fecha de la cita
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="dd/mm/aaaa"
                  type="date"
                  className="pl-9 bg-white/70 border-white/40 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-colors h-11 shadow-sm rounded-xl text-slate-700"
                />
              </div>
            </div>

            {/* Hora de la cita */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Hora de la cita
              </label>
              <div className="flex items-center gap-1.5 px-3 bg-white/70 border border-white/40 rounded-xl h-11 shadow-sm focus-within:ring-1 focus-within:ring-blue-500/30 focus-within:border-blue-500 transition-colors">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex items-center gap-1 text-slate-700 font-medium">
                  <input
                    type="text"
                    placeholder="12"
                    maxLength={2}
                    className="w-6 text-center bg-transparent border-none outline-none focus:ring-0 p-0 text-sm font-medium"
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val && Number(val) > 12) val = "12";
                      e.target.value = val;
                      if (val.length === 2) {
                        minutesInputRef.current?.focus();
                      }
                    }}
                    onBlur={(e) => {
                      let val = e.target.value;
                      if (!val) return;
                      if (Number(val) === 0) {
                        e.target.value = "12";
                      } else if (val.length === 1) {
                        e.target.value = "0" + val;
                      }
                    }}
                  />
                  <span className="text-slate-400">:</span>
                  <input
                    ref={minutesInputRef}
                    type="text"
                    placeholder="00"
                    maxLength={2}
                    className="w-6 text-center bg-transparent border-none outline-none focus:ring-0 p-0 text-sm font-medium"
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val && Number(val) > 59) val = "59";
                      e.target.value = val;
                    }}
                    onBlur={(e) => {
                      let val = e.target.value;
                      if (!val) return;
                      if (val.length === 1) {
                        e.target.value = "0" + val;
                      }
                    }}
                  />
                </div>
                <div className="w-[1px] h-5 bg-slate-300 mx-1" />
                <select className="bg-transparent border-none outline-none text-xs font-semibold text-slate-600 cursor-pointer pr-1 focus:ring-0">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Notas / Motivo de la cita
            </label>
            <textarea
              placeholder="Describa el motivo de la consulta o notas adicionales..."
              className="w-full p-3 bg-white/70 border border-white/40 focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500 transition-colors rounded-xl text-sm text-slate-700 shadow-sm min-h-[100px] resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end items-center gap-3 mt-8">
          <Button
            variant="ghost"
            onClick={onClose}
            className="hover:bg-slate-200/50 text-slate-700 font-semibold"
          >
            Cancelar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm shadow-blue-200/50 px-6 rounded-xl transition-all active:scale-95">
            Guardar Cita
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
