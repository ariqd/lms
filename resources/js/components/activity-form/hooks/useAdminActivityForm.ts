import { Activity } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ActivityFormData, ActivityFormLogic } from '../types/ActivityFormTypes';

export const useAdminActivityForm = (activity: Activity): ActivityFormLogic => {
    const [checkboxes, setCheckboxes] = useState({
        dataPelatihan: false,
        dataDokumen: false,
        dokumenPembayaran: false,
    });

    const { data, setData, processing, errors, put } = useForm<ActivityFormData>('activity-form', {
        type: activity?.type || '',
        name: activity?.name || '',
        description: activity?.description || '',
        goals: activity?.goals || '',
        date_start: activity?.date_start || '',
        date_end: activity?.date_end || '',
        time_start: activity?.time_start || '',
        time_end: activity?.time_end || '',
        participant_count: activity?.participant_count?.toString() || '',
        location: activity?.location || '',
        daily_schedule: activity?.daily_schedule || '',
        total_budget: activity?.total_budget?.toString() || '0',
        additional_needs: activity?.additional_needs || '',
        additional_equipments: activity?.additional_equipments || '',
        contact_name: activity?.contact_name || '',
        contact_phone: activity?.contact_phone || '',
        contact_email: activity?.contact_email || '',
        notes: activity?.notes || '',
        registration_deadline: activity?.registration_deadline || '',
        documents: [],
        invoice_name: '',
        invoice_file: null,
        payment_proof_file: null,
        payment_proof_notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Admin form doesn't submit basic form, only handles approval
    };

    const handleApproval = () => {
        put(
            route('admin.activity-management.update', {
                id: activity.id,
            }),
        );
    };

    const handleSendInvoice = () => {
        router.post(
            route('admin.activity-management.send-invoice', { activity: activity.slug }),
            {
                invoice_name: data.invoice_name,
                invoice_file: data.invoice_file,
            },
            {
                forceFormData: true,
                onError: (errors) => {
                    console.error('Invoice send failed:', errors);
                },
            },
        );
    };

    const addDocument = () => {
        // Admin doesn't add documents
    };

    const removeDocument = () => {
        // Admin doesn't remove documents
    };

    const updateDocumentName = () => {
        // Admin doesn't update document names
    };

    const updateDocumentFile = () => {
        // Admin doesn't update document files
    };

    const handlePaymentProofUpload = (e: React.FormEvent) => {
        e.preventDefault();
        // Admin doesn't upload payment proof - this is handled by lembaga users
    };

    return {
        data,
        setData,
        processing,
        errors,
        submit,
        addDocument,
        removeDocument,
        updateDocumentName,
        updateDocumentFile,
        handlePaymentProofUpload,
        additionalHandlers: {
            handleApproval,
            handleSendInvoice,
            getCheckboxes: () => checkboxes,
            setCheckboxes: (newCheckboxes: typeof checkboxes) => setCheckboxes(newCheckboxes),
            getAllCheckboxesChecked: () => checkboxes.dataPelatihan && checkboxes.dataDokumen && checkboxes.dokumenPembayaran,
        },
    };
};
