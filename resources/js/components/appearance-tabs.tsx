// import { Appearance, useAppearance } from '@/hooks/use-appearance'; // No longer needed
import { cn } from '@/lib/utils';
import { Sun } from 'lucide-react'; // Only Sun icon is needed
import { HTMLAttributes } from 'react';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    // const { appearance, updateAppearance } = useAppearance(); // Theme is fixed

    // const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
    //     { value: 'light', icon: Sun, label: 'Light' },
    //     { value: 'dark', icon: Moon, label: 'Dark' },
    //     { value: 'system', icon: Monitor, label: 'System' },
    // ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1', className)} {...props}> {/* Removed dark mode classes */}
            {/* {tabs.map(({ value, icon: Icon, label }) => ( */}
            <button
                // key={value}
                // onClick={() => updateAppearance(value)}
                disabled // Disabled as there's no action
                className={cn(
                    'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                    // appearance === value // Always light
                    'bg-white shadow-xs text-neutral-700', // Static light mode styles
                    // : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                )}
            >
                <Sun className="-ml-1 h-4 w-4" />
                <span className="ml-1.5 text-sm">Light</span>
            </button>
            {/* ))} */}
        </div>
    );
}
