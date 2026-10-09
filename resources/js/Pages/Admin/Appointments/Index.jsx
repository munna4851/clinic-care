import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';

export default function AppointmentIndex({ appointments, doctors, filters }) {
    const [selectedDate, setSelectedDate] = useState(filters.date || '');
    const [selectedDoctor, setSelectedDoctor] = useState(filters.doctor_id || '');

    // 🔍 ফিল্টার পরিবর্তন হ্যান্ডলার
    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.appointments.index'), {
            date: selectedDate,
            doctor_id: selectedDoctor,
        }, { preserveState: true });
    };

    // 🧹 ফিল্টার রিমুভ
    const handleReset = () => {
        setSelectedDate('');
        setSelectedDoctor('');
        router.get(route('admin.appointments.index'));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Head title="All Appointment Serials" />
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
               
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">All Patient Serials</h1>

                    <div className="flex gap-2 print:hidden">
                            <Link
                                href={route('admin.appointments.create')}
                                className="px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-semibold hover:bg-teal-800 transition flex items-center gap-1"
                            >
                                <span>+</span> New Serial
                            </Link>
                            <button 
                                onClick={() => window.print()} 
                                className="px-4 py-2 bg-gray-100 text-gray-700 border rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                            >
                                🖨️ Print List
                            </button>
                    </div>
                </div>

                {/* 🔍 ফিল্টার সেকশন */}
                <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 print:hidden">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Select Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Filter by Doctor</label>
                        <select
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm text-sm"
                        >
                            <option value="">All Doctors</option>
                            {doctors.map((doc) => (
                                <option key={doc.id} value={doc.id}>{doc.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end gap-2">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">Filter</button>
                        <button type="button" onClick={handleReset} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold">Reset</button>
                    </div>
                </form>

                {/* 📋 সিরিয়াল টেবিল */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-gray-200 text-sm">
                        <thead>
                            <tr className="bg-teal-50 border-b border-gray-200 text-teal-900">
                                <th className="p-3 border-r">Serial</th>
                                <th className="p-3 border-r">App. Code</th>
                                <th className="p-3 border-r">Patient Name</th>
                                <th className="p-3 border-r">Mobile</th>
                                <th className="p-3 border-r">Doctor</th>
                                <th className="p-3 border-r">Date</th>
                                <th className="p-3 border-r">Time Slot</th>
                                <th className="p-3 text-center print:hidden">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.data.length > 0 ? (
                                appointments.data.map((app) => (
                                    <tr key={app.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-bold text-teal-700 border-r">#{app.serial_no}</td>
                                        <td className="p-3 font-mono border-r">{app.appointment_code}</td>
                                        <td className="p-3 font-medium border-r">{app.patient_name}</td>
                                        <td className="p-3 border-r">{app.patient_mobile}</td>
                                        <td className="p-3 border-r">{app.doctor?.name ?? 'N/A'}</td>
                                        <td className="p-3 border-r">{app.appointment_date}</td>
                                        <td className="p-3 border-r">{app.start_time}</td>
                                        <td className="p-3 text-center print:hidden">
                                            <Link
                                                href={route('serial.print', app.id)}
                                                target="_blank"
                                                className="px-3 py-1 bg-teal-100 text-teal-800 rounded hover:bg-teal-200 text-xs font-semibold"
                                            >
                                                Slip
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center p-5 text-gray-500">No serial records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}