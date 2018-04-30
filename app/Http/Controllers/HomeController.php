<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use File;
use Carbon\Carbon;

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

    public function getStaff(Request $request)
    {
        $userId = \Auth::user()->id;

        $currentTime = $request->get('currentTime');

        $currentTime = Carbon::parse($currentTime);

        $staff = \DB::table('staff')
            ->where('user_id', $userId)
            ->where('created_at', '>=', $currentTime->startOfDay())
            ->orderBy('updated_at', 'ASC')
            ->get();

        foreach ($staff as $member) {
            $member->created_at = Carbon::parse($member->created_at)->toIso8601String();
            $member->updated_at = Carbon::parse($member->updated_at)->toIso8601String();
        }

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
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        return response()->json($staff);
    }

    public function updateStaff(Request $request)
    {
        $userId = \Auth::user()->id;

        $firstName = $request->get('first_name');
        $lastName = $request->get('last_name');

        if ($request->filled('engaged_at')) {
            $isAvailable = false;
        } else {
            $isAvailable = true;
        }

        \DB::table('staff')->where([
            'user_id' => $userId,
            'first_name' => $firstName,
            'last_name' => $lastName,
        ])->update([
            'is_available' => $isAvailable,
            'updated_at' => Carbon::now(),
        ]);

        return response()->json([], 200);
    }

    public function deleteStaff(Request $request)
    {
        $userId = \Auth::user()->id;

        $firstName = $request->get('first_name');
        $lastName = $request->get('last_name');

        \DB::table('staff')->where([
            'user_id' => $userId,
            'first_name' => $firstName,
            'last_name' => $lastName,
        ])->delete();

        return response()->json([], 200);
    }
}
