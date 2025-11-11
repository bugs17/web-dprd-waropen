import FormInputFraksi from "@/components/custom/client-component/form-input-fraksi";

export const generateMetadata = () => {
    return {
        title: 'Fraksi | DPRK WAROPEN',
    };
};

const FraksiList = async () => {

    return (
        <div className="bg-[#0a0a0a] min-h-screen p-6">
        <div className="w-full flex justify-between mb-6">
            <h4 className="text-white text-2xl font-semibold">Fraksi DPRK</h4>
        </div>

        <FormInputFraksi />

        </div>
    );
}

export default FraksiList