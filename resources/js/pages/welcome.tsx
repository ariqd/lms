import HeroSection from '@/components/landing/hero-section';
import LandingLayout from '@/layouts/landing/landing-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <LandingLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <HeroSection />
        </LandingLayout>
    );
}
