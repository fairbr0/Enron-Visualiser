System.register(['angular2/core', '../services/graph.service'], function(exports_1) {
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
    var core_1, graph_service_1;
    var GraphComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (graph_service_1_1) {
                graph_service_1 = graph_service_1_1;
            }],
        execute: function() {
            GraphComponent = (function () {
                function GraphComponent(_graphService) {
                    this._graphService = _graphService;
                    this.graphSpinner = new Spinner();
                }
                GraphComponent.prototype.getGraph = function () {
                    var _this = this;
                    this._graphService.getGraph().subscribe(function (response) { return _this.handleResponse(response); });
                };
                GraphComponent.prototype.handleResponse = function (response) {
                    this.groups = response;
                    this.nodes = this.groups.nodes;
                    this.edges = this.groups.edges;
                    this.createGraph();
                };
                GraphComponent.prototype.hideLoader = function () {
                    var target = document.getElementById("graph-spin");
                    this.graphSpinner.stop(target);
                    $('#graph-spin').hide();
                };
                GraphComponent.prototype.createGraph = function () {
                    var nodeColors = ["#ff5050", "#ff9933", "#ffbb33", "#ff4dff", "#9966ff", "#66b3ff", "#9933ff"];
                    var edgeColors = ["#ffb3b3", "#ffcc99", "#ffdd99", "#ffb3ff", "#ddccff", "#cce6ff", "#d9b3ff"];
                    var modifiedNode;
                    var addedEdges = [];
                    function getNodeColor(value) {
                        return nodeColors[value % 7];
                    }
                    function getEdgeColor(to) {
                        return edgeColors[to % 7];
                    }
                    function addEdge(data, nodeData) {
                        if (data.source == nodeData.id) {
                            addedEdges.push({
                                group: "edges",
                                data: {
                                    "source": data.source,
                                    "target": data.target,
                                    "weight": data.st
                                },
                                classes: "directedEdge"
                            });
                            addedEdges.push({
                                group: "edges",
                                data: {
                                    "source": data.target,
                                    "target": data.source,
                                    "weight": data.ts
                                },
                                classes: "directedEdge"
                            });
                        }
                        else {
                            addedEdges.push({
                                group: "edges",
                                data: {
                                    "source": data.target,
                                    "target": data.source,
                                    "weight": data.st
                                },
                                classes: "directedEdge"
                            });
                            addedEdges.push({
                                group: "edges",
                                data: {
                                    "source": data.source,
                                    "target": data.target,
                                    "weight": data.ts
                                },
                                classes: "directedEdge"
                            });
                        }
                    }
                    var cy = cytoscape({
                        hideLabelsOnViewport: false,
                        container: document.getElementById('cy'),
                        elements: {
                            nodes: this.nodes,
                            edges: this.edges
                        },
                        style: [
                            {
                                selector: 'node',
                                style: {
                                    'background-color': function (ele) { return getNodeColor(ele.data('group')); },
                                    'width': function (ele) { return Math.max(Math.min(ele.data('centrality') / 100, 100), 7); },
                                    'height': function (ele) { return Math.max(Math.min(ele.data('centrality') / 100, 100), 7); },
                                    'border-color': '#fff',
                                    'border-width': 2,
                                    'content': function (ele) { return ele.data('email').split('@')[0]; },
                                    'text-valign': 'center',
                                    'font-size': 6
                                }
                            },
                            {
                                selector: 'node:selected',
                                style: {
                                    'font-size': 12,
                                    'content': function (ele) { return ele.data('email').split('@')[0] + '\n\nCentrality:' + ele.data('centrality'); }
                                }
                            },
                            {
                                selector: 'edge',
                                style: {
                                    'width': function (ele) { return Math.max(Math.min((ele.data('ts') + ele.data('st')) / 75, 24), 1); },
                                    'line-color': function (ele) { return getEdgeColor(ele.target().data().group); },
                                    'font-size': 8
                                }
                            },
                            {
                                selector: '.connectedNodes',
                                style: {
                                    'font-size': 10
                                }
                            },
                            {
                                selector: '.connectedEdges',
                                style: {
                                    'label': "hfef",
                                    'font-size': 8
                                }
                            },
                            {
                                selector: '.directedEdge',
                                style: {
                                    'label': 'data(weight)',
                                    'font-size': 8,
                                    'width': 2,
                                    'target-arrow-shape': 'triangle',
                                    'line-color': function (ele) { return getEdgeColor(ele.target().data().group); },
                                    'target-arrow-color': function (ele) { return getEdgeColor(ele.target().data().group); },
                                    'z-index': 100
                                }
                            },
                            {
                                selector: '.shrink',
                                style: {
                                    "width": 0.1,
                                    "label": "",
                                    'line-color': '#DDD'
                                }
                            },
                            {
                                selector: '.hidden',
                                style: {
                                    "background-opacity": 0.2,
                                    "label": "",
                                    'border-width': 0
                                }
                            }
                        ],
                        layout: {
                            name: 'cose',
                            minDist: 100,
                            nodeOverlap: 20
                        }
                    }).ready(this.hideLoader());
                    cy.on('tap', 'node', function (evt) {
                        cy.remove('edge.directedEdge');
                        cy.elements('edge').removeClass('shrink');
                        cy.elements('node').removeClass('hidden');
                        modifiedNode = null;
                        addedEdges = [];
                        var node = evt.cyTarget;
                        var directlyConnected = node.neighborhood();
                        var nodeData = node.data();
                        cy.elements('node').difference(directlyConnected.nodes().union(node)).addClass('hidden');
                        cy.elements('edge').addClass('shrink');
                        directlyConnected.edges().forEach(function (ele) {
                            addEdge(ele.data(), nodeData.id);
                        });
                        cy.add(addedEdges);
                        modifiedNode = node;
                    });
                    cy.on('tap', function (evt) {
                        if (evt.cyTarget == cy) {
                            cy.remove('edge.directedEdge');
                            cy.elements('edge').removeClass('shrink');
                            cy.elements('node').removeClass('hidden');
                            modifiedNode = null;
                        }
                    });
                };
                GraphComponent.prototype.ngOnInit = function () {
                    this.onResize();
                    var target = document.getElementById("graph-spin");
                    this.graphSpinner.spin(target);
                    $('#graph-spin').show();
                    this.getGraph();
                };
                GraphComponent.prototype.onResize = function () {
                    var width = $('#graph-container').width();
                    var height = $(window).height() - 50;
                    if ($(document).width() <= 1024) {
                        height = height * 2 / 3;
                    }
                    console.log(height);
                    $('#cy').css("width", width);
                    $('#cy').css("height", height);
                };
                GraphComponent = __decorate([
                    core_1.Component({
                        selector: 'graph',
                        template: "\n    <div id='graph-container'>\n      <div id=\"graph-spin\" style='height:100%;z-index: 100;' hidden><p class='spinText'>Loading Graph<p></div>\n      <div id='cy' (window:resize)=\"onResize()\"></div>\n    </div>\n  ",
                        styles: ["\n    #cy {\n      display: block;\n      min-height:400px;\n      background-color: #EEE;\n    }\n    .spinText{\n      position:relative;\n      left:46.5%;\n      top:60%;\n    }\n  "],
                        providers: [graph_service_1.GraphService]
                    }), 
                    __metadata('design:paramtypes', [graph_service_1.GraphService])
                ], GraphComponent);
                return GraphComponent;
            }());
            exports_1("GraphComponent", GraphComponent);
        }
    }
});
//# sourceMappingURL=graph.component.js.map