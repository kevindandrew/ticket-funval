import z from "zod";
import { EstadoTickets } from "../../generated/prisma/enums";
export const createTicketSchema = z.object({
  titulo: z.string().trim().min(6, "el titulo debe tener almenos 6 caracteres"),
  descripcion: z.string().trim(),
  aula: z.string().trim(),
});

export const UpdateTicketSchema = z.object({
  estado: z.enum(EstadoTickets),
});
