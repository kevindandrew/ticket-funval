import { prisma } from "../config/prisma";
import { Rol } from "../../generated/prisma/enums";

export interface RegistrarUsuario {
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
}

export const UsuarioModel = {
  getAll: async () => {
    return await prisma.usuario.findMany();
  },
  crear: async (data: RegistrarUsuario) => {
    return await prisma.usuario.create({
      data,
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        creadoEn: true,
      },
    });
  },
};
