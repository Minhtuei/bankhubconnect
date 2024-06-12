import { Transaction } from "../interfaces/connect";
import moment from "moment";
export function TransactionCard({ transaction }: { transaction: Transaction }) {
    return (
        <div className="w-4/5 p-4 text-black rounded shadow-lg cursor-pointer select-none bg-slate-300 border-1">
            <div className="flex flex-col gap-y-2">
                <div className="grid grid-cols-2 gap-x-2">
                    <span className="text-xl font-bold">Mã giao dịch:</span>
                    <span className="text-xl font-semibold">
                        {transaction.reference}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                    <span className="text-xl font-bold">
                        Thời gian giao dịch:
                    </span>
                    <span className="text-xl font-semibold">
                        {moment(transaction.transactionDateTime).format(
                            "DD/MM/YYYY HH:mm:ss"
                        )}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                    <span className="text-xl font-bold">Số tài khoản:</span>
                    <span className="text-xl font-semibold">
                        {transaction.accountNumber}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                    <span className="text-xl font-bold">Số tiền:</span>
                    <span className="text-xl font-semibold">
                        {transaction.amount.toLocaleString()} VND
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                    <span className="text-xl font-bold">Mô tả:</span>
                    <span className="text-xl font-semibold">
                        {transaction.description}
                    </span>
                </div>
            </div>
        </div>
    );
}
