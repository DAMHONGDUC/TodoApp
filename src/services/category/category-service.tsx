import {getAPI} from 'helper/network';

const endpoint = {
  allCategory: '/categorys'.trim(),
};

export const CategoryService = {
  getAllCategory: async () => {
    const res = await getAPI(endpoint.allCategory);

    return res?.data ?? [];
  },
};
