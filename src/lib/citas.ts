export interface Cita {
  id: string
  nombre_paciente: string
  telefono: string
  correo: string
  genero: string
  edad: number | null
  fecha: string
  hora: string
  motivo: string
  doctor: string
  estado: string
  estado_display: string
}

export interface CitaInput {
  nombre_paciente: string
  telefono: string
  correo: string
  genero: string
  edad: number | null
  fecha: string
  hora: string
  motivo: string
  doctor: string
  estado: string
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api"

async function parseResponse(response: Response) {
  const data = await response.json()
  if (!response.ok) {
    const firstError = Object.values(data).flat().find(Boolean)
    throw new Error(typeof firstError === "string" ? firstError : "No fue posible guardar la cita.")
  }
  return data
}

export async function listarCitas(): Promise<Cita[]> {
  const response = await fetch(`${API_URL}/citas/`)
  return parseResponse(response)
}

export async function guardarCita(input: CitaInput, id?: string): Promise<Cita> {
  const response = await fetch(`${API_URL}/citas/${id ? `${id}/` : ""}`, {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  return parseResponse(response)
}

export async function cancelarCita(id: string): Promise<Cita> {
  const response = await fetch(`${API_URL}/citas/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: "cancelado" }),
  })
  return parseResponse(response)
}
