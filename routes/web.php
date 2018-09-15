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

Route::middleware('auth:web')->put('/api/staff', 'HomeController@updateStaff')->name('update-staff');

Route::middleware('auth:web')->post('/api/staff/delete', 'HomeController@deleteStaff')->name('delete-staff');

Route::middleware('auth:web')->get('/api/checkMasterSlave', 'HomeController@checkMasterSlave')->name('master-slave');

Route::middleware('auth:web')->get('/api/ping', 'HomeController@ping')->name('ping');

Route::middleware('auth:web')->get('/api/getStaffPerDay', 'HomeController@getStaffPerDay')->name('getStaffPerDay');
Route::middleware('auth:web')->get('/api/getCustomersByHour', 'HomeController@getCustomersByHour')->name('getCustomersByHour');
Route::middleware('auth:web')->get('/api/getCustomersByMonth', 'HomeController@getCustomersByMonth')->name('getCustomersByMonth');
Route::middleware('auth:web')->get('/api/getCustomersByStaff', 'HomeController@getCustomersByStaff')->name('getCustomersByStaff');
