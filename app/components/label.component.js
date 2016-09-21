System.register(['angular2/core'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var LabelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            LabelComponent = (function () {
                function LabelComponent() {
                }
                LabelComponent.prototype.ngAfterViewInit = function () {
                    $('.colorSqare').css('background-color', this.group.color);
                };
                LabelComponent.prototype.ngOnInit = function () {
                    this.url = window.location.host;
                };
                LabelComponent = __decorate([
                    core_1.Component({
                        selector: 'label',
                        template: "\n    <div class='colorSquare' [style.background]=group.color></div>\n    <p class='graphlabel'>{{group.id}} </p> - <a href='http://{{url}}/#/group-message-rates/{{group.id}}'>Message Rates</a>\n  ",
                        inputs: ['group'],
                        styles: ["\n    .colorSquare {\n      width:30px;\n      height:30px;\n      display:inline-block;\n      -moz-border-radius: 15px;\n      -webkit-border-radius: 15px;\n      border-radius: 15px; /* future proofing */\n      border:5px solid #eee;\n    }\n    .graphlabel{\n      display:inline-block;\n      padding-left:5px;\n      font-size:1.7em;\n    }\n\n"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LabelComponent);
                return LabelComponent;
            }());
            exports_1("LabelComponent", LabelComponent);
        }
    }
});
//# sourceMappingURL=label.component.js.map