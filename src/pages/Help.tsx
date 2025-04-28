import { useState } from "react";

const Help = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Bagaimana cara memesan makanan?",
      answer:
        "Untuk memesan makanan, pilih restoran dan menu, tambahkan ke keranjang, lalu lanjut ke checkout.",
    },
    {
      question: "Apakah ada biaya pengiriman?",
      answer:
        "Biaya pengiriman akan ditampilkan saat checkout, tergantung pada lokasi pengiriman.",
    },
    {
      question: "Apa saja metode pembayaran yang tersedia?",
      answer:
        "Kami menerima pembayaran via transfer bank, e-wallet, dan cash on delivery (COD).",
    },
    {
      question: "Bagaimana cara menghubungi layanan pelanggan?",
      answer:
        "Anda bisa menghubungi layanan pelanggan melalui email di support@example.com atau telepon di 08123456789.",
    },
    {
      question: "Bagaimana cara memberikan ulasan restoran?",
      answer:
        "Setelah pesanan Anda selesai, Anda dapat memberikan ulasan melalui riwayat pesanan.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Bantuan & FAQ
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div
              className="w-full text-left flex justify-between items-center p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{faq.question}</span>
              <span className="ml-2 text-xl">{openIndex === index ? "−" : "+"}</span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-80" : "max-h-0"
              }`}
            >
              <div className="p-4 text-gray-600 border-t border-gray-200">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
