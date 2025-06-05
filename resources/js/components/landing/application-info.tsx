import { FileText, Upload, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

const ApplicationInfo = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container px-4 mx-auto md:px-6">
                <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                    <div className="order-2 lg:order-1">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">Formulir Pengajuan Pelatihan</h2>
                        <p className="mb-6 text-lg text-gray-600">
                            Pimpinan Daerah Muhammadiyah (PDM) dan Amal Usaha Muhammadiyah (AUM) dapat mengajukan penyelenggaraan pelatihan dengan melengkapi formulir dan dokumen pendukung.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <FileText size={24} className="text-primary-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Surat Resmi</h3>
                                    <p className="mt-1 text-gray-600">
                                        Surat permohonan resmi dari PDM/AUM kepada MPKSDI PWM
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Upload size={24} className="text-primary-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Proposal Kegiatan</h3>
                                    <p className="mt-1 text-gray-600">
                                        Proposal yang berisi rencana kegiatan, peserta, dan rencana anggaran
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle size={24} className="text-primary-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Dokumen Pendukung</h3>
                                    <p className="mt-1 text-gray-600">
                                        Dokumen pendukung lain yang diperlukan untuk verifikasi
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button size="lg" asChild>
                                <a href="/application-form">
                                    Ajukan Pelatihan
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="relative order-1 lg:order-2">
                        <div className="overflow-hidden shadow-lg rounded-xl">
                            <img
                                src="https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=1280"
                                alt="Masjid Muhammadiyah"
                                className="object-cover w-full h-auto"
                            />
                        </div>
                        <div className="absolute px-6 py-3 text-white rounded-lg shadow-lg -bottom-6 -left-6 bg-accent-500">
                            <p className="font-medium">Proses Verifikasi Cepat</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApplicationInfo;
