import { Component } from '@angular/core';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {

  date = new Date();
  
  months = ['Styczeń', 'Luty', 'Marzec', 
            'Kwiecień', 'Maj', 'Czerwiec', 
            'Lipiec', 'Sierpień', 'Wrzesień', 
            'Październik', 'Listopad', 'Grudzień'];
  daysOfWeek = ['Pn','Wt','Śr','Czw','Pt','Sb','Nd'];

  days: Array<any>;
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  currentColor: string;

  constructor() {
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
    this.days = new Array(this.daysInMonth());
  }

  daysInMonth(){
    return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  }

  changeYear(dir: number){
    this.currentYear += dir;
  }

  changeMonth(month: string){
    this.currentMonth = this.months.indexOf(month);
    this.days = new Array(this.daysInMonth());
  }

  chooseElement(color: string){
    let elmName = 'table-element' + this.currentDay;
    document.getElementById(elmName).style.backgroundColor = color;
    document.getElementById(elmName).style.borderRadius = '100%';

    // document.getElementById('event-menu').style.display = 'block';
  }

  addEvent(day: number){
    this.currentDay = day;

    let elmName = 'table-element' + day;
    let elm = document.getElementById(elmName);
    let eventMenu = document.getElementById('set-event');
    let schedule = document.getElementById('schedule');


    let leftValue = (elm.offsetLeft + (elm.offsetWidth / 2) - schedule.offsetLeft - 125).toString() + 'px';
    let topValue = (elm.offsetTop  - schedule.offsetTop - 325).toString() + 'px';

    eventMenu.style.left = leftValue;
    eventMenu.style.top = topValue;
    eventMenu.style.visibility = 'visible';
  }

  exitEvent(eventName: string){
    if(eventName === 'event-menu')
      document.getElementById('event-menu').style.display = 'none';
    else if(eventName === 'set-event')
      document.getElementById('set-event').style.visibility = 'hidden';
  }

  openModal(day: number){
    document.getElementById('scheduleModal').style.display = 'block';
  }

  closeModal(){
    document.getElementById('scheduleModal').style.display = 'none';
  }

  setColor(id: string, color: string){
    if(!this.currentColor)
      document.getElementById(id).style.webkitBoxShadow = '0px 0px 3px 3px green';
    
    
    else if(id != this.currentColor){
      document.getElementById(id).style.webkitBoxShadow = '0px 0px 3px 3px green';
      document.getElementById(this.currentColor).style.webkitBoxShadow = 'none';
    }
    
    this.currentColor = id;

    this.chooseElement(color);
  }
}
