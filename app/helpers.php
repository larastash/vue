<?php

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;

if (! function_exists('user')) {
    /**
     * Get the currently authenticated user from the specified guard.
     *
     * @param string|null $guard The authentication guard name (optional)
     * @return User|Authenticatable|null The authenticated user instance or null if not authenticated
     */
    function user(?string $guard = null): User|Authenticatable|null
    {
        if ($guard) {
            return Auth::guard($guard)->user();
        }

        /** @var User|null $user */
        $user = Auth::user();

        return $user;
    }
}

if (! function_exists('plural')) {
    /**
     * Get the correct plural form of a word based on the given number (Russian language).
     *
     * Handles Russian pluralization rules:
     * - Form 0: nominative singular (1, 21, 31... but not 11)
     * - Form 1: genitive singular (2-4, 22-24... but not 12-14)
     * - Form 2: genitive plural (0, 5-20, 25-30...)
     *
     * @param int|float $n The number to determine plural form
     * @param array<int, string> $forms Array of word forms [nominative_singular, genitive_singular, genitive_plural]
     * @param bool $includeNumber Whether to prepend the number to the result
     * @return string The formatted string with correct plural form
     *
     * @example plural(1, ['яблоко', 'яблока', 'яблок']) // "1 яблоко"
     * @example plural(5, ['яблоко', 'яблока', 'яблок']) // "5 яблок"
     * @example plural(2, ['день', 'дня', 'дней'], false) // "дня"
     * @example plural(0, ['товар', 'товара', 'товаров']) // "0 товаров"
     * @example plural(1.5, ['яблоко', 'яблока', 'яблок']) // "1.5 яблока"
     */
    function plural(int|float $n, array $forms, bool $includeNumber = true): string
    {
        if (count($forms) !== 3) {
            throw new InvalidArgumentException('Forms array must contain exactly 3 elements');
        }

        $absN = abs($n);

        if (is_float($absN)) {
            $word = $forms[1];
        } else {
            $lastDigit = $absN % 10;
            $lastTwoDigits = $absN % 100;

            if ($lastDigit == 1 && $lastTwoDigits != 11) {
                $word = $forms[0];
            } elseif ($lastDigit >= 2 && $lastDigit <= 4 &&
                    ($lastTwoDigits < 10 || $lastTwoDigits >= 20)) {
                $word = $forms[1];
            } else {
                $word = $forms[2];
            }
        }

        return $includeNumber ? $n . ' ' . $word : $word;
    }
}
