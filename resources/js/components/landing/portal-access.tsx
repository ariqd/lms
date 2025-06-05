import { Users, Lock } from 'lucide-react';
import { Button } from '../ui/button';

const PortalAccess = () => {
    return (
        <section className="py-16 text-white bg-primary-600">
            <div className="container px-4 mx-auto md:px-6">
                <div className="max-w-3xl mx-auto mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold">Portal Kader & Admin</h2>
                    <p className="text-xl opacity-90">
                        Akses portal untuk peserta pelatihan dan administrator program.
                    </p>
                </div>

                <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
                    {/* Kader Portal */}
                    <div id="portal-kader" className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:scale-105">
                        <div className="flex items-center justify-center p-6 bg-primary-700">
                            <Users size={48} className="text-white" />
                        </div>
                        <div className="p-8 text-center">
                            <h3 className="mb-4 text-2xl font-bold text-primary-600">Portal Kader</h3>
                            <p className="mb-6 text-gray-600">
                                Akses informasi pelatihan, materi, dan administrasi bagi peserta pelatihan dan kader Muhammadiyah.
                            </p>
                            <ul className="mb-8 space-y-2 text-left text-gray-600">
                                <li className="flex items-center">
                                    <span className="p-1 mr-3 rounded-full bg-primary-50 text-primary-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </span>
                                    Pendaftaran Pelatihan
                                </li>
                                <li className="flex items-center">
                                    <span className="p-1 mr-3 rounded-full bg-primary-50 text-primary-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </span>
                                    Akses Materi Pelatihan
                                </li>
                                <li className="flex items-center">
                                    <span className="p-1 mr-3 rounded-full bg-primary-50 text-primary-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </span>
                                    Riwayat Keikutsertaan
                                </li>
                                <li className="flex items-center">
                                    <span className="p-1 mr-3 rounded-full bg-primary-50 text-primary-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </span>
                                    Unduh Sertifikat
                                </li>
                            </ul>
                            <Button size="lg" className="w-full">
                                Masuk Portal Kader
                            </Button>
                        </div>
                    </div>

                    {/* Admin Portal */}
                    <div id="portal-admin" className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:scale-105">
                        <div className="flex items-center justify-center p-6 bg-secondary-600">
                            <Lock size={48} className="text-white" />
                        </div>
                        <div className="p-8 text-center">
                            <h3 className="mb-4 text-2xl font-bold text-secondary-600">Portal Admin</h3>
                            <p className="mb-6 text-gray-600">
                                Sistem pengelolaan program pelatihan dan kaderisasi bagi administrator MPKSDI PWM.
                            </p>
                            <ul className="mb-8 space-y-2 text-left text-gray-600">
                                <li className="flex items-center">
                                    <span className="p-1 mr-3 rounded-full bg-secondary-50 text-secondary-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </span>
                                    Manajemen Peserta
                                </li>
                                <li className="flex items-center">
                                    <span className="p-1 mr-3 rounded-full bg-secondary-50 text-secondary-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </span>
                                    Penjadwalan Pelatihan
                                </li>
                                <li className="flex items-center">
                                    <span className="p-1 mr-3 rounded-full bg-secondary-50 text-secondary-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </span>
                                    Verifikasi Pengajuan
                                </li>
                                <li className="flex items-center">
                                    <span className="p-1 mr-3 rounded-full bg-secondary-50 text-secondary-600">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </span>
                                    Laporan & Statistik
                                </li>
                            </ul>
                            <Button variant="secondary" size="lg" className="w-full">
                                Masuk Portal Admin
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortalAccess;
