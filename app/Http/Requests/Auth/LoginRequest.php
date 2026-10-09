<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
{
    return [
        'email' => ['required', 'string'], // এখানে শুধু রিকোয়ার্ড ও স্ট্রিং রাখলাম, কারণ এটা ইমেইল বা ফোন যেকোনোটা হতে পারে
        'password' => ['required', 'string'],
    ];
}

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws ValidationException
     */
  public function authenticate(): void
{
    $this->ensureIsNotRateLimited();

    $loginValue = $this->input('email');
    $password = $this->input('password');

    // ১. প্রথম সেফটি চেক: যদি ফিল্ড খালি থাকে
    if (empty($loginValue) || empty($password)) {
        throw \Illuminate\Validation\ValidationException::withMessages([
            'email' => 'The email/mobile and password fields are required.',
        ]);
    }

    // ২. ইমেইল নাকি ফোন নম্বর তা চেক করা
    $fieldType = filter_var($loginValue, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

    // ৩. লগইন অ্যাটেম্পট নেওয়া
    if (! \Illuminate\Support\Facades\Auth::attempt([$fieldType => $loginValue, 'password' => $password], $this->boolean('remember'))) {
        \Illuminate\Support\Facades\RateLimiter::hit($this->throttleKey());

        // 🎯 এই লাইনটিই আসল সমাধান: 
        // ইনাসিয়া রিঅ্যাক্ট ফর্ম 'email' কি-এর আন্ডারে মেসজটি এক্সপেক্ট করে
        throw \Illuminate\Validation\ValidationException::withMessages([
            'email' => __('auth.failed'),
        ]);
    }

    \Illuminate\Support\Facades\RateLimiter::clear($this->throttleKey());
}

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }
}
