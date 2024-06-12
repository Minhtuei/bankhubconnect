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
            const response = await http.post('/exchange-token', {
                publicToken,
            });
            const accessToken = response.data;
            return accessToken;
        } catch (error) {
            console.error(error);
        }
    }
    ,
    async getTransaction(accessToken: string) {
        try {
            const response = await http.get('/transaction', {
                headers: {
                    Authorization: accessToken,
                },
            });
            const transaction = response.data;
            return transaction;
        } catch (error) {
            console.error(error);
        }
    }
};
