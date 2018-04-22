<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use File;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return File::get(public_path() . '/dist/index.html');
    }

    public function getStaff()
    {
        $userId = \Auth::user()->id;

        $staff = \DB::table('staff')->where('user_id', $userId)->get();

        return response()->json($staff);
    }

    public function addStaff(Request $request)
    {
        $userId = \Auth::user()->id;

        $staff = \DB::table('staff')->insert([
            'user_id' => $userId,
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'is_available' => true,
            'index' => 0,
        ]);

        return response()->json($staff);
    }
}
