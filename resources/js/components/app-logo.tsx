import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { BookOpen } from 'lucide-react';

export default function AppLogo() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <BookOpen className="text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">LMS - Portal {auth.user.role?.name}</span>
            </div>
        </>
    );
}
