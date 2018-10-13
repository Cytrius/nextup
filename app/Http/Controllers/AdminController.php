<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use File;
use Carbon\Carbon;
use App\User;

class AdminController extends Controller
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
     * Return a list of users in the system
     **/
    public function getUsers(Request $request) {
        if (!\Auth::user()->is_admin) {
            return response()->json([], 403);
        }

        $users = User::where('confirmed', true)->withCount('events')->whereHas('events', function($event) {
            $event->where('created_at', '>', Carbon::now()->subDays(30));
        })->orderBy('events_count', 'DESC')->get();

        return response()->json($users, 200);
    }

    /**
     * Return a list of users in the system
     **/
    public function getRecentRegistrations(Request $request) {
        if (!\Auth::user()->is_admin) {
            return response()->json([], 403);
        }

        $users = User::where('confirmed', true)->where('created_at', '>', Carbon::now()->subDays(30))->withCount('events')->whereHas('events', function($event) {
            $event->where('created_at', '>', Carbon::now()->subDays(30));
        })->orderBy('events_count', 'DESC')->get();

        return response()->json($users, 200);
    }

    /**
     * Return the account activity for a given user
     * for the last 30 days
     **/
    public function getAccountActivity(Request $request) {
        if (!\Auth::user()->is_admin) {
            return response()->json([], 403);
        }

        $userId = $request->get('user_id');

        $pdo = \DB::connection()->getPdo();

        $query = 'select DAY(created_at) as date, MONTH(created_at) as month, count(*) as count from events where `user_id` = '.$userId.' and created_at BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() + INTERVAL 1 DAY group by DAY(created_at), MONTH(created_at)';

        $results = $pdo->query($query)->fetchAll(\PDO::FETCH_ASSOC);

        foreach($results as &$result) {
            $result['label'] = $result['month'].'/'.$result['date'];
        }

        return response()->json($results, 200);
    }

    /**
     * Return the top active user today
     **/
    public function getActiveUsersToday(Request $request) {
        if (!\Auth::user()->is_admin) {
            return response()->json([], 403);
        }

        $userId = $request->get('user_id');

        $pdo = \DB::connection()->getPdo();

        $query = 'select count(*) as count, user_id from events where created_at BETWEEN CURDATE() - INTERVAL 1 DAY AND CURDATE() + INTERVAL 1 DAY group by user_id order by count DESC';

        $results = $pdo->query($query)->fetchAll(\PDO::FETCH_ASSOC);

        return response()->json($results, 200);
    }

    /**
     * Return the top active user for the month
     **/
    public function getActiveUsersWeek(Request $request) {
        if (!\Auth::user()->is_admin) {
            return response()->json([], 403);
        }

        $userId = $request->get('user_id');

        $pdo = \DB::connection()->getPdo();

        $query = 'select count(*) as count, user_id from events where created_at BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() + INTERVAL 1 DAY group by user_id order by count DESC';

        $results = $pdo->query($query)->fetchAll(\PDO::FETCH_ASSOC);

        return response()->json($results, 200);
    }

    /**
     * Return the top active user for the month
     **/
    public function getActiveUsersMonth(Request $request) {
        if (!\Auth::user()->is_admin) {
            return response()->json([], 403);
        }

        $userId = $request->get('user_id');

        $pdo = \DB::connection()->getPdo();

        $query = 'select count(*) as count, user_id from events where created_at BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() + INTERVAL 1 DAY group by user_id order by count DESC';

        $results = $pdo->query($query)->fetchAll(\PDO::FETCH_ASSOC);

        return response()->json($results, 200);
    }
}
