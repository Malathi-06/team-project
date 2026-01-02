import API from './api';

const createOrder = async (orderData) => {
    const response = await API.post('/orders', orderData);
    return response.data;
};

const getOrderById = async (id) => {
    const response = await API.get(`/orders/${id}`);
    return response.data;
};

const payOrder = async (orderId, paymentResult) => {
    const response = await API.put(`/orders/${orderId}/pay`, paymentResult);
    return response.data;
};

const getMyOrders = async () => {
    const response = await API.get('/orders/myorders');
    return response.data;
};

const orderService = {
    createOrder,
    getOrderById,
    payOrder,
    getMyOrders,
};

export default orderService;
