import http from "../utils/http";
export const connectService = {
    async createLink() {
        try {
            const response = await http.get('/connect');
            const link = response.data;
            return link;
        } catch (error) {
            console.error(error);
        }
    },
    async exchangeToken(publicToken: string) {
        try {
            await http.post('/exchange-token', {
                publicToken,
            });
        } catch (error) {
            console.error(error);
        }
    }
    ,
    async getTransaction() {
        try {
            const response = await http.get('/transaction');
            const transaction = response.data;
            return transaction;
        } catch (error) {
            console.error(error);
        }
    },
    async getAccessToken() {
        try {
            const response = await http.get('/access-token');
            const accessToken = response.data.accessToken;
            return accessToken;
        } catch (error) {
            console.error(error);
        }
    }
};
