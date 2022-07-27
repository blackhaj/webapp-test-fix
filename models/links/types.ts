import type { Tag } from '@prisma/client';

export type NewTag = {
  id?: Tag['id'];
  name?: Tag['name'];
};
