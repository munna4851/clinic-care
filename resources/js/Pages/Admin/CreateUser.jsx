import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CreateUser({ auth }) {
    const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        email: '',
        role: 'doctor', // default role
        specialization: '',
        license_no: '',
        days: [], // সিলেক্ট করা বারসমূহের অ্যারে (e.g. ['Sat'])
        start_time: '16:00',
        end_time: '22:00',
        slot_duration: '15',
        password: '',
        password_confirmation: '',
    });

    // বার (Day) সিলেক্ট / আনসিলেক্ট করার লজিক
    const handleDayToggle = (day) => {
        if (data.days.includes(day)) {
            setData('days', data.days.filter((d) => d !== day));
        } else {
            setData('days', [...data.days, day]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 🎯UserController store এ ডাটা পাঠাবে
        post(route('users.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Account" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Doctor / Staff Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* 👤 Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g. MD GOLAM BAREK"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* 📞 Mobile Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g. 01712199088"
                                required
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        {/* 📧 Email Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address (Optional)</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g. munna4851@gmail.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* 🎭 User Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Select User Role *</label>
                            <select
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                            >
                                <option value="doctor">Doctor 🩺</option>
                                <option value="staff">Staff 💼</option>
                                <option value="admin">Admin 👑</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                        </div>

                        {/* 🩺 Doctor Specific Fields */}
                        {data.role === 'doctor' && (
                            <div className="p-4 bg-teal-50/50 border border-teal-200 rounded-lg space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Specialization *</label>
                                    <input
                                        type="text"
                                        value={data.specialization}
                                        onChange={(e) => setData('specialization', e.target.value)}
                                        className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500"
                                        placeholder="Orthodontist"
                                        required
                                    />
                                    {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">BMDC License No *</label>
                                    <input
                                        type="text"
                                        value={data.license_no}
                                        onChange={(e) => setData('license_no', e.target.value)}
                                        className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500"
                                        placeholder="59800"
                                        required
                                    />
                                    {errors.license_no && <p className="text-red-500 text-xs mt-1">{errors.license_no}</p>}
                                </div>

                                {/* Chamber Days Selector */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Chamber Days (সপ্তাহের বারসমূহ) *</label>
                                    <div className="flex flex-wrap gap-2">
                                        {daysList.map((day) => {
                                            const isSelected = data.days.includes(day);
                                            return (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => handleDayToggle(day)}
                                                    className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                                                        isSelected
                                                            ? 'bg-teal-700 text-white border-teal-700'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {errors.days && <p className="text-red-500 text-xs mt-1">{errors.days}</p>}
                                </div>

                                {/* Chamber Timing */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Time *</label>
                                        <input
                                            type="time"
                                            value={data.start_time}
                                            onChange={(e) => setData('start_time', e.target.value)}
                                            className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">End Time *</label>
                                        <input
                                            type="time"
                                            value={data.end_time}
                                            onChange={(e) => setData('end_time', e.target.value)}
                                            className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Slot (Min)</label>
                                        <input
                                            type="number"
                                            value={data.slot_duration}
                                            onChange={(e) => setData('slot_duration', e.target.value)}
                                            className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 🔑 Password & Confirm Password */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password *</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500"
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-teal-800 text-white rounded-md font-semibold hover:bg-teal-900 transition duration-200 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Create Account'}
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}