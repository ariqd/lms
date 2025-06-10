import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { useForm } from '@inertiajs/react';
import { useState, FormEventHandler } from 'react';

type RoleForm = {
    name: string;
    identity: string;
};

const RoleCreate = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm<RoleForm>({
        name: '',
        identity: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('roles.store'), {
            onSuccess: () => {
                setIsDialogOpen(false);
                reset();
                clearErrors();
            },
            preserveScroll: true,
        });
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        reset();
        clearErrors();
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Tambah Role
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Role Baru</DialogTitle>
                    <DialogDescription>
                        Buat role baru dengan memberikan nama dan ID.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama role"
                                maxLength={20}
                                disabled={processing}
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="identity">ID</Label>
                            <Input
                                id="identity"
                                type="text"
                                value={data.identity}
                                onChange={(e) => setData('identity', e.target.value)}
                                placeholder="Masukkan ID role (e.g., admin, lembaga, kader)"
                                maxLength={30}
                                disabled={processing}
                            />
                            <InputError message={errors.identity} />
                            <p className="text-xs text-muted-foreground">
                                Gunakan huruf kecil, angka, dan tanda hubung saja
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleDialogClose}
                            disabled={processing}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Tambah Role
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default RoleCreate