import { useState } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from '@inertiajs/react';
import { Activity } from '@/types';

const UpcomingTrainings = ({ activities }: { activities: Activity[] }) => {
    const [filter, setFilter] = useState('all');

    const filteredTrainings = filter === 'all'
        ? activities
        : activities.filter(activity => activity.type === filter);

    return (
        <section className="py-16 bg-white">
            <div className="container px-4 mx-auto md:px-6">
                <div className="max-w-3xl mx-auto mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">Jadwal Pelatihan Mendatang</h2>
                    <p className="text-lg text-gray-600">
                        Berikut adalah jadwal pelatihan yang akan diselenggarakan oleh MPKSDI PWM dalam waktu dekat.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Semua
                    </button>
                    <button
                        onClick={() => setFilter('ba')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'ba'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Baitul Arqam
                    </button>
                    <button
                        onClick={() => setFilter('da')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'da'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Darul Arqam
                    </button>
                    <button
                        onClick={() => setFilter('pelatihan-khusus')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'pelatihan-khusus'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Pelatihan Khusus
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTrainings.map((training) => (
                        <div key={training.id} className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-xl shadow-soft hover:shadow-medium">
                            <div className="p-6">
                                <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full text-primary-700 bg-primary-50">
                                    {training.type === 'ba' ? 'Baitul Arqam' : training.type === 'da' ? 'Darul Arqam' : 'Pelatihan Khusus'}
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                                    {training.name}
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar size={18} className="mr-2 text-primary-600" />
                                        <span>{training.start_date}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin size={18} className="mr-2 text-primary-600" />
                                        <span>{training.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock size={18} className="mr-2 text-primary-600" />
                                        <span>{training.start_date} - {training.end_date}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Users size={18} className="mr-2 text-primary-600" />
                                        <span>Kapasitas: {training.participant_count} peserta</span>
                                    </div>
                                </div>
                                <div className="pt-4 mt-4 border-t border-gray-200">
                                    <p className="mb-4 text-sm text-gray-500">
                                        Batas pendaftaran: <span className="font-semibold">{training.end_date}</span>
                                    </p>
                                    <Button variant="outline">
                                        Detail Pelatihan
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Button asChild>
                        <Link href="/schedule">
                            Lihat Semua Jadwal Pelatihan
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default UpcomingTrainings;
