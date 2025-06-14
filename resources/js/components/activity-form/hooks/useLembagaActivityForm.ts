import { Activity, DocumentItem } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { ActivityFormData, ActivityFormLogic } from '../types/ActivityFormTypes';

export const useLembagaActivityForm = (activity?: Activity): ActivityFormLogic => {
    const { errors: updateErrors } = usePage().props;

    const {
        data,
        setData,
        post,
        processing,
        errors: createErrors,
    } = useForm({
        type: activity?.type || '',
        name: activity?.name || '',
        description: activity?.description || '',
        goals: activity?.goals || '',
        date_start: activity?.date_start || '',
        date_end: activity?.date_end || '',
        time_start: activity?.time_start || '',
        time_end: activity?.time_end || '',
        participant_count: activity?.participant_count || '',
        location: activity?.location || '',
        daily_schedule: activity?.daily_schedule || '',
        total_budget: activity?.total_budget || '0',
        additional_needs: activity?.additional_needs || '',
        additional_equipments: activity?.additional_equipments || '',
        contact_name: activity?.contact_name || '',
        contact_phone: activity?.contact_phone || '',
        contact_email: activity?.contact_email || '',
        notes: activity?.notes || '',
        registration_deadline: activity?.registration_deadline || '',
        documents: (activity as Activity & { files?: DocumentItem[] })?.files?.map((file) => ({
            id: file.id?.toString() || Date.now().toString(),
            name: file.name,
            file: file.file, // This will be the file path string for existing files
        })) || [{ id: Date.now().toString(), name: '', file: null }],
        payment_proof_file: null,
        payment_proof_notes: '',
    } as ActivityFormData);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (activity) {
            router.post(route('lembaga.pelatihan.update', activity.slug), {
                _method: 'put',
                ...data,
            });
        } else {
            post(route('lembaga.pelatihan.store'));
        }
    };

    const addDocument = () => {
        setData('documents', [...data.documents, { id: Date.now().toString(), name: '', file: null }]);
    };

    const removeDocument = (id: string) => {
        if (data.documents.length > 1) {
            setData(
                'documents',
                data.documents.filter((doc) => doc.id !== id),
            );
        }
    };

    const updateDocumentName = (id: string, name: string) => {
        setData(
            'documents',
            data.documents.map((doc) => (doc.id === id ? { ...doc, name } : doc)),
        );
    };

    const updateDocumentFile = (id: string, file: File | null) => {
        setData(
            'documents',
            data.documents.map((doc) => (doc.id === id ? { ...doc, file } : doc)),
        );
    };

    const handlePaymentProofUpload = (e: React.FormEvent) => {
        e.preventDefault();

        if (!activity?.slug) {
            console.error('Activity slug is required for payment proof upload');
            return;
        }

        if (!data.payment_proof_file) {
            console.error('Payment proof file is required');
            return;
        }

        // Create form data for payment proof upload
        const formData = new FormData();
        formData.append('payment_proof_file', data.payment_proof_file);
        if (data.payment_proof_notes) {
            formData.append('payment_proof_notes', data.payment_proof_notes);
        }

        // Submit payment proof upload
        router.post(route('lembaga.pelatihan.upload-payment-proof', activity.slug), formData, {
            forceFormData: true,
            onSuccess: () => {
                // Reset payment proof form fields
                setData('payment_proof_file', null);
                setData('payment_proof_notes', '');
            },
            onError: (errors) => {
                console.error('Payment proof upload failed:', errors);
            },
        });
    };

    const errors = activity ? updateErrors : createErrors;

    return {
        data,
        setData,
        processing,
        errors: errors as Record<string, string>,
        submit,
        addDocument,
        removeDocument,
        updateDocumentName,
        updateDocumentFile,
        handlePaymentProofUpload,
    };
};
