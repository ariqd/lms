import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative pb-16 overflow-hidden bg-blue-400 md:pb-32">
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 mix-blend-multiply"
                    style={{
                        backgroundImage: "url('https://images.pexels.com/photos/5428008/pexels-photo-5428008.jpeg?auto=compress&cs=tinysrgb&w=1600')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.4
                    }}
                />
            </div>

            <section className="container relative px-4 pt-24 mx-auto sm:px-6 lg:px-8 md:pt-32">
                <div className={`max-w-3xl transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                        Program Pelatihan Baitul Arqam & Darul Arqam Muhammadiyah
                    </h1>
                    <p className="max-w-2xl mt-6 text-xl text-white opacity-90">
                        Membentuk kader Muhammadiyah yang berkualitas dan berkomitmen untuk menjalankan misi dakwah amar ma'ruf nahi munkar.
                    </p>
                    <div className="flex flex-col gap-4 mt-10 sm:flex-row">
                        <Button variant="secondary" size="lg" className="shadow-lg" asChild>
                            <a href="#program-info">
                                Pelajari Program
                                <ChevronRight size={18} className="ml-2" />
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" className="text-white bg-white/10 border-white/20 hover:bg-white/20" asChild>
                            <a href="/application-form">
                                Ajukan Pelatihan
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
