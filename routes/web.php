<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    [$quote, $author] = array_map('trim', explode('-', Inspiring::quotes()->random()));
    return Inertia::render('Welcome', compact('quote', 'author'));
})->name('welcome');
