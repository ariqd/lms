import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Check, LoaderCircle, NotebookPen, Upload } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { router } from '@inertiajs/react';
import ActivityStatusBadge from '@/components/activity-status-badge';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { Activity } from '@/types';
import { ActivityFormLogic } from '@/components/activity-form';

const FormActions = ({
    activity,
    formLogic,
}: {
    activity: Activity;
    formLogic: ActivityFormLogic;
}) => {
    const handlers = formLogic.additionalHandlers as {
        handleApproval: () => void;
        handleSendInvoice: () => void;
        getCheckboxes: () => { dataPelatihan: boolean; dataDokumen: boolean; dokumenPembayaran: boolean };
        setCheckboxes: (checkboxes: { dataPelatihan: boolean; dataDokumen: boolean; dokumenPembayaran: boolean }) => void;
        getAllCheckboxesChecked: () => boolean;
    };

    return (
        <>
            <ActivityStatusBadge status={activity.status} />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="default">
                        {formLogic.processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                        <NotebookPen className="w-4 h-4 mr-2" />
                        Catatan Pengajuan
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Catatan Pengajuan</AlertDialogTitle>
                        <AlertDialogDescription>
                            Kirim catatan pengajuan kegiatan kepada Lembaga Pelatihan
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4 py-4">
                        <Textarea
                            placeholder="Masukkan catatan pengajuan"
                            className="min-h-[100px] resize-none"
                            disabled={formLogic.processing}
                        />
                        <InputError message={formLogic.errors.notes} />
                    </div>
                    <div className="space-y-4 h-40 overflow-y-auto">
                        <div className="text-sm font-medium">
                            Riwayat Catatan:
                        </div>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Admin</span>
                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Admin</span>
                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Admin</span>
                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Admin</span>
                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Admin</span>
                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Admin</span>
                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Admin</span>
                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Admin</span>
                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Admin</span>
                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Admin</span>
                            <span className="text-gray-500"> - 11/06/2025 10:00</span>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Tutup</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                type="button"
                                disabled={formLogic.processing || !formLogic.data.notes}
                                className="bg-green-700 hover:bg-green-800 text-white disabled:opacity-50"
                            >
                                {formLogic.processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                                <Check className="w-4 h-4 mr-2" />
                                Kirim Catatan
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {activity.status === 'pending' || activity.status === 'in_progress' ? (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                            disabled={formLogic.processing || !formLogic.data.invoice_file || !formLogic.data.invoice_name}
                        >
                            {formLogic.processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                            <Upload className="w-4 h-4 mr-2" />
                            {activity.status === 'in_progress' ? 'Kirim Invoice Baru' : 'Kirim Invoice'}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Kirim Invoice</AlertDialogTitle>
                            <AlertDialogDescription>
                                Kirim invoice kegiatan kepada Lembaga Pelatihan?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        router.post(route('admin.activity-management.send-invoice', { activity: activity.slug }), {
                                            invoice_name: formLogic.data.invoice_name,
                                            invoice_file: formLogic.data.invoice_file,
                                        }, {
                                            forceFormData: true,
                                            onError: (errors) => {
                                                console.error('Invoice send failed:', errors);
                                            }
                                        });
                                    }}
                                    disabled={formLogic.processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                                >
                                    {formLogic.processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                                    <Upload className="w-4 h-4 mr-2" />
                                    Kirim Invoice
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="bg-green-700 hover:bg-green-800 text-white">
                            {formLogic.processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                            <Check className="w-4 h-4 mr-2" />
                            Setujui Kegiatan
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Verifikasi Kelengkapan Dokumen</AlertDialogTitle>
                            <AlertDialogDescription>
                                Pastikan semua dokumen telah diperiksa dan lengkap sebelum menyetujui kegiatan ini.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="dataPelatihan"
                                    checked={handlers.getCheckboxes().dataPelatihan}
                                    onCheckedChange={(checked) =>
                                        handlers.setCheckboxes({ ...handlers.getCheckboxes(), dataPelatihan: !!checked })
                                    }
                                />
                                <Label htmlFor="dataPelatihan">Data Pelatihan</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="dataDokumen"
                                    checked={handlers.getCheckboxes().dataDokumen}
                                    onCheckedChange={(checked) =>
                                        handlers.setCheckboxes({ ...handlers.getCheckboxes(), dataDokumen: !!checked })
                                    }
                                />
                                <Label htmlFor="dataDokumen">Data Dokumen Penunjang</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="dokumenPembayaran"
                                    checked={handlers.getCheckboxes().dokumenPembayaran}
                                    onCheckedChange={(checked) =>
                                        handlers.setCheckboxes({ ...handlers.getCheckboxes(), dokumenPembayaran: !!checked })
                                    }
                                />
                                <Label htmlFor="dokumenPembayaran">Dokumen Pembayaran</Label>
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    type="button"
                                    onClick={handlers.handleApproval}
                                    disabled={formLogic.processing || !handlers.getAllCheckboxesChecked()}
                                    className="bg-green-700 hover:bg-green-800 text-white disabled:opacity-50"
                                >
                                    {formLogic.processing && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
                                    <Check className="w-4 h-4 mr-2" />
                                    Setujui Kegiatan
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    )
}

export default FormActions