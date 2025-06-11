import { BookOpen, Users, Award, Calendar } from 'lucide-react';

interface ProgramCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ProgramCard = ({ icon, title, description }: ProgramCardProps) => (
    <div className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow">
        <div className="h-12 w-12 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ProgramInfo = () => {
    return (
        <section id="program-info" className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Pelatihan & Kaderisasi</h2>
                    <p className="text-lg text-gray-600">
                        MPKSDI PWM menyelenggarakan berbagai program pelatihan dan kaderisasi untuk mengembangkan kualitas dan kompetensi kader Muhammadiyah.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ProgramCard
                        icon={<BookOpen size={24} />}
                        title="Baitul Arqam"
                        description="Program pembinaan ideologi dan kepemimpinan dasar bagi kader Muhammadiyah dengan penekanan pada nilai-nilai Islam dan Kemuhammadiyahan."
                    />
                    <ProgramCard
                        icon={<Users size={24} />}
                        title="Darul Arqam"
                        description="Program pembinaan kader lanjutan yang ditujukan untuk penguatan kompetensi dan pembentukan karakter kepemimpinan yang lebih komprehensif."
                    />
                    <ProgramCard
                        icon={<Award size={24} />}
                        title="Program Kaderisasi"
                        description="Sistem pengkaderan yang terintegrasi untuk menyiapkan regenerasi kepemimpinan Muhammadiyah di berbagai tingkatan organisasi."
                    />
                    <ProgramCard
                        icon={<Calendar size={24} />}
                        title="Pelatihan Khusus"
                        description="Program pelatihan tematik berdasarkan kebutuhan khusus Pimpinan Daerah Muhammadiyah atau Amal Usaha Muhammadiyah."
                    />
                </div>
            </div>
        </section>
    );
};

export default ProgramInfo;