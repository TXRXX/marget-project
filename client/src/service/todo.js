import axios from 'axios';

export async function getUser() {
    const userResponse = await axios.get('/auth/me');
    // const { _id: userId } = userResponse.data;
    return { userResponse: userResponse.data };
}

export async function createNewShop(name, description, contact, categories, imageUrl, userId) {
    const response = await axios.post('/shop/create', {
        name,
        description,
        contact,
        categories,
        imageUrl,
        userId
    });
    return response.data;
}

export async function addShopPicture() {
    const response = await axios.post('/api/upload');
    return response.data;
}

export async function getUserShops(userId) {
    const response = await axios.get(`/shop/user/${userId}`);
    return response.data;
}

export async function getAvailableShops() {
    const response = await axios.get('/shop/approved');
    return response.data;
}

export async function getAllShopsByAdmin() {
    const response = await axios.get('/shop/admin/all');
    return response.data;
}

export async function adminApproveShop(shopId) {
    const response = await axios.put(`/shop/update/${shopId}`, {
        isApproved: true,
        status: 'Approved',
    });
    return response.data;
}

export async function adminUnapproveShop(shopId) {
    const response = await axios.put(`/shop/update/${shopId}`, {
        isApproved: true,
        status: 'Unapproved',
    });
    return response.data;
}

export async function deleteShop(shopId) {
    const response = await axios.delete(`/shop/delete/${shopId}`);
    return response.data;
}

export async function uploadImage(base64EncodedImage) {
    const response = await axios.post('/api/upload', {
        data: base64EncodedImage
    });
    return response.data;
}
