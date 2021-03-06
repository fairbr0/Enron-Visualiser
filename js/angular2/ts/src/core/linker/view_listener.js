System.register(['angular2/src/core/di'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var di_1;
    var AppViewListener;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            /**
             * Listener for view creation / destruction.
             */
            AppViewListener = (function () {
                function AppViewListener() {
                }
                AppViewListener.prototype.onViewCreated = function (view) { };
                AppViewListener.prototype.onViewDestroyed = function (view) { };
                AppViewListener = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AppViewListener);
                return AppViewListener;
            })();
            exports_1("AppViewListener", AppViewListener);
        }
    }
});
//# sourceMappingURL=view_listener.js.map