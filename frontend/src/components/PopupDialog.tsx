import { connectService } from "../services/connect.service";
import { useEffect } from "react";
import usePublicToken from "../hooks/usePublicToken";
interface ConnectValue {
    accessToken: string;
    grantId: string;
    requestId: string;
}
interface PopupDialogProps {
    open: boolean;
    link: string;
    onClose: () => void;
    onSuccess: (value: ConnectValue) => void;
}
export function PopupDialog({
    open,
    link,
    onClose,
    onSuccess,
}: PopupDialogProps) {
    const publicToken = usePublicToken(onClose);
    useEffect(() => {
        if (publicToken) {
            connectService.exchangeToken(publicToken).then((value) => {
                onSuccess(value);
                console.log(value);
            });
        }
    }, [publicToken]);
    return open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <iframe src={link} className="w-full h-full" />
        </div>
    ) : null;
}
