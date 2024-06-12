import { connectService } from "./services/connect.service";
import { PopupDialog } from "./components/PopupDialog";
import { useEffect, useState } from "react";
import { InfoCard } from "./components/InfoCard";
import { TransactionCard } from "./components/TransactionCard";
import { CircleCheck } from "lucide-react";

import {
    Account,
    ConnectValue,
    UserInfo,
    Bank,
    Transaction,
} from "./interfaces/connect";
function App() {
    const [link, setLink] = useState<string>("");
    const [connectValue, setConnectValue] = useState<ConnectValue | null>(null);
    const [transaction, setTransaction] = useState<UserInfo | null>(null);
    const [bank, setBank] = useState<Bank>({ name: "", logo: "" });
    const [accessToken, setAccessToken] = useState<string>("");
    const handleConnectBank = async () => {
        const link = await connectService.createLink();
        setLink(link);
        setConnectValue(null);
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
    useEffect(() => {
        if (transaction) {
            setBank({
                name: transaction.fiService.name,
                logo: transaction.fiService.logo,
            });
        }
    }, [transaction]);

    return (
        <div className="flex items-center justify-center p-10">
            <div className="flex flex-col gap-y-3">
                <h1 className="text-4xl font-bold">Liên kết ngân hàng</h1>
                <button
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={handleConnectBank}
                >
                    Liên kết
                </button>
                <PopupDialog
                    open={!!link}
                    link={link}
                    onClose={() => setLink("")}
                    onSuccess={(connectValue: ConnectValue) =>
                        setConnectValue(connectValue)
                    }
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
                        <h1 className="text-4xl font-bold">
                            Tra cứu Access Token
                        </h1>
                        <button
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            onClick={handleGetAccessToken}
                        >
                            Tra cứu
                        </button>
                        {accessToken && (
                            <pre className="max-w-[1024px] overflow-auto mx-auto p-2">
                                {accessToken}
                            </pre>
                        )}
                        <h1 className="text-4xl font-bold">
                            Tra cứu thông tin
                        </h1>
                        <button
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            onClick={handleTransaction}
                        >
                            Tra cứu
                        </button>
                    </>
                )}
                {transaction && (
                    // <pre className="max-w-[800px] overflow-auto">
                    //     {JSON.stringify(transaction, null, 2)}
                    // </pre>
                    <>
                        <span className="text-4xl font-bold">
                            Thông tin tài khoản
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
                        <span className="text-4xl font-bold">
                            Lịch sử giao dịch
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
                )}
            </div>
        </div>
    );
}

export default App;
