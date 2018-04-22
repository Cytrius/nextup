<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::middleware('auth:web')->get('/home/{a?}/{b?}/{c?}', 'HomeController@index')->name('home');

Route::middleware('auth:web')->get('/api/staff', 'HomeController@getStaff')->name('list-staff');

Route::middleware('auth:web')->post('/api/staff', 'HomeController@addStaff')->name('add-staff');
