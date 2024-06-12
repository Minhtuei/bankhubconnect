import { ConnectPage } from "./components/ConnectPage";
import bankhub from "./assets/bankhub.png";
function App() {
    return (
        <div className="flex items-center justify-center p-10 text-white bg-[#333]">
            <div className="flex items-start">
                <div className="flex flex-col p-2 mt-8 gap-y-8">
                    <h1 className="text-4xl font-bold">
                        Quản lý nhiều ngân hàng một chỗ với bankHub
                    </h1>
                    <ConnectPage />
                </div>

                <img
                    src={bankhub}
                    alt="BankHub"
                    className="sticky top-0 right-0 p-4"
                />
            </div>
        </div>
    );
}

export default App;
