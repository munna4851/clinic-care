import React, { useState, useEffect } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Create({ doctors }) {
    const [doctorTime, setDoctorTime] = useState('');
    const [timeMessage, setTimeMessage] = useState('');
    const [isAvailable, setIsAvailable] = useState(false); // 🟢 অ্যাভেইলএবিলিটি ট্র্যাক করার জন্য
    const [dayName, setDayName] = useState(''); // 📅 সিলেক্ট করা বারের নাম ট্র্যাক করার জন্য

    const { data, setData, post, processing, errors } = useForm({
        patient_name: '',
        gender: '',
        patient_mobile: '',
        patient_email: '',
        address: '',
        dob: '',
        doctor_id: '',
        appointment_date: '',
        chief_complaint: '',
    });

    // 🔄 ডক্টর অথবা ডেট পরিবর্তন হলে টাইম শিডিউল ফেচ করার লজিক
    useEffect(() => {
        if (data.doctor_id && data.appointment_date) {
            setTimeMessage('Checking doctor availability...');
            setDoctorTime('');
            setIsAvailable(false);

            // 📅 সিলেক্ট করা তারিখ থেকে বারের নাম বের করা (যেমন: Thursday, Friday)
            const dateObj = new Date(data.appointment_date);
            const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            setDayName(day);

            axios.get(`/get-doctor-schedule?doctor_id=${data.doctor_id}&date=${data.appointment_date}`)
                .then(response => {
                    if (response.data.available) {
                        setDoctorTime(`Chamber Time: ${response.data.start_time} - ${response.data.end_time}`);
                        setTimeMessage('');
                        setIsAvailable(true); // 🟢 দিন মিললে ট্রু হবে
                    } else {
                        setTimeMessage(response.data.message || `Doctor is not available on ${day}.`);
                        setDoctorTime('');
                        setIsAvailable(false); // ❌ না মিললে ফলস থাকবে
                    }
                })
                .catch(error => {
                    console.error("Error fetching schedule:", error);
                    setTimeMessage('Failed to load schedule. Please try again.');
                    setDoctorTime('');
                    setIsAvailable(false);
                });
        } else {
            setDoctorTime('');
            setTimeMessage('');
            setDayName('');
            setIsAvailable(false);
        }
    }, [data.doctor_id, data.appointment_date]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAvailable) return; // 🛑 ডাক্তার না বসলে ফর্ম সাবমিট হবে না
        post(route('serial.store'));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Book a Serial" />

            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="bg-[#04332D] p-6 text-center text-white">
                    <h2 className="text-2xl font-bold">Book Your Appointment Serial</h2>
                    <p className="text-teal-100 text-sm mt-1">Please fill out the form below to get your instant serial number.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* 👤 পেশেন্টের নাম */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Patient Full Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={data.patient_name}
                            onChange={e => setData('patient_name', e.target.value)}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D] ${errors.patient_name ? 'border-red-500' : ''}`}
                            placeholder="John Doe"
                        />
                        {errors.patient_name && <p className="text-red-500 text-xs mt-1">{errors.patient_name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 📞 মোবাইল নাম্বার */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={data.patient_mobile}
                                onChange={e => setData('patient_mobile', e.target.value)}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D] ${errors.patient_mobile ? 'border-red-500' : ''}`}
                                placeholder="017XXXXXXXX"
                            />
                            {errors.patient_mobile && <p className="text-red-500 text-xs mt-1">{errors.patient_mobile}</p>}
                        </div>

                        {/* ⚧️ জেন্ডার */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Gender <span className="text-red-500">*</span></label>
                            <select
                                value={data.gender}
                                onChange={e => setData('gender', e.target.value)}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D] ${errors.gender ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 📅 জন্মতারিখ */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                value={data.dob}
                                onChange={e => setData('dob', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D]"
                            />
                        </div>

                        {/* 📧 ইমেইল */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                value={data.patient_email}
                                onChange={e => setData('patient_email', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D]"
                                placeholder="example@mail.com"
                            />
                        </div>
                    </div>

                    <hr className="border-gray-200 my-2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 👨‍⚕️ ডক্টর সিলেকশন */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Select Doctor <span className="text-red-500">*</span></label>
                            <select
                                value={data.doctor_id}
                                onChange={e => setData('doctor_id', e.target.value)}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D] ${errors.doctor_id ? 'border-red-500' : ''}`}
                            >
                                <option value="">Choose a Doctor</option>
                                {doctors?.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name} ({doctor.specialization})
                                    </option>
                                ))}
                            </select>
                            {errors.doctor_id && <p className="text-red-500 text-xs mt-1">{errors.doctor_id}</p>}
                        </div>

                        {/* 📅 অ্যাপয়েন্টমেন্ট এর ডেট */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Appointment Date <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                value={data.appointment_date}
                                onChange={e => setData('appointment_date', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D] ${errors.appointment_date ? 'border-red-500' : ''}`}
                            />
                            {errors.appointment_date && <p className="text-red-500 text-xs mt-1">{errors.appointment_date}</p>}
                        </div>
                    </div>

                    {/* 🕒 ডাইনামিক ডক্টর টাইম, বার এবং শিডিউল স্লট ডিসপ্লে সেকশন */}
                    {(doctorTime || timeMessage) && (
                        <div className="mt-4 transition-all duration-300">
                            {/* 🟢 যদি ডাক্তার ওই দিনে উপস্থিত থাকেন */}
                            {doctorTime && (
                                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 shadow-sm flex items-center space-x-3">
                                    <div className="p-2 bg-[#04332D] text-white rounded-lg flex-shrink-0">
                                        ⏰
                                    </div>
                                    <div className="w-full">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-bold text-[#04332D]">Available Chamber Time</h4>
                                            {/* 🎯 বারের নাম দেখানোর ব্যাজ */}
                                            {dayName && (
                                                <span className="bg-teal-200 text-[#04332D] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                    {dayName}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-lg font-extrabold text-[#04332D] tracking-wide mt-0.5">{doctorTime}</p>
                                    </div>
                                </div>
                            )}

                            {/* 🔴 যদি ডাক্তার ওই দিনে না থাকেন বা কোনো নোটিশ থাকে */}
                            {timeMessage && (
                                <div className="p-4 rounded-xl bg-red-50 border border-red-200 shadow-sm flex items-center space-x-3">
                                    <div className="p-2 bg-red-600 text-white rounded-lg flex-shrink-0">
                                        ⚠️
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-red-900">Notice</h4>
                                        <p className="text-sm font-semibold text-red-700 mt-0.5">{timeMessage}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 🏠 ঠিকানা */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Address</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={e => setData('address', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D]"
                            placeholder="Dhaka, Bangladesh"
                        />
                    </div>

                    {/* 📝 প্রধান সমস্যা */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Chief Complaint (প্রধান সমস্যা)</label>
                        <textarea
                            rows="3"
                            value={data.chief_complaint}
                            onChange={e => setData('chief_complaint', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D]"
                            placeholder="Describe your dental issue here..."
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline">
                            Back to Home
                        </Link>

                        <button
                            type="submit"
                            disabled={processing || !isAvailable} // 🛑 ডাক্তার না থাকলে বা প্রসেসিং হলে বাটন ডিজেবল থাকবে
                            className="px-6 py-3 bg-[#04332D] text-white rounded-md font-semibold text-sm shadow-md hover:bg-opacity-95 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Processing...' : 'Confirm & Book Serial ➔'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}