import { z } from "zod";

export const productCreateSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug: латиница, цифры и дефис"),
  nameRu: z.string().min(1),
  nameEn: z.string().optional(),
  nameUz: z.string().optional(),
  descRu: z.string().optional(),
  descEn: z.string().optional(),
  descUz: z.string().optional(),
  priceFrom: z.string().optional(),
  unit: z.string().optional(),
  category: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  imageAltRu: z.string().optional(),
  imageAltEn: z.string().optional(),
  imageAltUz: z.string().optional(),
  isPopular: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  active: z.boolean().optional(),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
