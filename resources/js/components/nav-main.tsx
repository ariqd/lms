import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronRightIcon } from 'lucide-react';

export function NavMain({ items = [], label }: { items: NavItem[]; label?: string }) {
    const { url } = usePage();

    const checkActive = (item: NavItem): boolean => {
        if (item.href === url) return true;
        if (item.items) {
            return item.items.some(checkActive);
        }
        return false;
    };
    return (
        <SidebarGroup className='px-2 py-0'>
            {label && <SidebarGroupLabel className='mt-4 mb-2'>{label}</SidebarGroupLabel>}
            <SidebarMenu>
                {items.map((item) =>
                    item.items ? (
                        <SidebarMenuItem key={item.title}>
                            <Collapsible defaultOpen={item.items.some(checkActive)}>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        size='lg'
                                        className='group/button w-full justify-between cursor-pointer'
                                        isActive={checkActive(item)}
                                    >
                                        <div className='flex items-center gap-2'>
                                            {item.icon && <item.icon size={16} />}
                                            <span>{item.title}</span>
                                        </div>
                                        <ChevronRightIcon className='size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:/button:rotate-90' />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <Link href={subItem.href!} prefetch>
                                                    <SidebarMenuSubButton isActive={subItem.href === url}>
                                                        {subItem.title}
                                                    </SidebarMenuSubButton>
                                                </Link>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenuItem>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton size='lg' asChild isActive={item.href === url} tooltip={{ children: item.title }}>
                                <Link href={item.href!} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
