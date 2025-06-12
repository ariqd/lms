import { transformStatus } from '@/utils/transformers';
import { Badge } from './ui/badge'
import { useMemo } from 'react';

const ActivityStatusBadge = ({ status }: { status: string }) => {

    const statusColor = useMemo(() => {
        switch (status) {
            case 'pending':
                return 'default';
            case 'approved':
                return 'secondary';
            case 'rejected':
                return 'destructive';
            case 'in_progress':
                return 'outline';
            case 'finished':
                return 'secondary';
            case 'cancelled':
                return 'destructive';
            default:
                return 'default';
        }
    }, [status]);

    return (
        <Badge variant={statusColor}>
            {transformStatus(status)}
        </Badge>
    )
};

export default ActivityStatusBadge;