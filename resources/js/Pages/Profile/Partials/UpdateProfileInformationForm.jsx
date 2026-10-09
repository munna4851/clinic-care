import { useForm, usePage } from '@inertiajs/react'; // 🎯 এখানে usePage যোগ করা হয়েছে
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import React, { useState } from 'react';

export default function UpdateProfileInformation({ user, className = '' }) {
    // 🎯 ইনার্শিয়ার গ্লোবাল প্রপ্স থেকে auth ডাটা সরাসরি রিড করা
    const { auth } = usePage().props; 

    // 📸 ডাটাবেজে থাকা পুরোনো ছবির প্রিভিউ হ্যান্ডেল করার স্টেট
    const [photoPreview, setPhotoPreview] = useState(user?.photo ? `/storage/${user.photo}` : null);

    const { data, setData, post, processing, errors } = useForm({
        // 🎯 যদি কন্ট্রোলারের user অবজেক্টে নাম না পায়, তাহলে সরাসরি auth ইউজার থেকে নাম ও ইমেইল বসাবে
        name: user?.name || auth?.user?.name || '',          
        email: user?.email || auth?.user?.email || '',        
        phone: user?.phone || '',
        address: user?.address || '',
        license_no: user?.license_no || '',
        specialization: user?.specialization || '', 
        photo: null,
        _method: 'PATCH',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information, contact details, and professional credentials.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                
                {/* 🖼️ ১. ফটো সেকশন (বাম পাশে সুন্দর একটি স্কয়ার বক্সে) */}
                <div className="flex justify-start">
                    <div className="flex flex-col items-start bg-gray-50 p-4 rounded-lg border border-gray-200 w-44">
                        <InputLabel htmlFor="photo" value="Profile Photo" className="mb-2 font-semibold" />
                        
                        <div className="relative mb-3">
                            {photoPreview ? (
                                <img 
                                    src={photoPreview} 
                                    alt="Profile" 
                                    className="h-28 w-28 rounded-md object-cover border border-gray-300 shadow-sm" 
                                />
                            ) : (
                                <div className="h-28 w-28 rounded-md bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium text-xs text-center p-2">
                                    No Photo Chosen
                                </div>
                            )}
                        </div>

                        <label htmlFor="photo" className="cursor-pointer bg-white border border-gray-300 rounded-md py-1 px-3 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                            Choose File
                        </label>
                        <input
                            type="file"
                            id="photo"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setData('photo', file);
                                if (file) {
                                    setPhotoPreview(URL.createObjectURL(file));
                                }
                            }}
                            className="hidden"
                            accept="image/*"
                        />
                        <InputError message={errors.photo} className="mt-2" />
                    </div>
                </div>

                {/* 👥 ২. ডাক্তারের নাম এবং ইমেইল অ্যাড্রেস (পাশাপাশি) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="name" value="Doctor's Name" />
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email Address" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                {/* 📞 ৩. ফোন নম্বর এবং বিএমডিসি লাইসেন্স (পাশাপাশি) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number" />
                        <TextInput
                            id="phone"
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="017XXXXXXXX"
                            maxLength={11}
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="license_no" value="BMDC License No" />
                        <TextInput
                            id="license_no"
                            type="text"
                            value={data.license_no}
                            onChange={(e) => setData('license_no', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="e.g., A-12345"
                        />
                        <InputError message={errors.license_no} className="mt-2" />
                    </div>
                </div>

                {/* 🏠 ৪. চেম্বার অ্যাড্রেস এবং ডক্টর ইনফরমেশন ও ডিগ্রী (পাশাপাশি) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="address" value="Chamber / Personal Address" />
                        <textarea
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                            placeholder="Enter full address"
                            rows="4" 
                        ></textarea>
                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="specialization" value="Doctor Information & Degrees" />
                        <textarea
                            id="specialization"
                            value={data.specialization}
                            onChange={(e) => setData('specialization', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                            placeholder="e.g., MBBS, FCPS (Medicine), MD (Cardiology) - Senior Consultant"
                            rows="4"
                        ></textarea>
                        <InputError message={errors.specialization} className="mt-2" />
                    </div>
                </div>

                {/* 💾 ৫. সেভ বাটন */}
                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Saving...' : 'Save Changes'}
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}