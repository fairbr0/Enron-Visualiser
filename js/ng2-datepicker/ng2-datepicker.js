System.register(['./src/components/ng2-datepicker'], function(exports_1) {
    var ng2_datepicker_1;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (ng2_datepicker_1_1) {
                ng2_datepicker_1 = ng2_datepicker_1_1;
                exportStar_1(ng2_datepicker_1_1);
            }],
        execute: function() {
            exports_1("default",{
                directives: [ng2_datepicker_1.DatePicker]
            });
        }
    }
});
//# sourceMappingURL=ng2-datepicker.js.map