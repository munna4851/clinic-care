import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // আপনার প্রজেক্টের লেআউট অনুযায়ী চেঞ্জ করতে পারেন

export default function ProfileUpdate({ auth, doctor, schedules }) {
    // যদি আগে থেকেই শিডিউল থাকে, তবে প্রথমটার টাইম ডিফল্ট হিসেবে বসবে
    const defaultSchedule = schedules && schedules.length > 0 ? schedules[0] : null;

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        doctor_name: doctor ? doctor.doctor_name : auth.user.name,
        specialization: doctor ? doctor.specialization : '',
        license_no: doctor ? doctor.license_no : '',
        start_time: defaultSchedule ? defaultSchedule.start_time : '16:00', // ডিফল্ট বিকেল ৪টা
        end_time: defaultSchedule ? defaultSchedule.end_time : '20:00',     // ডিফল্ট রাত ৮টা
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('doctor.profile.update'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Complete Your Doctor Profile</h2>}>
            <Head title="Doctor Profile Update" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8 border border-gray-100">
                        
                        {recentlySuccessful && (
                            <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-[#04332D] rounded-lg font-semibold flex items-center">
                                ✅ প্রোফাইল এবং চেম্বার শিডিউল সফলভাবে সেভ হয়েছে!
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 👨‍⚕️ ডক্টরের নাম */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Doctor Professional Name</label>
                                <input
                                    type="text"
                                    value={data.doctor_name}
                                    onChange={e => setData('doctor_name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D]"
                                    placeholder="e.g. Dr. Imran Khan"
                                />
                                {errors.doctor_name && <p className="text-red-500 text-xs mt-1">{errors.doctor_name}</p>}
                            </div>

                            {/* 🩺 স্পেশালাইজেশন */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Specialization (বিশেষজ্ঞতা)</label>
                                <input
                                    type="text"
                                    value={data.specialization}
                                    onChange={e => setData('specialization', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D]"
                                    placeholder="e.g. Dental Surgeon / Orthodontist"
                                />
                                {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
                            </div>

                            {/* 🪪 বিএমডিসি লাইসেন্স নং */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">BMDC License / Registration No</label>
                                <input
                                    type="text"
                                    value={data.license_no}
                                    onChange={e => setData('license_no', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D]"
                                    placeholder="e.g. BMDC-A12345"
                                />
                                {errors.license_no && <p className="text-red-500 text-xs mt-1">{errors.license_no}</p>}
                            </div>

                            <hr className="border-gray-200" />
                            <h3 className="text-md font-bold text-gray-800">🕒 Daily Chamber Practice Timing (সাপ্তাহিক চেম্বার সময়)</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* ⏰ চেম্বার শুরু */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Chamber Start Time</label>
                                    <input
                                        type="time"
                                        value={data.start_time}
                                        onChange={e => setData('start_time', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D]"
                                    />
                                    {errors.start_time && <p className="text-red-500 text-xs mt-1">{errors.start_time}</p>}
                                </div>

                                {/* ⏰ চেম্বার শেষ */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Chamber End Time</label>
                                    <input
                                        type="time"
                                        value={data.end_time}
                                        onChange={e => setData('end_time', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#04332D] focus:ring-[#04332D]"
                                    />
                                    {errors.end_time && <p className="text-red-500 text-xs mt-1">{errors.end_time}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-[#04332D] text-white rounded-md font-semibold text-sm shadow-md hover:bg-opacity-90 transition-all disabled:bg-gray-400"
                                >
                                    {processing ? 'Saving...' : 'Save & Activate Profile'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}