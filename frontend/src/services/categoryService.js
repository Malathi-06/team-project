import API from './api';

const getCategories = async () => {
    const response = await API.get('/categories');
    return response.data;
};

const categoryService = {
    getCategories,
};

export default categoryService;
