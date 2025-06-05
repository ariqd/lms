import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="ml-6 flex-shrink-0 text-primary-600">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Apa perbedaan Baitul Arqam dan Darul Arqam?',
      answer: 'Baitul Arqam adalah program pembinaan ideologi dan kepemimpinan dasar bagi kader Muhammadiyah yang menekankan pada nilai-nilai Islam dan Kemuhammadiyahan. Sedangkan Darul Arqam merupakan program pembinaan kader lanjutan yang ditujukan untuk penguatan kompetensi dan pembentukan karakter kepemimpinan yang lebih komprehensif.'
    },
    {
      question: 'Berapa biaya untuk mengikuti pelatihan?',
      answer: 'Biaya pelatihan bervariasi tergantung jenis dan tingkatan pelatihan. Untuk Baitul Arqam berkisar antara Rp 750.000 - Rp 1.500.000, sedangkan untuk Darul Arqam berkisar antara Rp 1.500.000 - Rp 3.000.000. Biaya tersebut mencakup materi, sertifikat, konsumsi, dan akomodasi selama pelatihan berlangsung.'
    },
    {
      question: 'Apa saja persyaratan untuk mengikuti pelatihan?',
      answer: 'Persyaratan umum meliputi: (1) Anggota Muhammadiyah yang dibuktikan dengan Kartu Anggota Muhammadiyah yang masih berlaku, (2) Memiliki rekomendasi dari Pimpinan Cabang atau Pimpinan Daerah Muhammadiyah, (3) Mengisi formulir pendaftaran dan melengkapi dokumen administratif yang diperlukan, dan (4) Membayar biaya pelatihan sesuai ketentuan.'
    },
    {
      question: 'Apakah pelatihan ini bersertifikat?',
      answer: 'Ya, setiap peserta yang mengikuti pelatihan dan dinyatakan lulus akan mendapatkan sertifikat resmi dari MPKSDI PWM yang diakui di lingkungan Persyarikatan Muhammadiyah. Sertifikat ini dapat menjadi syarat untuk menjadi pimpinan di berbagai level organisasi Muhammadiyah.'
    },
    {
      question: 'Bagaimana cara PDM/AUM mengajukan penyelenggaraan pelatihan?',
      answer: 'PDM/AUM dapat mengajukan penyelenggaraan pelatihan dengan mengirimkan surat resmi, proposal kegiatan, dan dokumen pendukung lainnya ke MPKSDI PWM. Pengajuan dapat dilakukan melalui formulir online di website ini atau melalui email resmi mpksdi@muhammadiyah.or.id.'
    },
    {
      question: 'Berapa lama proses verifikasi pengajuan pelatihan?',
      answer: 'Proses verifikasi pengajuan pelatihan membutuhkan waktu maksimal 14 hari kerja sejak dokumen lengkap diterima. MPKSDI PWM akan mengirimkan notifikasi hasil verifikasi melalui email dan surat resmi kepada pengaju.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-lg text-gray-600">
            Jawaban untuk pertanyaan umum seputar program pelatihan dan kaderisasi Muhammadiyah.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-soft p-6">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;