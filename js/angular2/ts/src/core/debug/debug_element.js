System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1;
    var DebugElement, DebugElement_, Scope;
    /**
     * Returns a {@link DebugElement} for an {@link ElementRef}.
     *
     * @param {ElementRef}: elementRef
     * @return {DebugElement}
     */
    function inspectElement(elementRef) {
        return new DebugElement_(elementRef.internalElement);
    }
    exports_1("inspectElement", inspectElement);
    /**
     * Maps an array of {@link DebugElement}s to an array of native DOM elements.
     */
    function asNativeElements(arr) {
        return arr.map(function (debugEl) { return debugEl.nativeElement; });
    }
    exports_1("asNativeElements", asNativeElements);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * A DebugElement contains information from the Angular compiler about an
             * element and provides access to the corresponding ElementInjector and
             * underlying DOM Element, as well as a way to query for children.
             *
             * A DebugElement can be obtained from a {@link ComponentFixture} or from an
             * {@link ElementRef} via {@link inspectElement}.
             */
            DebugElement = (function () {
                function DebugElement() {
                }
                Object.defineProperty(DebugElement.prototype, "componentInstance", {
                    /**
                     * Return the instance of the component associated with this element, if any.
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(DebugElement.prototype, "nativeElement", {
                    /**
                     * Return the native HTML element for this DebugElement.
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(DebugElement.prototype, "elementRef", {
                    /**
                     * Return an Angular {@link ElementRef} for this element.
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(DebugElement.prototype, "children", {
                    /**
                     * Get child DebugElements from within the Light DOM.
                     *
                     * @return {DebugElement[]}
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(DebugElement.prototype, "componentViewChildren", {
                    /**
                     * Get the root DebugElement children of a component. Returns an empty
                     * list if the current DebugElement is not a component root.
                     *
                     * @return {DebugElement[]}
                     */
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                ;
                /**
                 * Return the first descendant TestElement matching the given predicate
                 * and scope.
                 *
                 * @param {Function: boolean} predicate
                 * @param {Scope} scope
                 *
                 * @return {DebugElement}
                 */
                DebugElement.prototype.query = function (predicate, scope) {
                    if (scope === void 0) { scope = Scope.all; }
                    var results = this.queryAll(predicate, scope);
                    return results.length > 0 ? results[0] : null;
                };
                /**
                 * Return descendant TestElememts matching the given predicate
                 * and scope.
                 *
                 * @param {Function: boolean} predicate
                 * @param {Scope} scope
                 *
                 * @return {DebugElement[]}
                 */
                DebugElement.prototype.queryAll = function (predicate, scope) {
                    if (scope === void 0) { scope = Scope.all; }
                    var elementsInScope = scope(this);
                    return elementsInScope.filter(predicate);
                };
                return DebugElement;
            })();
            exports_1("DebugElement", DebugElement);
            DebugElement_ = (function (_super) {
                __extends(DebugElement_, _super);
                function DebugElement_(_appElement) {
                    _super.call(this);
                    this._appElement = _appElement;
                }
                Object.defineProperty(DebugElement_.prototype, "componentInstance", {
                    get: function () {
                        if (!lang_1.isPresent(this._appElement)) {
                            return null;
                        }
                        return this._appElement.getComponent();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugElement_.prototype, "nativeElement", {
                    get: function () { return this.elementRef.nativeElement; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugElement_.prototype, "elementRef", {
                    get: function () { return this._appElement.ref; },
                    enumerable: true,
                    configurable: true
                });
                DebugElement_.prototype.getDirectiveInstance = function (directiveIndex) {
                    return this._appElement.getDirectiveAtIndex(directiveIndex);
                };
                Object.defineProperty(DebugElement_.prototype, "children", {
                    get: function () {
                        return this._getChildElements(this._appElement.parentView, this._appElement);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugElement_.prototype, "componentViewChildren", {
                    get: function () {
                        if (!lang_1.isPresent(this._appElement.componentView)) {
                            // The current element is not a component.
                            return [];
                        }
                        return this._getChildElements(this._appElement.componentView, null);
                    },
                    enumerable: true,
                    configurable: true
                });
                DebugElement_.prototype.triggerEventHandler = function (eventName, eventObj) {
                    this._appElement.parentView.triggerEventHandlers(eventName, eventObj, this._appElement.proto.index);
                };
                DebugElement_.prototype.hasDirective = function (type) {
                    if (!lang_1.isPresent(this._appElement)) {
                        return false;
                    }
                    return this._appElement.hasDirective(type);
                };
                DebugElement_.prototype.inject = function (type) {
                    if (!lang_1.isPresent(this._appElement)) {
                        return null;
                    }
                    return this._appElement.get(type);
                };
                DebugElement_.prototype.getLocal = function (name) { return this._appElement.parentView.locals.get(name); };
                /** @internal */
                DebugElement_.prototype._getChildElements = function (view, parentAppElement) {
                    var _this = this;
                    var els = [];
                    for (var i = 0; i < view.appElements.length; ++i) {
                        var appEl = view.appElements[i];
                        if (appEl.parent == parentAppElement) {
                            els.push(new DebugElement_(appEl));
                            var views = appEl.nestedViews;
                            if (lang_1.isPresent(views)) {
                                views.forEach(function (nextView) { els = els.concat(_this._getChildElements(nextView, null)); });
                            }
                        }
                    }
                    return els;
                };
                return DebugElement_;
            })(DebugElement);
            exports_1("DebugElement_", DebugElement_);
            /**
             * Set of scope functions used with {@link DebugElement}'s query functionality.
             */
            Scope = (function () {
                function Scope() {
                }
                /**
                 * Scope queries to both the light dom and view of an element and its
                 * children.
                 *
                 * ## Example
                 *
                 * {@example core/debug/ts/debug_element/debug_element.ts region='scope_all'}
                 */
                Scope.all = function (debugElement) {
                    var scope = [];
                    scope.push(debugElement);
                    debugElement.children.forEach(function (child) { return scope = scope.concat(Scope.all(child)); });
                    debugElement.componentViewChildren.forEach(function (child) { return scope = scope.concat(Scope.all(child)); });
                    return scope;
                };
                /**
                 * Scope queries to the light dom of an element and its children.
                 *
                 * ## Example
                 *
                 * {@example core/debug/ts/debug_element/debug_element.ts region='scope_light'}
                 */
                Scope.light = function (debugElement) {
                    var scope = [];
                    debugElement.children.forEach(function (child) {
                        scope.push(child);
                        scope = scope.concat(Scope.light(child));
                    });
                    return scope;
                };
                /**
                 * Scope queries to the view of an element of its children.
                 *
                 * ## Example
                 *
                 * {@example core/debug/ts/debug_element/debug_element.ts region='scope_view'}
                 */
                Scope.view = function (debugElement) {
                    var scope = [];
                    debugElement.componentViewChildren.forEach(function (child) {
                        scope.push(child);
                        scope = scope.concat(Scope.light(child));
                    });
                    return scope;
                };
                return Scope;
            })();
            exports_1("Scope", Scope);
        }
    }
});
//# sourceMappingURL=debug_element.js.map