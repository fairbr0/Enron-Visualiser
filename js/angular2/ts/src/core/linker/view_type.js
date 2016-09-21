System.register([], function(exports_1) {
    var ViewType;
    return {
        setters:[],
        execute: function() {
            (function (ViewType) {
                // A view that contains the host element with bound component directive.
                // Contains a COMPONENT view
                ViewType[ViewType["HOST"] = 0] = "HOST";
                // The view of the component
                // Can contain 0 to n EMBEDDED views
                ViewType[ViewType["COMPONENT"] = 1] = "COMPONENT";
                // A view that is embedded into another View via a <template> element
                // inside of a COMPONENT view
                ViewType[ViewType["EMBEDDED"] = 2] = "EMBEDDED";
            })(ViewType || (ViewType = {}));
            exports_1("ViewType", ViewType);
        }
    }
});
//# sourceMappingURL=view_type.js.map