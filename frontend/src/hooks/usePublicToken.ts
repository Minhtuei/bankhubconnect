import { useEffect, useState } from 'react';

const usePublicToken = (onClose: () => void) => {
    const [publicToken, setPublicToken] = useState<string>("");

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (typeof event.data === "string") {
                const data = JSON.parse(event.data);
                if (data.data.publicToken) {
                    setPublicToken(data.data.publicToken);
                }
                if (!data.data.loading) {
                    onClose();
                }
            }
        };

        window.addEventListener("message", handleMessage);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [onClose]);

    return publicToken;
};

export default usePublicToken;