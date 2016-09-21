System.register(['angular2/core', './graph.component', '../services/group.service', './label.component'], function(exports_1) {
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
    var core_1, graph_component_1, group_service_1, label_component_1;
    var GraphMainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (graph_component_1_1) {
                graph_component_1 = graph_component_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (label_component_1_1) {
                label_component_1 = label_component_1_1;
            }],
        execute: function() {
            GraphMainComponent = (function () {
                function GraphMainComponent(_groupService) {
                    this._groupService = _groupService;
                    this.groupColorInfo = [];
                    this.nodeColors = ["#ff5050", "#ff9933", "#ffbb33", "#ff4dff", "#9966ff", "#66b3ff", "#9933ff", "00ff00"];
                }
                GraphMainComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._groupService.getGroups().subscribe(function (response) { return _this.handleResponse(response); });
                    $('.panel').css('max-height', $(window).height());
                };
                GraphMainComponent.prototype.onResize = function (event) {
                    $('.panel').css('max-height', $(window).height());
                };
                GraphMainComponent.prototype.handleResponse = function (response) {
                    this.groups = response;
                    $(".colorSqare").each(function (i) {
                        var group = $(this).attr('id');
                        var id = parseInt(group.split('-')[1]);
                        $('#' + group).css('background-color', this.nodeColors[id % 8]);
                    });
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].id != -1) {
                            this.groupColorInfo.push({ "id": response[i].id, "color": this.nodeColors[response[i].id % 8] });
                        }
                    }
                };
                GraphMainComponent = __decorate([
                    core_1.Component({
                        selector: 'graph-main',
                        directives: [graph_component_1.GraphComponent, label_component_1.LabelComponent],
                        template: "\n  <div class='medium-10 column box_a'>\n\n    <graph></graph>\n  </div>\n  <div class='medium-2 column panel' (window:resize)=\"onResize($event)\">\n    <div id='helperTool'>\n      <h3>Group Visualiser</h3>\n      <p>The graph shown represents important employees in the email dataset.\n      Node (A point on the graph) size indicates a Nodes importance, calculated by centrality.\n      An edge width indicates how often 2 Employees communicated.\n      </p><br>\n      Click on a Node to view:\n      <ul style='padding-left:20px;'>\n        <li>Its Centrality</li>\n        <li>Messages Sent</li>\n        <li>Messages Recieved</li>\n      </ul>\n      <br>\n      <b>Scroll to zoom, drag to move</b>\n      <br><br>\n\n      <h6>Centrality</h6>\n      <p style='font-size:0.8em'>The number of different people an employee talks to. This is a ranking of how important an employee is: more important people will have a higher centrality.</p>\n\n      <h4>Groups</h4>\n      <div class='scrollable'>\n        <div *ngFor=\"#group of groupColorInfo\">\n          <label [group]='group'></label>\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n  ",
                        styles: ["\n    .box_a {\n      background-color:#EEE;\n    }\n    #helperTool {overflow-y: scroll;\n    }\n    .panel {overflow-y: auto;}\n  "]
                    }), 
                    __metadata('design:paramtypes', [group_service_1.GroupService])
                ], GraphMainComponent);
                return GraphMainComponent;
            }());
            exports_1("GraphMainComponent", GraphMainComponent);
        }
    }
});
//# sourceMappingURL=graph-main.component.js.map