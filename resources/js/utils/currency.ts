export const formatCurrency = (value: string | number): string => {
    const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numericValue);
};

export const formatCurrencyInput = (value: string | number): string => {
    const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;

    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numericValue);
};

export const parseCurrencyInput = (value: string): string => {
    // Remove all non-digit characters except decimal points
    const cleanValue = value.replace(/[^\d]/g, '');
    return cleanValue;
};
