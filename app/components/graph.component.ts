import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {GraphService} from '../services/graph.service';

@Component({
  selector: 'graph',
  template: `
    <div id='graph-container'>
      <div id="graph-spin" style='height:100%;z-index: 100;' hidden><p class='spinText'>Loading Graph<p></div>
      <div id='cy' (window:resize)="onResize()"></div>
    </div>
  `,
  styles: [`
    #cy {
      display: block;
      min-height:400px;
      background-color: #EEE;
    }
    .spinText{
      position:relative;
      left:46.5%;
      top:60%;
    }
  `],
  providers: [GraphService]
})
export class GraphComponent{

  groups: Group[];
  nodes: Node[];
  edges: Edge[];
  graphSpinner: Object = new Spinner();
  url: string;

  constructor(private _graphService: GraphService){
  }

  getGraph() {
    this._graphService.getGraph().subscribe(response => this.handleResponse(response));
  }

  handleResponse(response) {
    this.groups = response;
    this.nodes = this.groups.nodes;
    this.edges = this.groups.edges;
    this.createGraph();

  }

  hideLoader(){
    var target = document.getElementById("graph-spin");
    this.graphSpinner.stop(target);
    $('#graph-spin').hide();
  }

  createGraph() {

    var nodeColors = ["#ff5050", "#ff9933", "#ffbb33", "#ff4dff", "#9966ff", "#66b3ff", "#9933ff"];
    var edgeColors = ["#ffb3b3", "#ffcc99", "#ffdd99", "#ffb3ff", "#ddccff", "#cce6ff", "#d9b3ff"];
    var modifiedNode;
    var addedEdges = [];

    function getNodeColor(value:number){
      return nodeColors[value % 7];
    }

    function getEdgeColor(to){
      return edgeColors[to % 7];

    }


    function addEdge(data, nodeData){
      if (data.source == nodeData.id){
        addedEdges.push({
          group:"edges",
          data: {
            "source":data.source,
            "target":data.target,
            "weight":data.st
          },
          classes: "directedEdge"
        });
        addedEdges.push({
          group:"edges",
          data: {
            "source":data.target,
            "target":data.source,
            "weight":data.ts
          },
          classes: "directedEdge"
        });
      } else {
        addedEdges.push({
          group:"edges",
          data: {
            "source":data.target,
            "target":data.source,
            "weight":data.st
          },
          classes: "directedEdge"
        });
        addedEdges.push({
          group:"edges",
          data: {
            "source":data.source,
            "target":data.target,
            "weight":data.ts
          },
          classes: "directedEdge"
        });
      }
    }


    var cy = cytoscape({


      hideLabelsOnViewport: false,

      container: document.getElementById('cy'), // container to render in

      elements: {
        nodes: this.nodes,
        edges: this.edges
      },

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': function( ele ){return getNodeColor(ele.data('group'))},
            'width': function( ele ){return Math.max(Math.min(ele.data('centrality')/100, 100), 7)},
            'height': function( ele ){return Math.max(Math.min(ele.data('centrality')/100, 100), 7)},
            'border-color': '#fff',
            'border-width': 2,
            'content': function(ele){return ele.data('email').split('@')[0]},
            'text-valign':'center',
            'font-size':6
          }
        },
        {
          selector: 'node:selected',
          style: {
            'font-size':12,
            'content': function(ele){return ele.data('email').split('@')[0] +'\n\nCentrality:'+ele.data('centrality')}
          }
        },

        {
          selector: 'edge',
          style: {
            'width':function(ele){return Math.max(Math.min((ele.data('ts')+ele.data('st'))/75, 24), 1)},
            'line-color':function(ele){return getEdgeColor(ele.target().data().group)},
            'font-size': 8
          }
        },
        {
          selector:'.connectedNodes',
          style: {
            'font-size':10
          }
        },
        {
          selector:'.connectedEdges',
          style: {
            'label':"hfef",
            'font-size':8

          }
        },
        {
          selector:'.directedEdge',
          style: {
            'label':'data(weight)',
            'font-size':8,
            'width': 2,
						'target-arrow-shape': 'triangle',
						'line-color': function(ele){return getEdgeColor(ele.target().data().group)},
						'target-arrow-color': function(ele){return getEdgeColor(ele.target().data().group)},
            'z-index':100
          }
        },
        {
          selector:'.shrink',
          style: {
            "width":0.1,
            "label":"",
            'line-color':'#DDD'
          }
        },
        {
          selector:'.hidden',
          style: {
            "background-opacity":0.2,
            "label":"",
            'border-width':0
          }
        }
      ],

      layout: {
        name: 'cose',
        minDist: 100,
        nodeOverlap:20
      }

    }).ready(this.hideLoader());

    cy.on('tap', 'node', function(evt){
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


      directlyConnected.edges().forEach(function(ele){
        addEdge(ele.data(), nodeData.id);
      });
      cy.add(addedEdges);


      modifiedNode = node;

    });

    cy.on('tap', function(evt){
      if (evt.cyTarget == cy){
        cy.remove('edge.directedEdge')
        cy.elements('edge').removeClass('shrink');
        cy.elements('node').removeClass('hidden');
        modifiedNode = null;
      }
    })


  }

  ngOnInit(){
    this.onResize();
    var target = document.getElementById("graph-spin");
    this.graphSpinner.spin(target);
    $('#graph-spin').show();
    this.getGraph();
  }

  onResize(){
    var width = $('#graph-container').width();
    var height = $(window).height() - 50;
    if ($(document).width() <= 1024) {
      height = height * 2/3;
    }
    console.log(height);
    $('#cy').css("width", width);
    $('#cy').css("height", height);
  }
}

interface Group {
  nodes: Node[];
  edges: Edge[];
}

interface Edge {
  data:Object;
}

interface Node {
  data: Object;
}
