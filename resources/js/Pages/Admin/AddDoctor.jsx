import React, { useState } from 'react'; 
import { Head, useForm } from '@inertiajs/react'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import axios from 'axios'; // 🎯 অ্যাক্সিওস ইম্পোর্ট করা হলো সরাসরি ডাটা পাঠানোর জন্য

export default function AddDoctor({ auth }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false); // সাবমিট করার সময় বাটন ডিসেবল রাখার জন্য
    const [backendErrors, setBackendErrors] = useState({}); // ভ্যালিডেশন এরর দেখানোর জন্য

    const { data, setData, reset } = useForm({
        name: '',
        email: '',
        phone: '', 
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        setSuccessMessage(''); 
        setBackendErrors({});

        if (data.phone.length !== 11) {
            alert('Mobile number must be exactly 11 digits!');
            return;
        }

        setLoading(true);

        // 🎯 ইনার্শিয়ার পোস্ট বাদ দিয়ে সরাসরি Axios দিয়ে রিকোয়েস্ট পাঠানো হচ্ছে
        axios.post(route('doctor.store'), data)
            .then(response => {
                setLoading(false);
                if (response.data.success) {
                    reset(); // ফর্মের সব ইনপুট খালি করে দেওয়া
                    setSuccessMessage(response.data.message); // সবুজ বক্সে মেসেজ শো করা
                    
                    // ৫ সেকেন্ড পর মেসেজটি স্ক্রিন থেকে মুছে যাবে
                    setTimeout(() => setSuccessMessage(''), 5000);
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response && error.response.data.errors) {
                    // ল্যারাভেলের ভ্যালিডেশন এররগুলো ক্যাচ করা
                    setBackendErrors(error.response.data.errors);
                } else {
                    console.error("Something went wrong:", error);
                }
            });
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); 
        if (value.length <= 11) {
            setData('phone', value);
        } else {
            setData('phone', value.slice(0, 11)); 
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Doctor</h2>}
        >
            <Head title="Add Doctor" />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8 bg-white p-6 rounded-lg shadow">

                    {/* 🎉 সাকসেস মেসেজ অ্যালার্ট বক্স */}
                    {successMessage && (
                        <div className="mb-4 text-sm font-medium text-green-600 bg-green-100 p-3 rounded-md border border-green-200 shadow-sm">
                            {successMessage}
                        </div>
                    )}
                    
                    <form onSubmit={submit}>
                        {/* 👤 Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Doctor Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {/* ল্যারাভেলের ভ্যালিডেশন এরর এখানে দেখাবে */}
                            <InputError message={backendErrors.name?.[0]} className="mt-2" />
                        </div>

                        {/* 📧 Email */}
                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email (Optional)" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={backendErrors.email?.[0]} className="mt-2" />
                        </div>

                        {/* 📱 Phone (Fixed 11 Digits) */}
                        <div className="mt-4">
                            <InputLabel htmlFor="phone" value="Mobile Number (11 Digits)" />
                            <TextInput
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                className="mt-1 block w-full"
                                onChange={handlePhoneChange}
                                placeholder="01XXXXXXXXX"
                                maxLength={11} 
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Digits: {data.phone.length}/11</p>
                            <InputError message={backendErrors.phone?.[0]} className="mt-2" />
                        </div>

                        {/* 🔑 Password */}
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={backendErrors.password?.[0]} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Doctor'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}