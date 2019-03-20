import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit{

  events: Array<any>;
  eventsAmount: Array<number> = new Array(12);
  eventsInDay: Array<Array<any>> = new Array(24);

  date = new Date();
  
  months = ['Styczeń', 'Luty', 'Marzec', 
            'Kwiecień', 'Maj', 'Czerwiec', 
            'Lipiec', 'Sierpień', 'Wrzesień', 
            'Październik', 'Listopad', 'Grudzień'];
  
  daysOfWeek = ['Pn','Wt','Śr','Czw','Pt','Sb','Nd'];

  days: Array<any>;
  currentDay: number = 0;
  currentMonth: number;
  currentYear: number;

  currentColorId: string;
  currentColor: string;

  timeValue: string;
  eventDesc: string;

  toAddEvent: boolean = false;


  constructor(private eventService: EventsService) {
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
    this.days = new Array(this.daysInMonth());
    this.events = new Array(this.daysInMonth());
  }

  ngOnInit(): void {
    this.getEventsInYear()
    this.getEventsInMonth();
    this.getEventsInDay();
  }

  getEventsInYear(){
    for (let index = 0; index < 12; index++) {
      this.eventService.getEvents(this.currentYear, index)
        .subscribe(events => {
          this.eventsAmount[index] = events.length;
        });
    }
  }

  getEventsInMonth(){
    this.eventService.getEvents(this.currentYear, this.currentMonth)
      .subscribe(events => {
        events.forEach((value) => {
          for (const key in value) {
            if (value.hasOwnProperty(key)) {
              this.days[value[key].eventDay] = value[key];
              this.events[value[key].eventDay] = value;
            }
          }
        });
      });
  }

  getEventsInDay(){
    for (let index = 0; index < this.eventsInDay.length; index++) {
      this.eventsInDay[index] = []; 
    }

    for (const key in this.events[this.currentDay]){
      const event = this.events[this.currentDay][key]
      const eventTime = Math.floor(event.eventTime.split(':').join('.'));
      this.eventsInDay[eventTime].push(event);
    }
  }

  daysInMonth(){
    return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  }

  changeYear(dir: number){
    this.currentYear += dir;
    this.getEventsInYear();
    this.changeMonth(this.months[this.currentMonth]);
    this.exitEvent('set-event');
  }

  getIndexOfMonth(month: string){
    return this.months.indexOf(month);
  }

  changeMonth(month: string){
    this.currentMonth = this.getIndexOfMonth(month);
    
    this.days = new Array(this.daysInMonth());
    this.events = new Array(this.daysInMonth());

    this.getEventsInMonth();
    this.exitEvent('set-event');
  }

  chooseElement(color: string){
    this.days[this.currentDay] = {'color': color};
  }

  chooseDay(day: number){
    this.currentDay = day;

    this.onResize();
    this.getEventsInDay();
    
    const eventSchedule = document.getElementById('event-menu');
    const eventMenu = document.getElementById('set-event');
    
    if(!this.days[this.currentDay] && eventMenu.hidden)
      eventMenu.hidden = false;
    
    else if(this.days[this.currentDay] && eventSchedule.hidden){
      eventSchedule.hidden = false;
      eventMenu.hidden = true;
    }

    else if(this.days[this.currentDay] && eventMenu.hidden)
      eventMenu.hidden = false;
    
    else
      eventMenu.hidden = true;
  }

  onResize(){
    if(this.currentDay >= 0){
      
      let elmName = 'table-element' + this.currentDay;
      let elm = document.getElementById(elmName);
      let eventMenu = document.getElementById('set-event');
      let schedule = document.getElementById('schedule');
  
  
      let leftValue = (elm.offsetLeft + (elm.offsetWidth / 2) - schedule.offsetLeft - 125).toString() + 'px';
      let topValue = (elm.offsetTop  - schedule.offsetTop - 325).toString() + 'px';
  
      eventMenu.style.left = leftValue;
      eventMenu.style.top = topValue;
    }
  }

  exitEvent(eventName: string){
    if(eventName === 'event-menu')
      document.getElementById('event-menu').hidden = true;
    else if(eventName === 'set-event'){
      document.getElementById('set-event').hidden = true;
      this.clear();
    }
  }

  clear() {
    this.timeValue = '';
    this.eventDesc = '';
    
    if(this.currentColorId)
      document.getElementById(this.currentColorId).style.boxShadow = 'none';
    
    if(!this.days[this.currentDay])
      this.chooseElement('transparent');
  }

  setColor(id: string, color: string){
    if(!this.currentColorId)
      document.getElementById(id).style.boxShadow = '0px 0px 3px 3px green';
    
    
    else if(id != this.currentColorId){
      document.getElementById(id).style.boxShadow = '0px 0px 3px 3px green';
      document.getElementById(this.currentColorId).style.boxShadow = 'none';
    }
    
    this.currentColorId = id;
    this.currentColor = color;

    this.chooseElement(color);
  }

  addEvent(){
    let newEvent = {};
    let key = this.date.getTime().toString() + Math.floor((Math.random() * 1000000)).toString();
    
    newEvent[key] = {
      'eventMonth': this.currentMonth,
      'eventDay': this.currentDay,
      'eventYear': this.currentYear,
      'eventTime': this.timeValue,
      'eventDesc': this.eventDesc,
      'color': this.currentColor
    }

    this.eventService.pushEvent(newEvent, this.currentYear, this.currentMonth, this.currentDay)
        .then(() => {
          this.exitEvent('set-event');
          this.getEventsInMonth();
        });
  }
}
