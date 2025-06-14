export const transformStatus = (status: string): string => {
    switch (status) {
        case 'pending':
            return 'Menunggu Persetujuan';
        case 'approved':
            return 'Disetujui';
        case 'rejected':
            return 'Ditolak';
        case 'in_progress':
            return 'Invoice Dikirim';
        case 'finished':
            return 'Selesai';
        case 'cancelled':
            return 'Dibatalkan';
        default:
            return status;
    }
};
