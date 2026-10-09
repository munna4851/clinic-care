import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';

export default function UserList({ auth, users }) {
    const [selectedUser, setSelectedUser] = useState(null); 

    const { data, setData, put, errors, reset, processing } = useForm({
        password: '',
        password_confirmation: '',
    });

    // 🔄 স্ট্যাটাস পরিবর্তন করার ফিক্সড ফাংশন
    const handleToggleStatus = (id) => {
        if (confirm('Are you sure you want to change this user status?')) {
            router.patch(route('admin.toggle-status', { id: id }), {}, {
                onSuccess: () => {
                    alert('Status updated successfully!');
                }
            });
        }
    };

    // 🔑 পাসওয়ার্ড আপডেট সাবমিট করার ফাংশন
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        put(route('admin.change-password', { id: selectedUser.id }), {
            onSuccess: () => {
                reset();
                setSelectedUser(null);
                alert('Password updated successfully!');
            },
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Doctor & Staff Management</h2>}
        >
            <Head title="User List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* সাকসেস মেসেজ অ্যালার্ট */}
                    {usePage().props.flash?.success && (
                        <div className="mb-4 text-sm font-medium text-green-600 bg-green-100 p-3 rounded-md border border-green-200">
                            {usePage().props.flash.success}
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users && users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all duration-200">
                                            <button
                                                onClick={() => handleToggleStatus(user.id)}
                                                className={`px-3 py-1.5 rounded text-xs font-bold shadow-sm transition-all duration-200 ${
                                                    user.is_active 
                                                        ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                                }`}
                                            >
                                                {user.is_active ? 'Deactivate' : 'Activate'}
                                            </button>

                                            <button
                                                onClick={() => setSelectedUser(user)}
                                                //className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs font-bold shadow-sm transition-all duration-200"
                                                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all duration-200"
                                            >   
                                                Change Password
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 🔑 পাসওয়ার্ড পরিবর্তনের পপআপ মডাল */}
            {selectedUser && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Change Password for <span className="text-indigo-600">{selectedUser.name}</span>
                        </h3>
                        
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>

                            {/* 🎯 বাটন সেকশন (গ্যারান্টিসহ দৃশ্যমান বাটন) */}
                            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => { setSelectedUser(null); reset(); }}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm font-medium shadow-md transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Confirm Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}