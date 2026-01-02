import API from './api';

// Get all products
const getProducts = async (params) => {
    const response = await API.get('/products', { params });
    return response.data;
};

// Get product by ID
const getProductById = async (id) => {
    const response = await API.get(`/products/${id}`);
    const product = response.data;

    // Normalize image for frontend forms
    if (product && product.images && product.images.length > 0) {
        product.image = product.images[0];
    }

    return product;
};

// Create product
const createProduct = async (productData) => {
    // If frontend sends 'image' but backend expects 'images' array
    const data = { ...productData };
    if (data.image && !data.images) {
        data.images = [data.image];
        delete data.image;
    }

    const response = await API.post('/products', data);
    return response.data;
};

// Update product
const updateProduct = async (id, productData) => {
    // If frontend sends 'image' but backend expects 'images' array
    const data = { ...productData };
    if (data.image && !data.images) {
        data.images = [data.image];
        delete data.image;
    }

    const response = await API.put(`/products/${id}`, data);
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
