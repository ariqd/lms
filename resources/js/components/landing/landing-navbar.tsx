import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from '@inertiajs/react';
import LandingLogo from './landing-logo';
// import Logo from './Logo';
// import Button from '../ui/Button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const LandingNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    // const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        {
            name: 'Beranda',
            path: '/',
        },
        {
            name: 'Program',
            items: [
                { name: 'Baitul Arqam', path: '/baitul-arqam' },
                { name: 'Darul Arqam', path: '/darul-arqam' },
                { name: 'Program Khusus', path: '/program-khusus' },
            ],
        },
        {
            name: 'Pendaftaran',
            items: [
                { name: 'Formulir Pengajuan', path: '/application-form' },
                { name: 'Tata Cara Pendaftaran', path: '/registration' },
                { name: 'Jadwal Pelatihan', path: '/schedule' },
            ],
        },
        {
            name: 'Informasi',
            items: [
                { name: 'FAQ', path: '/faq' },
                { name: 'Pengumuman', path: '/announcements' },
                { name: 'Kontak', path: '/contact' },
            ],
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleDropdownClick = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleMouseEnter = (name: string) => {
        setOpenDropdown(name);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center" onClick={closeMenu}>
                        <LandingLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex" viewport={false}>
                        <NavigationMenuList className='gap-4'>
                            {navLinks.map((link) => (
                                <NavigationMenuItem key={link.name} className='text-white hover:text-white hover:bg-transparent'>
                                    {link.items ? (
                                        <>
                                            <NavigationMenuTrigger
                                                className='bg-transparent hover:bg-transparent'>
                                                {link.name}
                                                {/* <ChevronDown size={16} className="ml-1" /> */}
                                            </NavigationMenuTrigger>

                                            <NavigationMenuContent>
                                                <ul className="grid w-[200px] gap-4">
                                                    <li>
                                                        {link.items.map((item) => (
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    key={item.path}
                                                                    href={item.path}
                                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                                                    onClick={() => {
                                                                        setOpenDropdown(null);
                                                                        closeMenu();
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </li>
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={link.path}
                                            >
                                                {link.name}
                                            </Link>
                                        </NavigationMenuLink>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="hidden lg:flex items-center">
                        <Button
                            variant={isScrolled ? "default" : "secondary"}
                            className="flex items-center bg-green-700 text-white hover:bg-green-900"
                            asChild
                        >
                            <a href="/login">
                                <LogIn size={18} className="mr-2" />
                                Masuk
                            </a>
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${isScrolled ? 'text-gray-700 hover:text-primary-500' : 'text-white hover:text-white/80'
                                } focus:outline-none`}
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">
                                {isOpen ? 'Tutup menu utama' : 'Buka menu utama'}
                            </span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`lg:hidden ${isOpen ? 'block' : 'hidden'
                    } bg-white shadow-lg absolute w-full`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            {link.items ? (
                                <>
                                    <button
                                        onClick={() => handleDropdownClick(link.name)}
                                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                                    >
                                        {link.name}
                                        <ChevronDown
                                            size={16}
                                            className={`transform transition-transform ${openDropdown === link.name ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {openDropdown === link.name && (
                                        <div className="pl-4">
                                            {link.items.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    href={item.path}
                                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                                                    onClick={closeMenu}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={link.path}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'
                                        }`}
                                    onClick={closeMenu}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                    <div className="pt-4 pb-2 border-t border-gray-200">
                        <a
                            href="/login"
                            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-primary-500 hover:bg-primary-600"
                            onClick={closeMenu}
                        >
                            <LogIn size={18} className="mr-2" />
                            Masuk
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavbar;
