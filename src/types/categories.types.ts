import { GetAllResponse } from '@/types/global.types';

export type GetAllCategoriesResponse = GetAllResponse<Category>;

export type Category = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};
