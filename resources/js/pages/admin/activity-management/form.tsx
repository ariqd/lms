import { memo } from 'react';
import { BreadcrumbItem, Activity } from '@/types';
import ActivityFormBase from '@/components/activity-form/ActivityFormBase';
import { useAdminActivityForm } from '@/components/activity-form/hooks/useAdminActivityForm';
import { getAdminConfig } from '@/components/activity-form/config/roleConfigs';
import FormActions from './form-actions';

type Props = {
    breadcrumbs: BreadcrumbItem[];
    activity: Activity;
};

const AdminActivityForm = ({ breadcrumbs, activity }: Props) => {
    const formLogic = useAdminActivityForm(activity);
    const config = getAdminConfig(activity);

    return (
        <ActivityFormBase
            activity={activity}
            breadcrumbs={breadcrumbs}
            config={{
                ...config,
                additionalActions: <FormActions
                    activity={activity}
                    formLogic={formLogic}
                />
            }}
            formLogic={formLogic}
            title="Detail Kegiatan"
            description="Verifikasi formulir pengajuan pelatihan"
        />
    );
};

export default memo(AdminActivityForm);
