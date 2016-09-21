import {Component} from 'angular2/core';

@Component({
  selector: 'label',
  template: `
    <div class='colorSquare' [style.background]=group.color></div>
    <p class='graphlabel'>{{group.id}} </p> - <a href='http://{{url}}/#/group-message-rates/{{group.id}}'>Message Rates</a>
  `,
  inputs: ['group'],
  styles: [`
    .colorSquare {
      width:30px;
      height:30px;
      display:inline-block;
      -moz-border-radius: 15px;
      -webkit-border-radius: 15px;
      border-radius: 15px; /* future proofing */
      border:5px solid #eee;
    }
    .graphlabel{
      display:inline-block;
      padding-left:5px;
      font-size:1.7em;
    }

`]

})

export class LabelComponent{
  group: Object[];
  url:string;

  ngAfterViewInit(){
    $('.colorSqare').css('background-color', this.group.color);
  }
  ngOnInit(){
    this.url = window.location.host;
  }
}
