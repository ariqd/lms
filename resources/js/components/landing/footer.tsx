import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import LandingLogo from './landing-logo';
import { Link } from '@inertiajs/react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <LandingLogo isScrolled={false} />
                        <p className="text-gray-400 mt-4 text-sm">
                            Majelis Pendidikan Kader dan Sumber Daya Insani Pimpinan Wilayah Muhammadiyah, berkomitmen untuk mengembangkan kader Muhammadiyah yang berkualitas.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="https://youtube.com" className="text-gray-400 hover:text-white transition-colors">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4">Menu Utama</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">Beranda</Link>
                            </li>
                            <li>
                                <Link href="/application-form" className="text-gray-400 hover:text-white transition-colors">Formulir Pengajuan</Link>
                            </li>
                            <li>
                                <Link href="/registration" className="text-gray-400 hover:text-white transition-colors">Tata Cara Pendaftaran</Link>
                            </li>
                            <li>
                                <Link href="/schedule" className="text-gray-400 hover:text-white transition-colors">Jadwal Pelatihan</Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
                            </li>
                            <li>
                                <Link href="/announcements" className="text-gray-400 hover:text-white transition-colors">Pengumuman</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4">Portal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#portal-kader" className="text-gray-400 hover:text-white transition-colors">Portal Kader</a>
                            </li>
                            <li>
                                <a href="#portal-admin" className="text-gray-400 hover:text-white transition-colors">Portal Admin</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4">Kontak</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin size={20} className="text-primary-500 flex-shrink-0 mt-1" />
                                <span className="text-gray-400">Jl. KH. Ahmad Dahlan No. 103, Yogyakarta 55262</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} className="text-primary-500 flex-shrink-0" />
                                <span className="text-gray-400">(0274) 123456</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-primary-500 flex-shrink-0" />
                                <span className="text-gray-400">mpksdi@muhammadiyah.or.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} MPKSDI PWM. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
