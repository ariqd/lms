import ApplicationInfo from '@/components/landing/application-info';
import FAQAccordion from '@/components/landing/faq-accordion';
import HeroSection from '@/components/landing/hero-section';
import PortalAccess from '@/components/landing/portal-access';
import ProgramInfo from '@/components/landing/program-info';
import RegistrationSteps from '@/components/landing/registration-steps';
import UpcomingTrainings from '@/components/landing/upcoming-trainings';
import LandingLayout from '@/layouts/landing/landing-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <LandingLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <HeroSection />
            <ProgramInfo />
            <ApplicationInfo />
            <RegistrationSteps />
            <UpcomingTrainings />
            <FAQAccordion />
            <PortalAccess />
        </LandingLayout>
    );
}
