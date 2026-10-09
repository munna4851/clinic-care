import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            // এখানে আমরা auth অবজেক্ট এবং সেটির ভেতরের user-কে আলাদাভাবে লেআউটে পাস করছি
            auth={auth}
            user={auth?.user} // 👈 এই লাইনটি নিশ্চিত করুন
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        You're logged in! Welcome to Chamber Management System.
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}