import { memo } from 'react';
import { BreadcrumbItem, Activity, SharedData } from '@/types';
import ActivityFormBase from '@/components/activity-form/ActivityFormBase';
import { useLembagaActivityForm } from '@/components/activity-form/hooks/useLembagaActivityForm';
import { getLembagaConfig } from '@/components/activity-form/config/roleConfigs';
import { usePage } from '@inertiajs/react';

type Props = {
    title: string;
    activity?: Activity;
    breadcrumbs: BreadcrumbItem[];
    description: string;
};

const LembagaActivityForm = ({ title, activity, breadcrumbs, description }: Props) => {
    const { auth } = usePage<SharedData>().props;
    const formLogic = useLembagaActivityForm(activity);
    const config = getLembagaConfig(activity, auth.user);

    return (
        <ActivityFormBase
            activity={activity}
            breadcrumbs={breadcrumbs}
            config={config}
            formLogic={formLogic}
            title={title}
            description={description}
        />
    );
};

export default memo(LembagaActivityForm);
