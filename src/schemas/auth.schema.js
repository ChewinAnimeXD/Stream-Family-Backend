import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido",
  }),
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  role: z
    .string({
      required_error: "El rol es requerido",
    })
    .refine((value) => ["vendedor", "admin"].includes(value), {
      message: "Rol no válido",
    }),

});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El usuario es requerido",
    })
    .email({
      message: "usuario invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe de tener minimo 6 caracteres",
    }),
});
