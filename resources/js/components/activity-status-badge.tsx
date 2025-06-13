import { Badge } from './ui/badge'
import { useMemo } from 'react';

const ActivityStatusBadge = ({ status, originalStatus }: { status: string, originalStatus?: string }) => {

    const statusColor = useMemo(() => {
        switch (originalStatus || status) {
            case 'pending':
                return 'bg-yellow-500 text-black';
            case 'approved':
                return 'bg-green-500 text-black';
            case 'rejected':
                return 'bg-red-500 text-black';
            case 'in_progress':
                return 'bg-blue-500 text-black';
            case 'finished':
                return 'bg-green-500 text-black';
            case 'cancelled':
                return 'bg-red-500 text-black';
            default:
                return 'bg-gray-500 text-white';
        }
    }, [originalStatus, status]);

    return (
        <Badge className={`text-xs font-medium rounded-md ${statusColor}`}>
            {status}
        </Badge>
    )
};

export default ActivityStatusBadge;