import type { Request, Response } from "express";
import { TicketModel } from "../models/ticket.model";
import { Rol } from "../../generated/prisma/enums";
import { json } from "node:stream/consumers";
import { EstadoTickets } from "../../generated/prisma/enums";
export const getTicket = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Tickets"]
    #swagger.summary = "ver a todos los tickets"
    #swagger.description= "Permite visualizar el listado de todos los tickets"
  */
  try {
    const ticket = await TicketModel.getAll();
    return res.status(200).json({ data: ticket });
  } catch (error) {
    console.log(error);
  }
};

export const postTicket = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Tickets"]
    #swagger.summary = "Un profesor o director crear un ticket"
    #swagger.description= "Permite la creacion de un ticket"
     #swagger.requestBody ={
      required:true,
      schema:{
        $ref:"#/components/schemas/ticketDTO"
      }
    }
  */
  try {
    const { titulo, descripcion, aula } = req.body;
    let creadorId = req.user?.id;
    if (!titulo || !descripcion || !aula || !creadorId) {
      return res.status(400).json({ message: "faltan campos obligatorios" });
    }
    const ticket = await TicketModel.crear({
      titulo,
      descripcion,
      aula,
      creadorId,
    });
    return res
      .status(201)
      .json({ message: "ticket creado con exito", data: ticket });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const UpdateTicket = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Tickets"]
    #swagger.summary = "Un tecnicio cambia el estado de  un ticket"
    #swagger.description= "Permite la actualizacion del estado de un ticket"
     #swagger.requestBody ={
      required:true,
      schema:{
        $ref:"#/components/schemas/tickertUpdateDTO"
      }
    }
  */
  try {
    const { estado } = req.body;
    const tecnicoId = req.user!.id;
    const id = Number(req.params.id);
    console.log(estado);
    console.log(tecnicoId);
    console.log(id);
    if (!estado || !tecnicoId || !id) {
      return res.status(400).json({ message: "faltan campos obligatorios" });
    }
    const ticket = await TicketModel.update({ estado, tecnicoId }, id);
    return res
      .status(200)
      .json({ message: "ticket actualizado con exito", data: ticket });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
