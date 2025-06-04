import { BookOpen } from 'lucide-react';

interface LandingLogoTypes {
    isScrolled: boolean;
}

const LandingLogo = ({ isScrolled }: LandingLogoTypes) => {
    return (
        <div className="flex items-center space-x-2">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isScrolled ? 'text-gray-700 bg-gray-700/10' : 'text-white bg-white/10'}`}>
                <BookOpen size={24} />
            </div>
            <div className={`${isScrolled ? 'text-gray-700' : 'text-white'} font-semibold text-xl`}>
                <span>MPKSDI</span>
                <span className="ml-1">PWM</span>
            </div>
        </div>
    );
};

export default LandingLogo;
