import { Account, Bank } from "../interfaces/connect";
export const InfoCard = ({
    account,
    bank,
}: {
    account: Account;
    bank: Bank;
}) => {
    const ColorBank = {
        agribank: "#ffd966",
        bidv_digi: "#59a892",
        vietcombank: "#008000",
        vietinbank: "#9fc5e8",
    };
    const color = ColorBank[bank.code as keyof typeof ColorBank] ?? "#59a892";
    return (
        <div
            className={`w-4/5 p-6 text-white bg-[${color}] rounded shadow-lg cursor-pointer select-none border-1`}
        >
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-4">
                    <img
                        src={bank.logo}
                        alt={bank.name}
                        className="w-12 h-12"
                    />
                    <h1 className="text-2xl font-bold">{bank.name}</h1>
                </div>
                <span className="text-[40px] font-bold leading-9">
                    {(account.accountNumber.match(/.{1,4}/g) || []).join(" ")}
                </span>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                        {account.accountName}
                    </span>
                    <span className="text-2xl font-bold">
                        Số dư: {account.balance.toLocaleString()}{" "}
                        {account.currency}
                    </span>
                </div>
            </div>
        </div>
    );
};
