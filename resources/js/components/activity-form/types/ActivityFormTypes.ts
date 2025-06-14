import { Activity, BreadcrumbItem, DocumentItem } from '@/types';
import { ReactNode } from 'react';

export type ActivityFormData = {
    type: 'ba' | 'da' | '';
    name: string;
    description: string;
    goals: string;
    date_start: string;
    date_end: string;
    time_start: string;
    time_end: string;
    participant_count: string;
    location: string;
    daily_schedule: string;
    total_budget: string;
    additional_needs: string;
    additional_equipments: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    notes: string;
    registration_deadline: string;
    documents: DocumentItem[];
    invoice_name?: string;
    invoice_file?: File | null;
    payment_proof_file?: File | null;
    payment_proof_notes?: string;
};

export type ActivityFormPermissions = {
    canEdit: boolean;
    canApprove: boolean;
    canSubmit: boolean;
    canViewInvoice: boolean;
    canSendInvoice: boolean;
    canUploadPaymentProof: boolean;
    canAddNotes: boolean;
};

export type ActivityFormConfig = {
    role: 'admin' | 'lembaga' | 'kader';
    permissions: ActivityFormPermissions;
    submitButtonText: string;
    backUrl: string;
    additionalActions?: ReactNode;
    showInvoiceSection: boolean;
    showApprovalSection: boolean;
    showPaymentSection: boolean;
};

export type ActivityFormLogic = {
    data: ActivityFormData;
    setData: <K extends keyof ActivityFormData>(key: K, value: ActivityFormData[K]) => void;
    processing: boolean;
    errors: Record<string, string>;
    submit: (e: React.FormEvent) => void;
    addDocument: () => void;
    removeDocument: (id: string) => void;
    updateDocumentName: (id: string, name: string) => void;
    updateDocumentFile: (id: string, file: File | null) => void;
    handlePaymentProofUpload: (e: React.FormEvent) => void;
    additionalHandlers?: Record<string, unknown>;
};

export type ActivityFormBaseProps = {
    activity?: Activity;
    breadcrumbs: BreadcrumbItem[];
    config: ActivityFormConfig;
    formLogic: ActivityFormLogic;
    title: string;
    description: string;
};
