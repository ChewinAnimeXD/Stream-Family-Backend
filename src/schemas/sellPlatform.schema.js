import {z} from 'zod';

export const createSellPlatformSchema = z.object({
    
  name: z.string({
    required_error: 'El nombre es requerido',
  }),
  seller: z.string({
    required_error: 'El vendedor es requerido',
  }),
  sell: z.string({
    required_error: 'vendido o no'
  }),
  createDate: z.string().optional(),
  buyDate: z.string().optional(),

  price: z.number({
    required_error: 'El precio es requerido',
  }),
  type: z.string({
    required_error: 'El tipo es requerido (Completo, pantalla)',
  }),
  email: z.string({
    required_error: 'El correo es requerido',
  }).email('El correo debe ser válido'),
  password: z.string({
    required_error: 'La contraseña es requerida',
  }),
  screen: z.string({
    required_error: 'La contraseña es requerida',
  }),
  pin: z.string({
    required_error: 'La contraseña es requerida',
  }),
});