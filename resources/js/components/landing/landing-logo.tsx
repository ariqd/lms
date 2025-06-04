import { BookOpen } from 'lucide-react';

const LandingLogo = () => {
    return (
        <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-white/10 text-white rounded-full flex items-center justify-center">
                <BookOpen size={24} />
            </div>
            <div className="text-white font-semibold text-lg">
                <span>MPKSDI</span>
                <span className="text-white/90 ml-1">PWM</span>
            </div>
        </div>
    );
};

export default LandingLogo;
