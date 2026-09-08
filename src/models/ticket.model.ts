import { prisma } from "../config/prisma";
import { EstadoTickets } from "../../generated/prisma/enums";

export interface RegistrarTicket {
  titulo: string;
  descripcion: string;
  aula: string;
  creadorId: number;
}

export interface UpdateTicket {
  tecnicoId: number;
  estado: EstadoTickets;
}
export const TicketModel = {
  getAll: async () => {
    return await prisma.ticket.findMany();
  },
  crear: async (data: RegistrarTicket) => {
    return await prisma.ticket.create({
      data,
    });
  },
  update: async (data: UpdateTicket, id: number) => {
    return await prisma.ticket.update({
      where: {
        id,
      },
      data,
    });
  },
};
