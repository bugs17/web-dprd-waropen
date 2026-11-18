import FormInputFraksi from "@/components/custom/client-component/form-input-fraksi";

export const generateMetadata = () => {
    return {
        title: 'Fraksi | DPRK WAROPEN',
    };
};

const FraksiList = async () => {

    return (
        <div className="bg-app-bg min-h-screen p-6">
        <div className="w-full flex justify-between mb-6">
            <h4 className="text-app-ink text-2xl font-semibold">Fraksi DPRK</h4>
        </div>

        <FormInputFraksi />

        </div>
    );
}

export default FraksiList