import React from 'react';
import { Head } from '@inertiajs/react';

export default function PrintToken({ appointment }) {
    // 🖨️ প্রিন্ট ফাংশন
    const handlePrint = () => {
        window.print();
    };

    // 📱 শেয়ার করার জন্য মেসেজ টেক্সট
    const shareMessage = `Smile Care Dental Clinic\n---------------------\nAppointment Code: ${appointment.code}\nSerial No: #${appointment.serial_no}\nPatient: ${appointment.patient_name}\nDoctor: ${appointment.doctor_name}\nDate: ${appointment.date}\nTime: ${appointment.start_time}\n\nToken Link: ${window.location.href}`;

    // 💬 WhatsApp শেয়ার
    const handleWhatsAppShare = () => {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
        window.open(url, '_blank');
    };

    // ⚡ Messenger / Native Share (Mobile)
    const handleMessengerShare = () => {
        if (navigator.share) {
            // মোবাইল ব্রাউজারে Native Share ওপেন করবে (যাতে Messenger সহ সব অ্যাপ আসে)
            navigator.share({
                title: 'Appointment Serial Token',
                text: shareMessage,
                url: window.location.href,
            }).catch(() => {});
        } else {
            // পিসির ক্ষেত্রে Messenger ডায়ালগ লিঙ্ক
            const url = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(window.location.href)}&app_id=YOUR_FB_APP_ID&redirect_uri=${encodeURIComponent(window.location.href)}`;
            window.open(url, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <Head title={`Serial Token - ${appointment.code}`} />

            {/* 📄 টোকেন কার্ড */}
            <div id="token-card" className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 max-w-sm w-full text-center print:shadow-none print:border-none print:w-full print:p-0">
                
                {/* 🏥 ক্লিনিক হেডার */}
                <div className="border-b pb-3 mb-4">
                    <h2 className="text-xl font-bold text-teal-800">Smile Care Dental Clinic</h2>
                    <p className="text-xs text-gray-500">Appointment Serial Slip</p>
                </div>

                {/* 🎯 সিরিয়াল নম্বর */}
                <div className="my-4 bg-teal-50 p-4 rounded-xl border border-teal-200">
                    <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block">Your Serial Number</span>
                    <span className="text-5xl font-black text-teal-900">#{appointment.serial_no}</span>
                </div>

                {/* 📋 পেশেন্ট ও ডক্টর ডিটেইলস */}
                <div className="space-y-2 text-left text-sm border-b pb-4 mb-4">
                    <div className="flex justify-between">
                        <span className="text-gray-500">App. Code:</span>
                        <span className="font-mono font-bold text-gray-800">{appointment.code}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Patient:</span>
                        <span className="font-semibold text-gray-800">{appointment.patient_name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Mobile:</span>
                        <span className="font-semibold text-gray-800">{appointment.patient_mobile}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Doctor:</span>
                        <span className="font-semibold text-gray-800">{appointment.doctor_name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-semibold text-gray-800">{appointment.date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Chamber Time:</span>
                        <span className="font-semibold text-gray-800">{appointment.start_time}</span>
                    </div>
                </div>

                <p className="text-xs text-gray-400 mb-5 print:hidden">Save or share this serial token for reference.</p>

                {/* 🖨️ প্রিন্ট ও শেয়ার বাটনসমূহ (প্রিন্টে এগুলো আসবে না) */}
                <div className="space-y-2 print:hidden">
                    {/* Print Button */}
                    <button
                        onClick={handlePrint}
                        className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-semibold rounded-lg shadow transition flex items-center justify-center gap-2 text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print Serial Slip
                    </button>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                        {/* WhatsApp Button */}
                        <button
                            onClick={handleWhatsAppShare}
                            className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
                        >
                            <span>WhatsApp-এ শেয়ার</span>
                        </button>

                        {/* Messenger Button */}
                        <button
                            onClick={handleMessengerShare}
                            className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
                        >
                            <span>Messenger-এ শেয়ার</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}