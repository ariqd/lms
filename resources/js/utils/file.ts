export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileName = (file: File | string | null) => {
    if (!file) return '';

    if (file instanceof File) {
        return file.name;
    }

    // If it's a string (path), extract just the filename
    const pathParts = file.split(/[/\\]/); // Split by both forward and backward slashes
    return pathParts[pathParts.length - 1]; // Get the last part (filename)
};

export const isValidFileType = (file: File) => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
    return allowedTypes.includes(file.type);
};
