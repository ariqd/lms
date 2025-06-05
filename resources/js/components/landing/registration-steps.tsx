import { ClipboardList, Users, CreditCard, Check } from 'lucide-react';

const RegistrationSteps = () => {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Tata Cara Pendaftaran Peserta</h2>
                    <p className="text-lg text-gray-600">
                        Berikut adalah langkah-langkah untuk mendaftar sebagai peserta pelatihan Baitul Arqam atau Darul Arqam yang diselenggarakan oleh MPKSDI PWM.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-soft">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold mr-4">
                                    1
                                </div>
                                <ClipboardList size={24} className="text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Pendaftaran Awal</h3>
                            <p className="text-gray-600">
                                Peserta mengisi formulir pendaftaran online melalui Portal Kader dengan melengkapi data diri dan informasi yang dibutuhkan.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-soft">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold mr-4">
                                    2
                                </div>
                                <Users size={24} className="text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Verifikasi Keanggotaan</h3>
                            <p className="text-gray-600">
                                Panitia akan memverifikasi status keanggotaan Muhammadiyah dan kesesuaian peserta dengan persyaratan pelatihan.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-soft">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold mr-4">
                                    3
                                </div>
                                <CreditCard size={24} className="text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Pembayaran Biaya</h3>
                            <p className="text-gray-600">
                                Setelah verifikasi, peserta melakukan pembayaran biaya pelatihan melalui rekening resmi MPKSDI PWM dan mengupload bukti pembayaran.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white p-6 rounded-xl shadow-soft">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold mr-4">
                                    4
                                </div>
                                <Check size={24} className="text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Konfirmasi Keikutsertaan</h3>
                            <p className="text-gray-600">
                                Peserta akan menerima email konfirmasi yang berisi informasi detail pelatihan, jadwal, lokasi, dan persiapan yang diperlukan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationSteps;
