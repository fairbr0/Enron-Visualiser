System.register([], function(exports_1) {
    var RenderComponentType, Renderer, RootRenderer;
    return {
        setters:[],
        execute: function() {
            RenderComponentType = (function () {
                function RenderComponentType(id, encapsulation, styles) {
                    this.id = id;
                    this.encapsulation = encapsulation;
                    this.styles = styles;
                }
                return RenderComponentType;
            })();
            exports_1("RenderComponentType", RenderComponentType);
            Renderer = (function () {
                function Renderer() {
                }
                return Renderer;
            })();
            exports_1("Renderer", Renderer);
            /**
             * Injectable service that provides a low-level interface for modifying the UI.
             *
             * Use this service to bypass Angular's templating and make custom UI changes that can't be
             * expressed declaratively. For example if you need to set a property or an attribute whose name is
             * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
             * respectively.
             *
             * If you are implementing a custom renderer, you must implement this interface.
             *
             * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
             */
            RootRenderer = (function () {
                function RootRenderer() {
                }
                return RootRenderer;
            })();
            exports_1("RootRenderer", RootRenderer);
        }
    }
});
//# sourceMappingURL=api.js.map