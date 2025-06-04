import LandingNavbar from '@/components/landing/landing-navbar';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => (
    <div className='min-h-screen flex flex-col bg-slate-50'>
        <LandingNavbar />
        <div className="flex-grow">
            {children}
        </div>
    </div>
);
