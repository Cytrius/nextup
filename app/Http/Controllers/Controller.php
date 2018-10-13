<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\User;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function loginViaShare(Request $request) {
        $token = $request->get('share');

        $user = User::where('share_token', $token)->first();

        if (!$user) {
            return redirect('login');
        }

        \Auth::login($user);

        $request->session()->put('status', 'slave');

        return redirect('home');
    }
}
