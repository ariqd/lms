import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from './ui/alert'
import { CheckCircle } from 'lucide-react'
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

const AlertComponent = () => {
    const [showAlert, setShowAlert] = useState(false);
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash?.success) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    return showAlert && flash?.success && (
        <div className="mt-4 bg-green-700 rounded-md">
            <Alert>
                <CheckCircle className="h-4 w-4 text-white" />
                <AlertDescription className="text-white">
                    {flash?.success}
                </AlertDescription>
            </Alert>
        </div>
    )
}

export default AlertComponent