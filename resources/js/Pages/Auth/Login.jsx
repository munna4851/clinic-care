import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const urlParams = new URLSearchParams(window.location.search);
    const userType = urlParams.get('type') || '';

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        type: userType, // 👈 ইউআরএল থেকে পাওয়া টাইপ এখানে সেট হচ্ছে
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleIdentityChange = (e) => {
    const value = e.target.value;

    // 🔢 যদি ইনপুটটি শুধুমাত্র সংখ্যা দিয়ে শুরু হয় (মোবাইল নম্বর)
    if (/^\d+$/.test(value)) {
        // ১১ ডিজিটের বেশি হলে কেটে দেবে
        if (value.length <= 11) {
            setData('email', value); // আপনার কন্ট্রোলার যে কি (key) এক্সপেক্ট করে, যেমন 'email' বা 'login'
        }
    } else {
        // 📧 যদি ইমেইল বা টেক্সট হয়, তবে স্বাভাবিকভাবে সব লিখতে দেবে
        setData('email', value);
    }
    };


    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                {/* 🔒 হিডেন ইনপুট ফিল্ডটি এখানে বসানো হলো, যা ব্যাকএন্ডে টাইপ ডাটা পাঠাবে */}
                <input type="hidden" name="type" value={data.type} />

                <div>
                    <InputLabel htmlFor="email" value="Email/Mobile" />

                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        //onChange={(e) => setData('email', e.target.value)}
                        onChange={handleIdentityChange}
                        placeholder="Enter your email or phone number"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}