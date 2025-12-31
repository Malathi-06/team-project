import API from './api';

// Get all products
const getProducts = async (params) => {
    const response = await API.get('/products', { params });
    return response.data;
};

// Get product by ID
const getProductById = async (id) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
};

// Create product
const createProduct = async (productData) => {
    const response = await API.post('/products', productData);
    return response.data;
};

// Update product
const updateProduct = async (id, productData) => {
    const response = await API.put(`/products/${id}`, productData);
    return response.data;
};

// Delete product
const deleteProduct = async (id) => {
    const response = await API.delete(`/products/${id}`);
    return response.data;
};

const productService = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};

export default productService;
