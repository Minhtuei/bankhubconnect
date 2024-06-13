import { connectService } from "../services/connect.service";
import { PopupDialog } from "./PopupDialog";
import { useEffect, useState } from "react";
import { InfoCard } from "./InfoCard";
import { TransactionCard } from "./TransactionCard";
import { CircleCheck } from "lucide-react";

import { Account, UserInfo, Bank, Transaction } from "../interfaces/connect";
export function ConnectPage() {
    const [link, setLink] = useState<string>("");
    const [connectValue, setConnectValue] = useState<boolean>(false);
    const [transaction, setTransaction] = useState<UserInfo | null>(null);
    const [bank, setBank] = useState<Bank>({ name: "", logo: "", code: "" });
    const [accessToken, setAccessToken] = useState<string>("");
    const handleConnectBank = async () => {
        const link = await connectService.createLink();
        setLink(link);
        setConnectValue(false);
        setTransaction(null);
    };
    const handleTransaction = async () => {
        if (connectValue) {
            const transaction = await connectService.getTransaction();
            setTransaction(transaction);
        }
    };
    const handleGetAccessToken = async () => {
        const accessToken = await connectService.getAccessToken();

        setAccessToken(accessToken);
    };
    // const handleCreateQRCode = async () => {
    //     const response = await connectService.createQRCode();
    //     console.log(response);
    // };
    useEffect(() => {
        if (transaction) {
            setBank({
                name: transaction.fiService.name,
                logo: transaction.fiService.logo,
                code: transaction.fiService.code,
            });
        }
    }, [transaction]);

    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-4">
                <h1 className="text-3xl font-bold">Liên kết ngân hàng:</h1>
                <button
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={handleConnectBank}
                >
                    Liên kết
                </button>
            </div>
            <PopupDialog
                open={!!link}
                link={link}
                onClose={() => setLink("")}
                onSuccess={setConnectValue}
            />
            {connectValue && (
                <>
                    <div className="flex flex-col items-center gap-y-2">
                        <CircleCheck
                            size={128}
                            color="#00ff62"
                            strokeWidth={2.25}
                        />
                        <span className="text-2xl font-bold">
                            Liên kết thành công
                        </span>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <h1 className="text-3xl font-bold">
                            Tra cứu Access Token:
                        </h1>
                        <button
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            onClick={handleGetAccessToken}
                        >
                            Tra cứu
                        </button>
                    </div>
                    {accessToken && (
                        <pre className="max-w-[600px] overflow-auto mx-auto p-2">
                            {accessToken}
                        </pre>
                    )}
                    {/* <div className="flex items-center gap-x-4">
                        <h1 className="text-3xl font-bold">Tạo mã QR:</h1>
                        <button
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            onClick={handleCreateQRCode}
                        >
                            Tạo mã
                        </button>
                    </div> */}
                </>
            )}
            {transaction ? (
                // <pre className="max-w-[800px] overflow-auto">
                //     {JSON.stringify(transaction, null, 2)}
                // </pre>
                <>
                    <span className="text-3xl font-bold">
                        Thông tin tài khoản:
                    </span>

                    <div className="flex items-center justify-center">
                        {transaction.accounts.map((account: Account) => (
                            <InfoCard
                                key={account.accountNumber}
                                account={account}
                                bank={bank}
                            />
                        ))}
                    </div>
                    <span className="text-3xl font-bold">
                        Lịch sử giao dịch:
                    </span>
                    <div className="flex flex-col items-center justify-center gap-y-4">
                        {transaction.transactions.map(
                            (transaction: Transaction) => (
                                <TransactionCard
                                    key={transaction.reference}
                                    transaction={transaction}
                                />
                            )
                        )}
                    </div>
                </>
            ) : (
                <div className="flex items-center gap-x-4">
                    <h1 className="text-3xl font-bold">Tra cứu thông tin:</h1>
                    <button
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        onClick={handleTransaction}
                        disabled={!connectValue}
                    >
                        Tra cứu
                    </button>
                </div>
            )}
        </div>
    );
}
