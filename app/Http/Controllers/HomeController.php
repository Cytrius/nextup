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

    /**
     * Return the number of staff on the available list per day
     **/
    public function getStaffPerDay(Request $request) {
        $userId = \Auth::user()->id;
        return response()->json([], 200);
    }

    /**
     * Return the number of customers each hour on average for the last 30 days
     **/
    public function getCustomersByHour(Request $request) {
        $userId = \Auth::user()->id;

        $pdo = \DB::connection()->getPdo();

        $query = 'SELECT `the_hour` as hour,AVG(`the_count`) as avg FROM (SELECT DATE(`created_at`) AS the_day,HOUR(`created_at`) AS the_hour, count(*) AS the_count FROM `events` WHERE `action` = "customer" AND `user_id` = '.$userId.' AND created_at BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() GROUP BY the_day,the_hour) AS s GROUP BY the_hour';

        $results = $pdo->query($query)->fetchAll(\PDO::FETCH_ASSOC);

        return response()->json($results, 200);
    }
    /**
     * Return the number of customers each month for the given month
     **/
    public function getCustomersByMonth(Request $request) {
        $userId = \Auth::user()->id;

        $pdo = \DB::connection()->getPdo();

        $query = 'select DAY(created_at) as date, MONTH(created_at) as month, count(*) as count from events where `action` = \'customer\' and `user_id` = '.$userId.' and created_at BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() group by DAY(created_at), MONTH(created_at)';

        $results = $pdo->query($query)->fetchAll(\PDO::FETCH_ASSOC);

        foreach($results as &$result) {
            $result['label'] = $result['month'].'/'.$result['date'];
        }

        return response()->json($results, 200);
    }
    /**
     * Return the number of customers total for each staff member
     * for the last 30 days
     **/
    public function getCustomersByStaff(Request $request) {
        $userId = \Auth::user()->id;

        $pdo = \DB::connection()->getPdo();

        $query = 'SELECT staff_id, AVG(`the_count`) as avg FROM (SELECT DATE(`created_at`) AS the_day, staff_id, count(*) AS the_count FROM `events` WHERE `action` = "customer" and `user_id` = '.$userId.' AND created_at BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() GROUP BY the_day,staff_id) AS s GROUP BY staff_id';

        $results = $pdo->query($query)->fetchAll(\PDO::FETCH_ASSOC);

        foreach($results as &$result) {
            $result['staff'] = \DB::table('staff')->find($result['staff_id']);
        }

        return response()->json($results, 200);
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
