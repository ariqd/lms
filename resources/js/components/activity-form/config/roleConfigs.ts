import { Activity, User } from '@/types';
import { ActivityFormConfig } from '../types/ActivityFormTypes';
// import { auth } from '@/types/auth';

export const getAdminConfig = (activity?: Activity): ActivityFormConfig => {
    const isApproved = activity?.status === 'approved';
    const isPending = activity?.status === 'pending';
    const isInProgress = activity?.status === 'in_progress';

    return {
        role: 'admin',
        permissions: {
            canEdit: false, // Admin views but doesn't edit basic info
            canApprove: !isApproved,
            canSubmit: false,
            canViewInvoice: true,
            canSendInvoice: isPending || isInProgress,
            canUploadPaymentProof: false, // Admin doesn't upload payment proof
            canAddNotes: true,
        },
        submitButtonText: isApproved ? 'Kegiatan Disetujui' : 'Setujui Kegiatan',
        backUrl: route('admin.activity-management.index'),
        showInvoiceSection: true,
        showApprovalSection: true,
        showPaymentSection: true,
    };
};

export const getLembagaConfig = (activity?: Activity, user?: User): ActivityFormConfig => {
    // Lembaga can edit when:
    // 1. Creating new activity (no activity)
    // 2. Activity is in draft status
    // 3. Activity is pending (before admin approval)
    // 4. Activity is rejected (needs to fix and resubmit)
    // 5. Activity is created by the current user
    const canEdit =
        !activity || activity.status === 'draft' || activity.status === 'pending' || activity.status === 'rejected' || activity.user_id === user?.id;

    const hasInvoice = !!activity?.invoice_file;

    return {
        role: 'lembaga',
        permissions: {
            canEdit,
            canApprove: false,
            canSubmit: canEdit,
            canViewInvoice: hasInvoice,
            canSendInvoice: false, // Lembaga doesn't send invoice
            canUploadPaymentProof: hasInvoice && !activity?.payment_proof_file,
            canAddNotes: canEdit, // Lembaga can add notes when editing
        },
        submitButtonText: activity ? 'Simpan Perubahan' : 'Kirim Proposal',
        backUrl: route('lembaga.pelatihan.index'),
        showInvoiceSection: hasInvoice,
        showApprovalSection: false,
        showPaymentSection: hasInvoice,
    };
};

export const getKaderConfig = (): ActivityFormConfig => {
    // Future implementation for Kader role
    return {
        role: 'kader',
        permissions: {
            canEdit: false,
            canApprove: false,
            canSubmit: false,
            canViewInvoice: false,
            canSendInvoice: false,
            canUploadPaymentProof: false,
            canAddNotes: false,
        },
        submitButtonText: 'View Only',
        backUrl: route('dashboard'),
        showInvoiceSection: false,
        showApprovalSection: false,
        showPaymentSection: false,
    };
};
