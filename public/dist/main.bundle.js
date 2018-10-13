webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<link rel=\"stylesheet\"\n      href=\"/font-awesome/css/font-awesome.min.css\">\n<nav class=\"navbar navbar-default navbar-static-top\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n\n      <!-- Collapsed Hamburger -->\n      <button type=\"button\"\n              class=\"navbar-toggle collapsed\"\n              data-toggle=\"collapse\"\n              data-target=\"#app-navbar-collapse\"\n              aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle Navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n\n      <!-- Branding Image -->\n      <a class=\"navbar-brand\"\n         href=\"/home\">\n        <img src=\"/img/logo.png\">\n      </a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\"\n         id=\"app-navbar-collapse\">\n      <!-- Left Side Of Navbar -->\n      <ul class=\"nav navbar-nav\">\n        <li class=\"hidden-xs\">\n          <p class=\"navbar-text\">{{ timeNow | async | date:'medium' }}</p>\n        </li>\n      </ul>\n\n      <!-- Right Side Of Navbar -->\n      <ul class=\"nav navbar-nav navbar-right\">\n        <!-- Authentication Links -->\n        <li>\n          <a (click)=\"showStaff()\">Staff</a>\n        </li>\n        <ng-container *ngIf=\"!isSlave\">\n          <li *ngIf=\"isPremium\">\n            <a (click)=\"showStats()\">Statistics</a>\n          </li>\n          <li *ngIf=\"isPremium\">\n            <a (click)=\"share()\">Share</a>\n          </li>\n        </ng-container>\n        <li>\n          <a href=\"/logout\"\n             (click)=\"logout($event)\">Logout</a>\n          <form id=\"logout-form\"\n                action=\"/logout\"\n                method=\"POST\"\n                style=\"display: none;\">\n          </form>\n        </li>\n        <!--<li class=\"admin\" *ngIf=\"!isPremium\">\n          <a href=\"#\" id=\"customButton\">Upgrade</a>\n        </li>-->\n        <li class=\"admin\" *ngIf=\"isAdmin\">\n          <a (click)=\"showAdmin()\">Admin</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>\n\n<div *ngIf=\"isShowingStats\" class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading clearfix\">\n          <div class=\"panel-title pull-left\">Average Customers Per Hour (Last 30)</div>\n        </div>\n\n        <div class=\"panel-body clearfix\">\n\n          <canvas id=\"averageCustomersPerHour\" style=\"width:100%; height:400px;\" height=\"400\"></canvas>\n\n        </div>\n      </div>\n\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading clearfix\">\n          <div class=\"panel-title pull-left\">Total Customers Per Day (Last 30)</div>\n        </div>\n\n        <div class=\"panel-body clearfix\">\n\n          <canvas id=\"totalCustomersPerDay\" style=\"width:100%; height:400px;\" height=\"400\"></canvas>\n\n        </div>\n      </div>\n\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading clearfix\">\n          <div class=\"panel-title pull-left\">Average Customers Per Staff Member (Last 30)</div>\n        </div>\n\n        <div class=\"panel-body clearfix\">\n\n          <canvas id=\"averageCustomersPerStaff\" style=\"width:100%; height:400px;\" height=\"400\"></canvas>\n\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n\n<div *ngIf=\"isShowingAdmin\" class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-3\">\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading clearfix\">\n          <div class=\"panel-title pull-left\">Active Users</div>\n        </div>\n\n        <div class=\"panel-body clearfix\">\n\n          <table class=\"table table-striped table-hover\">\n            <thead>\n              <tr><th>Name</th><th style=\"text-align:right;\">Events</th></tr>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"let user of adminUsers\" (click)=\"setActiveUserId(user.id)\" [class.active]=\"activeUserId === user.id\">\n              <td>{{ user.name }}</td>\n              <td style=\"text-align:right;\">{{ user.events_count || 0 }}</td>\n            </tr>\n          </tbody>\n          </table>\n\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-9\">\n\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading clearfix\">\n          <div class=\"panel-title pull-left\">Individual Account Activities (Last 30 Days)</div>\n        </div>\n\n        <div class=\"panel-body clearfix\">\n\n          <canvas id=\"adminActivityChart\" style=\"width:100%; height:400px;\" height=\"400\"></canvas>\n\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-4\">\n          <div class=\"panel panel-default\">\n            <div class=\"panel-heading clearfix\">\n              <div class=\"panel-title pull-left\">Active Users Today</div>\n            </div>\n\n            <div class=\"panel-body clearfix\">\n\n          <table *ngIf=\"adminActiveUsersToday?.length\" class=\"table table-striped\">\n            <tr *ngFor=\"let user of adminActiveUsersToday\">\n              <td>{{ getUserFromId(user.user_id)?.name }}</td>\n            </tr>\n          </table>\n\n          <p *ngIf=\"!adminActiveUsersToday?.length\">No active users</p>\n\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"panel panel-default\">\n            <div class=\"panel-heading clearfix\">\n              <div class=\"panel-title pull-left\">Weekly Most Active Users</div>\n            </div>\n\n            <div class=\"panel-body clearfix\">\n\n          <table *ngIf=\"adminActiveUsersWeek?.length\" class=\"table table-striped\">\n            <tr *ngFor=\"let user of adminActiveUsersWeek\">\n              <td>{{ getUserFromId(user.user_id)?.name}}</td>\n            </tr>\n          </table>\n\n          <p *ngIf=\"!adminActiveUsersWeek?.length\">No active users</p>\n\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-4\">\n          <div class=\"panel panel-default\">\n            <div class=\"panel-heading clearfix\">\n              <div class=\"panel-title pull-left\">Monthly Most Active Users</div>\n            </div>\n\n            <div class=\"panel-body clearfix\">\n\n          <table *ngIf=\"adminActiveUsersMonth?.length\" class=\"table table-striped\">\n            <tr *ngFor=\"let user of adminActiveUsersMonth\">\n              <td>{{ getUserFromId(user.user_id)?.name }}</td>\n            </tr>\n          </table>\n\n          <p *ngIf=\"!adminActiveUsersMonth?.length\">No active users</p>\n\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading clearfix\">\n          <div class=\"panel-title pull-left\">Recent Registrations</div>\n        </div>\n\n        <div class=\"panel-body clearfix\">\n\n          <table *ngIf=\"adminRecentRegistrations?.length\" class=\"table table-striped\">\n            <thead>\n              <tr>\n                <th>Name</th>\n                <th>Email</th>\n                <th>Date Registered</th>\n                <th>Events (30 Days)</th>\n              </tr>\n            </thead>\n            <tr *ngFor=\"let user of adminRecentRegistrations\">\n              <td>{{ user.name }}</td>\n              <td>{{ user.email }}</td>\n              <td>{{ user.created_at | date:'mediumDate' }}</td>\n              <td>{{ user.events_count }}</td>\n            </tr>\n          </table>\n\n          <p *ngIf=\"!adminRecentRegistrations?.length\">No registrations in the last 30 days</p>\n\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n\n<div *ngIf=\"!isShowingStats && !isShowingAdmin\" class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading clearfix\">\n          <div class=\"panel-title pull-left\">Available</div>\n          <button type=\"button\" *ngIf=\"!isSlave\"\n                  (click)=\"engageNext()\"\n                  class=\"btn btn-success pull-right\"\n                  [class.disabled]=\"!staff.length\">\n            Guest\n          </button>\n          <button type=\"button\" *ngIf=\"!isSlave\"\n                  (click)=\"skip()\"\n                  class=\"btn btn-warning btn-margin pull-right\"\n                  [class.disabled]=\"!staff.length || staff.length === 1\">\n            Skip\n          </button>\n        </div>\n\n        <div class=\"panel-body clearfix\">\n          <h1 *ngIf=\"staff.length\"\n              class=\"next-up pull-left\">{{ getNextUpName().first_name }} {{ getNextUpName ().last_name }}</h1>\n          <h1 *ngIf=\"!staff.length\"\n              class=\"next-up pull-left\">No Staff Available</h1>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading clearfix\">\n          <div class=\"panel-title pull-left\">Available</div>\n\n          <button type=\"button\" *ngIf=\"!isSlave\"\n                  (click)=\"addStaff()\"\n                  class=\"btn btn-primary pull-right\">\n            Add Staff\n          </button>\n          <i *ngIf=\"!staff.length && !engaged.length\"\n             class=\"fa fa-arrow-right fa-2x pull-right bounce\"></i>\n        </div>\n\n        <div class=\"panel-body\">\n\n          <table class=\"table\">\n            <thead>\n              <tr>\n                <th>#</th>\n                <th>Name</th>\n                <th>Signed In</th>\n                <th></th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let member of staff; let index=index;\">\n                <th scope=\"row\">{{ index+1 }}</th>\n                <td>{{ member.first_name }} {{ member.last_name }}</td>\n                <td class=\"time\">{{ member.time_in | date:'mediumTime' }}</td>\n                <td>\n                  <i (click)=\"removeStaff(index)\" *ngIf=\"!isSlave\"\n                     class=\"fa fa-button fa-danger fa-fw fa-close\"></i>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-md-6\">\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading clearfix\">\n          <div class=\"panel-title pull-left\">Unavailable</div>\n        </div>\n\n        <div class=\"panel-body\">\n\n          <table class=\"table\">\n            <thead>\n              <tr>\n                <th>Name</th>\n                <th>Time</th>\n                <th></th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let member of engaged; let index=index;\">\n                <td>{{ member.first_name }} {{ member.last_name }}</td>\n                <td class=\"time\">{{ member.engaged_at | date:'mediumTime' }}</td>\n                <td>\n                  <i (click)=\"addStaff(member, index)\" *ngIf=\"!isSlave\"\n                     class=\"fa fa-button fa-success fa-fw fa-check\"></i>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n\n<div class=\"modal fade\"\n     id=\"staffModal\"\n     tabindex=\"-1\"\n     role=\"dialog\">\n  <div class=\"modal-dialog\"\n       role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\"\n                class=\"close\"\n                data-dismiss=\"modal\"\n                aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <h4 class=\"modal-title\">Add Staff</h4>\n      </div>\n      <div class=\"modal-body\">\n        <form>\n          <div class=\"form-group\">\n            <label>First Name</label>\n            <input type=\"text\"\n                   [(ngModel)]=\"register.first_name\"\n                   (keypress)=\"modalKeyPress($event)\"\n                   name=\"first_name\"\n                   class=\"form-control\"\n                   placeholder=\"John\">\n          </div>\n          <div class=\"form-group\">\n            <label>Last Name</label>\n            <input type=\"text\"\n                   [(ngModel)]=\"register.last_name\"\n                   (keypress)=\"modalKeyPress($event)\"\n                   name=\"last_name\"\n                   class=\"form-control\"\n                   placeholder=\"Smith\">\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\"\n                class=\"btn btn-default\"\n                data-dismiss=\"modal\">Cancel</button>\n        <button type=\"button\"\n                [class.disabled]=\"!register.last_name || !register.first_name\"\n                (click)=\"registerMember()\"\n                class=\"btn btn-success\">OK</button>\n      </div>\n    </div>\n    <!-- /.modal-content -->\n  </div>\n  <!-- /.modal-dialog -->\n</div>\n<!-- /.modal -->\n\n\n<div class=\"modal fade\"\n     id=\"shareModal\"\n     tabindex=\"-1\"\n     role=\"dialog\">\n  <div class=\"modal-dialog\"\n       role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\"\n                class=\"close\"\n                data-dismiss=\"modal\"\n                aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <h4 class=\"modal-title\">Share</h4>\n      </div>\n      <div class=\"modal-body\" style=\"text-align:center;\">\n        <strong>Link to share:</strong>\n        <br/><br/>\n        <input type=\"text\" id=\"shareLinkInput\" style=\"width:90%; background:none; border:1px solid #eee; padding:5px;\" [ngModel]=\"getShareableUrl\">\n        <br/> <br/>\n        <button type=\"button\" (click)=\"copyShareLink()\"\n                class=\"btn btn-primary\">Copy</button>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" data-dismiss=\"modal\"\n                class=\"btn btn-success\">OK</button>\n      </div>\n    </div>\n    <!-- /.modal-content -->\n  </div>\n  <!-- /.modal-dialog -->\n</div>\n<!-- /.modal -->\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  /* Navbar text span */ }\n  :host .navbar-default {\n    background-color: #ffffff; }\n  :host .navbar-brand {\n    padding-top: 0px;\n    padding-bottom: 0px; }\n  :host .navbar-brand img {\n      max-height: 100%; }\n  :host a:hover {\n    cursor: pointer; }\n  :host .nav .admin {\n    border-left: 1px solid #d3e0e8; }\n  :host .navbar-default .navbar-nav > li > span {\n    color: #777;\n    opacity: 0.75; }\n  :host .navbar-nav > li > span {\n    padding-top: 10px;\n    padding-bottom: 10px;\n    line-height: 22px; }\n  :host .nav > li > span {\n    padding: 10px 15px; }\n  :host .nav > li > span {\n    position: relative;\n    display: block; }\n  @media (min-width: 768px) {\n    :host .navbar-nav > li > span {\n      padding-top: 14px;\n      padding-bottom: 14px; } }\n  :host .btn.disabled {\n    opacity: 0.5; }\n  :host .btn-primary {\n    background-color: #778f9e;\n    border-color: #778f9e; }\n  :host .btn-primary:hover {\n      background-color: #698393;\n      border-color: #698393; }\n  :host .btn-success {\n    background-color: #95c494;\n    border-color: #95c494; }\n  :host .btn-success:hover {\n      background-color: #85bb84;\n      border-color: #85bb84; }\n  :host .btn-warning {\n    background-color: #9d9d77;\n    border-color: #9d9d77; }\n  :host .btn-warning:hover {\n      background-color: #929269;\n      border-color: #929269; }\n  :host .btn-default {\n    background-color: #c4c9cc;\n    border-color: #c4c9cc; }\n  :host .btn-default:hover {\n      background-color: #b6bcc0;\n      border-color: #b6bcc0; }\n  :host .next-up {\n    margin: 0.5em; }\n  :host .panel-heading {\n    min-height: 56px; }\n  :host .panel-title {\n    line-height: 35px; }\n  :host .btn-margin {\n    margin-right: 1em; }\n  :host .time {\n    font-family: monospace; }\n  :host .btn.disabled {\n    pointer-events: none; }\n  :host .fa-button {\n    float: right;\n    cursor: pointer;\n    padding: 0.25em;\n    color: #fff;\n    border-radius: 5px;\n    min-width: 1.7em;\n    opacity: 0.8; }\n  :host .fa-button:hover {\n      opacity: 1; }\n  :host .fa-button.fa-success {\n      background: #95c494;\n      border: 1px solid #95c494; }\n  :host .fa-button.fa-danger {\n      background: #855d5d;\n      border: 1px solid #855d5d; }\n  :host .bounce {\n    color: #3097d1;\n    margin-right: 0.5em;\n    margin-top: 3px;\n    -webkit-animation: bounce 2s infinite;\n    animation: bounce 2s infinite; }\n  @-webkit-keyframes bounce {\n  0%,\n  20%,\n  50%,\n  80%,\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); }\n  40% {\n    -webkit-transform: translateX(-30px);\n    transform: translateX(-30px); }\n  60% {\n    -webkit-transform: translateX(-15px);\n    transform: translateX(-15px); } }\n  @keyframes bounce {\n  0%,\n  20%,\n  50%,\n  80%,\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); }\n  40% {\n    -webkit-transform: translateX(-30px);\n    transform: translateX(-30px); }\n  60% {\n    -webkit-transform: translateX(-15px);\n    transform: translateX(-15px); } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var httpUrl = '';
var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
        'Content-Type': 'application/json',
    }),
};
var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        this.http = http;
        this.isShowingStats = false;
        this.isShowingAdmin = false;
        this.isSlave = false;
        this.isAdmin = false;
        this.isPremium = false;
        this.timeNow = __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].interval(1000)
            .map(function (x) { return new Date(); })
            .share();
        this.register = {
            first_name: null,
            last_name: null,
        };
        this.staff = [];
        this.engaged = [];
        this.adminUsers = [];
        this.adminActiveUsersToday = [];
        this.adminActiveUsersWeek = [];
        this.adminActiveUsersMonth = [];
        this.adminRecentRegistrations = [];
    }
    AppComponent.prototype.modalKeyPress = function ($event) {
        if ($event.keyCode === 13 && this.register.last_name.length && this.register.first_name.length) {
            this.registerMember();
        }
    };
    AppComponent.prototype.getNextUpName = function () {
        return this.staff[0];
    };
    AppComponent.prototype.engageNext = function () {
        var next = this.staff.splice(0, 1)[0];
        next.engaged_at = new Date();
        this.engaged.unshift(next);
        this.http.put(httpUrl + '/api/staff', next, httpOptions).subscribe(function (res) { });
    };
    AppComponent.prototype.skip = function () {
        var skip = this.staff.splice(0, 1)[0];
        skip.engaged_at = null;
        skip.time_in = new Date();
        this.staff.push(skip);
        this.http.put(httpUrl + '/api/staff', skip, httpOptions).subscribe(function (res) { });
        return;
    };
    AppComponent.prototype.share = function () {
        this.getShareableUrl = window.location.href + '/share?share=' + this.user.share_token;
        $('#shareModal').modal();
    };
    AppComponent.prototype.addStaff = function (member, index) {
        if (typeof member !== 'undefined') {
            this.engaged.splice(index, 1);
            member.engaged_at = null;
            member.time_in = new Date();
            this.staff.push(member);
            this.http.put(httpUrl + '/api/staff', member, httpOptions).subscribe(function (res) { });
            return;
        }
        console.log($('#staffModal'));
        $('#staffModal').modal();
    };
    AppComponent.prototype.registerMember = function () {
        $('#staffModal').modal('hide');
        var member = this.register;
        member.time_in = new Date();
        this.staff.push(member);
        this.register = { first_name: null, last_name: null };
        var localDate = moment().toISOString(true);
        this.http.post(httpUrl + '/api/staff?currentTime=' + localDate, member, httpOptions).subscribe(function (res) { });
    };
    AppComponent.prototype.getTimeSince = function (date) {
        // get total seconds between the times
        var now = new Date();
        var delta = Math.abs(now.getTime() - date.getTime()) / 1000;
        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        // calculate (and subtract) whole minutes
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        // what's left is seconds
        var seconds = delta % 60; // in theory the modulus is not required
        return new Date(now.getFullYear(), now.getMonth(), days, hours, minutes, seconds);
    };
    AppComponent.prototype.removeStaff = function (index) {
        var removed = this.staff.splice(index, 1)[0];
        this.http.post(httpUrl + '/api/staff/delete', removed, httpOptions).subscribe(function (res) { });
    };
    AppComponent.prototype.logout = function ($event) {
        $event.preventDefault();
        document.getElementById('logout-form').submit();
    };
    AppComponent.prototype.loadData = function () {
        var _this = this;
        var localDate = moment().toISOString(true);
        this.http.get(httpUrl + '/api/staff?currentTime=' + localDate).subscribe(function (res) {
            _this.staff = [];
            _this.engaged = [];
            for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                var member = res_1[_i];
                if (member.is_available) {
                    _this.staff.push({
                        first_name: member.first_name,
                        last_name: member.last_name,
                        time_in: new Date(member.updated_at),
                    });
                }
                else {
                    _this.engaged.push({
                        first_name: member.first_name,
                        last_name: member.last_name,
                        engaged_at: new Date(member.updated_at),
                    });
                }
            }
        });
    };
    AppComponent.prototype.checkMasterSlave = function () {
        var _this = this;
        this.http.get(httpUrl + '/api/checkMasterSlave').subscribe(function (res) {
            console.log('checkMasterSlave', res);
            _this.isSlave = !res['master'];
            if (_this.isSlave) {
                setInterval(function () {
                    _this.loadData();
                }, 5000);
            }
        });
    };
    AppComponent.prototype.checkAdmin = function () {
        var _this = this;
        this.http.get(httpUrl + '/api/checkAdmin').subscribe(function (res) {
            console.log('checkAdmin', res);
            _this.isAdmin = res['is_admin'];
            _this.isPremium = res['premium'];
            _this.user = res;
            setTimeout(function () {
                _this.setupStripe();
            });
        });
    };
    AppComponent.prototype.ping = function () {
        this.http.get(httpUrl + '/api/ping').subscribe(function (res) { });
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            $('#staffModal').on('shown.bs.modal', function () {
                $('[name="first_name"]').focus();
            });
        });
        setInterval(function () {
            _this.ping();
        }, 60000);
        this.loadData();
        this.checkMasterSlave();
        this.checkAdmin();
        this.loadStats();
    };
    AppComponent.prototype.showStats = function () {
        this.isShowingStats = true;
        this.isShowingAdmin = false;
        this.loadStats();
    };
    AppComponent.prototype.showStaff = function () {
        this.isShowingStats = false;
        this.isShowingAdmin = false;
    };
    AppComponent.prototype.showAdmin = function () {
        if (this.isAdmin) {
            this.isShowingStats = false;
            this.isShowingAdmin = true;
            this.loadAdminStats();
        }
    };
    AppComponent.prototype.loadStats = function () {
        var _this = this;
        this.http.get(httpUrl + '/api/getStaffPerDay').subscribe(function (res) {
            console.log('getStaffPerDay', res);
        });
        this.http.get(httpUrl + '/api/getCustomersByHour').subscribe(function (res) {
            setTimeout(function () {
                _this.renderChart1(res);
            });
        });
        this.http.get(httpUrl + '/api/getCustomersByMonth').subscribe(function (res) {
            setTimeout(function () {
                _this.renderChart2(res);
            });
        });
        this.http.get(httpUrl + '/api/getCustomersByStaff').subscribe(function (res) {
            setTimeout(function () {
                _this.renderChart3(res);
            });
        });
    };
    AppComponent.prototype.loadAdminStats = function () {
        var _this = this;
        this.http.get(httpUrl + '/api/admin/getUsers').subscribe(function (res) {
            console.log('getUsers', res);
            _this.adminUsers = res;
        });
        this.http.get(httpUrl + '/api/admin/getRecentRegistrations').subscribe(function (res) {
            console.log('getRecentRegistrations', res);
            _this.adminRecentRegistrations = res;
        });
        this.http.get(httpUrl + '/api/admin/getActiveUsersToday').subscribe(function (res) {
            console.log('getActiveUsersToday', res);
            _this.adminActiveUsersToday = res;
        });
        this.http.get(httpUrl + '/api/admin/getActiveUsersWeek').subscribe(function (res) {
            console.log('getActiveUsersWeek', res);
            _this.adminActiveUsersWeek = res;
        });
        this.http.get(httpUrl + '/api/admin/getActiveUsersMonth').subscribe(function (res) {
            console.log('getActiveUsersMonth', res);
            _this.adminActiveUsersMonth = res;
        });
    };
    AppComponent.prototype.setActiveUserId = function (id) {
        var _this = this;
        this.activeUserId = id;
        this.http.get(httpUrl + '/api/admin/getAccountActivity?user_id=' + id).subscribe(function (res) {
            console.log('getAccountActivity', res);
            _this.renderAdminActivtyChart(res);
        });
    };
    AppComponent.prototype.getUserFromId = function (id) {
        return this.adminUsers.find(function (user) { return user.id === id; });
    };
    AppComponent.prototype.renderAdminActivtyChart = function (data) {
        console.log('renderAdminActivtyChart', data);
        var today = new Date();
        var todayDate = today.getDate();
        var labels = [];
        for (var i = 0; i <= 30; i++) {
            var day = new Date();
            day.setDate(day.getDate() - i);
            labels.push(day.getMonth() + 1 + '/' + day.getDate());
        }
        labels.reverse();
        var dayTotals = [];
        var _loop_1 = function (day) {
            var date = data.find(function (d) { return d.label === day; });
            dayTotals.push(date ? date.count : 0);
        };
        for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
            var day = labels_1[_i];
            _loop_1(day);
        }
        if (document.getElementById('adminActivityChart')) {
            var ctx = document.getElementById('adminActivityChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: dayTotals,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                },
                            },
                        ],
                    },
                },
            });
        }
    };
    AppComponent.prototype.renderChart1 = function (data) {
        console.log('getCustomersByHour', data);
        var hours = {};
        for (var i = 0; i <= 23; i++) {
            hours[i] = 0;
        }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var hour = data_1[_i];
            hours[hour.hour] = Number(hour.avg);
        }
        console.log('hours', hours);
        var labels = [];
        for (var _a = 0, _b = Object.keys(hours); _a < _b.length; _a++) {
            var label = _b[_a];
            if (Number(label) < 12)
                labels.push(label + ':00 AM');
            if (Number(label) > 12)
                labels.push(Number(label) - 12 + ':00 PM');
        }
        var hourAvg = [];
        for (var _c = 0, _d = Object.keys(hours); _c < _d.length; _c++) {
            var hour = _d[_c];
            hourAvg.push(hours[hour]);
        }
        if (document.getElementById('averageCustomersPerHour')) {
            var ctx = document.getElementById('averageCustomersPerHour').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: hourAvg,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                },
                            },
                        ],
                    },
                },
            });
        }
    };
    AppComponent.prototype.renderChart2 = function (data) {
        console.log('totalCustomersPerDay', data);
        var today = new Date();
        var todayDate = today.getDate();
        var labels = [];
        for (var i = 0; i <= 30; i++) {
            var day = new Date();
            day.setDate(day.getDate() - i);
            labels.push(day.getMonth() + 1 + '/' + day.getDate());
        }
        labels.reverse();
        var dayTotals = [];
        var _loop_2 = function (day) {
            var date = data.find(function (d) { return d.label === day; });
            dayTotals.push(date ? date.count : 0);
        };
        for (var _i = 0, labels_2 = labels; _i < labels_2.length; _i++) {
            var day = labels_2[_i];
            _loop_2(day);
        }
        if (document.getElementById('totalCustomersPerDay')) {
            var ctx = document.getElementById('totalCustomersPerDay').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: dayTotals,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                },
                            },
                        ],
                    },
                },
            });
        }
    };
    AppComponent.prototype.renderChart3 = function (data) {
        console.log('getCustomersByStaff', data);
        var labels = [];
        var dataAvg = [];
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var avg = data_2[_i];
            if (avg.staff) {
                labels.push(avg.staff.first_name + ' ' + avg.staff.last_name);
            }
            else {
                labels.push('No name');
            }
            dataAvg.push(Number(avg.avg));
        }
        if (document.getElementById('averageCustomersPerStaff')) {
            var ctx = document.getElementById('averageCustomersPerStaff').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: dataAvg,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                },
                            },
                        ],
                    },
                },
            });
        }
    };
    AppComponent.prototype.setupStripe = function () {
        var _this = this;
        this.handler = StripeCheckout.configure({
            key: 'pk_test_38rDpRO9EAsL3ltDPW3V1jlf',
            image: '/img/logo.png',
            locale: 'auto',
            token: function (token) {
                console.log('Got token', token);
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                var payload = {
                    token: token.id,
                };
                _this.http.post(httpUrl + '/api/upgrade', payload, httpOptions).subscribe(function (res) {
                    window.location.reload();
                });
            },
        });
        if (document.getElementById('customButton')) {
            document.getElementById('customButton').addEventListener('click', function (e) {
                // Open Checkout with further options:
                _this.handler.open({
                    name: 'UpSystem',
                    description: 'Monthly Premium Subscription',
                    currency: 'cad',
                    amount: 2000,
                    panelLabel: 'Subscribe',
                    email: _this.user.email,
                    allowRememberMe: false,
                });
                e.preventDefault();
            });
        }
        // Close Checkout on page navigation:
        window.addEventListener('popstate', function () {
            _this.handler.close();
        });
    };
    AppComponent.prototype.copyShareLink = function () {
        /* Get the text field */
        var copyText = document.getElementById('shareLinkInput');
        /* Select the text field */
        copyText.select();
        /* Copy the text inside the text field */
        document.execCommand('copy');
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__since_pipe__ = __webpack_require__("../../../../../src/app/since.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_5__since_pipe__["a" /* TimeSincePipe */]],
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */]],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/since.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeSincePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TimeSincePipe = /** @class */ (function (_super) {
    __extends(TimeSincePipe, _super);
    function TimeSincePipe(ref) {
        return _super.call(this, ref) || this;
    }
    TimeSincePipe.prototype.transform = function (obj) {
        if (obj instanceof Date) {
            this.value = obj;
            if (!this.timer) {
                this.timer = this.getObservable();
            }
            return _super.prototype.transform.call(this, this.timer);
        }
        return _super.prototype.transform.call(this, obj);
    };
    TimeSincePipe.prototype.getObservable = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].interval(1000)
            .startWith(0)
            .map(function () {
            // current time
            var now = new Date();
            // time since message was sent in seconds
            var delta = (now.getTime() - _this.value.getTime()) / 1000;
            // calculate (and subtract) whole days
            var days = Math.floor(delta / 86400);
            delta -= days * 86400;
            // calculate (and subtract) whole hours
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            // calculate (and subtract) whole minutes
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            // what's left is seconds
            var seconds = delta % 60; // in theory the modulus is not required
            return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + Math.round(seconds)).slice(-2);
        });
    };
    TimeSincePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Pipe */])({
            name: 'timeSince',
            pure: false,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], TimeSincePipe);
    return TimeSincePipe;
}(__WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* AsyncPipe */]));



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map