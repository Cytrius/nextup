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

    public function ping() {
        return response()->json();
    }

    public function checkMasterSlave(Request $request)
    {
        $userId = \Auth::user()->id;

        $isPremium = \Auth::user()->premium;

        $sessionCount = \DB::table('sessions')->where('user_id', $userId)->where('last_activity', '>', strtotime('now -2 minute'))->count();

        return response()->json([
            'master' => $sessionCount <= 1
        ]);
    }

    public function getStaff(Request $request)
    {
        $userId = \Auth::user()->id;

        $isPremium = \Auth::user()->premium;

        $currentTime = $request->get('currentTime');

        $currentTime = Carbon::parse($currentTime);

        $staff = \DB::table('staff')
            ->where('user_id', $userId);

        if (!$isPremium) {
            $staff->where('local_at', '>=', $currentTime->startOfDay());
        }

        $staff = $staff->orderBy('updated_at', 'ASC')
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

        $currentTime = $request->get('currentTime');

        $currentTime = Carbon::parse($currentTime);

        $staff = \DB::table('staff')->insert([
            'user_id' => $userId,
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'is_available' => true,
            'index' => 0,
            'local_at' => $currentTime,
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

        $staff = \DB::table('staff')->where([
            'user_id' => $userId,
            'first_name' => $firstName,
            'last_name' => $lastName,
        ])->first();

        \DB::table('events')->insert([
            'user_id' => $userId,
            'staff_id' => $staff->id,
            'action' => $isAvailable ? 'available' : 'customer',
            'updated_at' => Carbon::now(),
            'created_at' => Carbon::now(),
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
