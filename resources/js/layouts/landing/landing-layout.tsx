import Footer from '@/components/landing/footer';
import LandingNavbar from '@/components/landing/landing-navbar';
import BackToTop from '@/components/landing/ui/BackToTop';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => (
    <div className='flex flex-col min-h-screen bg-slate-50'>
        <LandingNavbar />
        <div className="flex-grow">
            {children}
        </div>
        <Footer />
        <BackToTop />
    </div>
);
