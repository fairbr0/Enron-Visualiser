import {Component} from 'angular2/core';
import {GraphComponent} from './graph.component';
import {GroupService} from '../services/group.service';
import {Group} from '../models/group';
import {LabelComponent} from './label.component';

@Component({
  selector: 'graph-main',
  directives: [GraphComponent, LabelComponent],
  template: `
  <div class='medium-10 column box_a'>

    <graph></graph>
  </div>
  <div class='medium-2 column panel' (window:resize)="onResize($event)">
    <div id='helperTool'>
      <h3>Group Visualiser</h3>
      <p>The graph shown represents important employees in the email dataset.
      Node (A point on the graph) size indicates a Nodes importance, calculated by centrality.
      An edge width indicates how often 2 Employees communicated.
      </p><br>
      Click on a Node to view:
      <ul style='padding-left:20px;'>
        <li>Its Centrality</li>
        <li>Messages Sent</li>
        <li>Messages Recieved</li>
      </ul>
      <br>
      <b>Scroll to zoom, drag to move</b>
      <br><br>

      <h6>Centrality</h6>
      <p style='font-size:0.8em'>The number of different people an employee talks to. This is a ranking of how important an employee is: more important people will have a higher centrality.</p>

      <h4>Groups</h4>
      <div class='scrollable'>
        <div *ngFor="#group of groupColorInfo">
          <label [group]='group'></label>
        </div>
      </div>
    </div>
  </div>


  `,
  styles: [`
    .box_a {
      background-color:#EEE;
    }
    #helperTool {overflow-y: scroll;
    }
    .panel {overflow-y: auto;}
  `]
})

export class GraphMainComponent{
  groups: Group[];
  groupColorInfo: Object[] = [];

  nodeColors = ["#ff5050", "#ff9933", "#ffbb33", "#ff4dff", "#9966ff", "#66b3ff", "#9933ff", "00ff00"];

  constructor(private _groupService: GroupService){}

  ngOnInit(){
    this._groupService.getGroups().subscribe(response => this.handleResponse(response));
    $('.panel').css('max-height', $(window).height());
  }

  onResize(event){
    $('.panel').css('max-height', $(window).height());
  }

  handleResponse(response: Group[]){
    this.groups = response;
    $(".colorSqare").each(function(i){
      var group = $(this).attr('id');
      var id = parseInt(group.split('-')[1]);
      $('#'+group).css('background-color', this.nodeColors[id%8]);
    });
    for (var i =0;i<response.length;i++){
      if (response[i].id != -1){
        this.groupColorInfo.push({"id":response[i].id, "color":this.nodeColors[response[i].id % 8]});
      }
    }
  }

}
