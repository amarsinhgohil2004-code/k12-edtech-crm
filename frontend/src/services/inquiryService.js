import api from './api';

const submitInquiry = async (inquiryData) => {
    const response = await api.post('/inquiries', inquiryData);
    return response.data;
};

const getAllInquiries = async (filters = {}, token) => {
    const response = await api.get('/inquiries', {
        params: filters,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

const updateInquiryStatus = async (id, status, token) => {
    const response = await api.patch(
        `/inquiries/${id}/status`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export {
    submitInquiry,
    getAllInquiries,
    updateInquiryStatus,
};