import { Button } from '@/components/ui/button';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { useAppearance } from '@/hooks/use-appearance'; // No longer needed as theme is fixed
import { Sun } from 'lucide-react'; // Only Sun icon is needed
import { HTMLAttributes } from 'react';

export default function AppearanceToggleDropdown({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    // const { appearance, updateAppearance } = useAppearance(); // Theme is fixed

    // const getCurrentIcon = () => { // Always light mode
    //     return <Sun className="h-5 w-5" />;
    // };

    return (
        <div className={className} {...props}>
            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild> */}
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md" disabled> {/* Disabled as there's no action */}
                <Sun className="h-5 w-5" />
                <span className="sr-only">Theme (Light Mode)</span>
            </Button>
            {/* </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => updateAppearance('light')}>
                        <span className="flex items-center gap-2">
                            <Sun className="h-5 w-5" />
                            Light
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAppearance('dark')}>
                        <span className="flex items-center gap-2">
                            <Moon className="h-5 w-5" />
                            Dark
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAppearance('system')}>
                        <span className="flex items-center gap-2">
                            <Monitor className="h-5 w-5" />
                            System
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
        </div>
    );
}
