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

  days: Array<any>;
  currentMonth: number;
  currentYear: number;

  constructor() {
    
    this.days = new Array(this.daysInMonth());
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
  }

  daysInMonth(){
    return new Date(this.date.getFullYear(),this.date.getMonth() + 1, 0).getDate();
  }

  changeMonth(dir: number){
    
    if(this.currentMonth === this.months.length-1 && dir === 1)
    {
      this.currentMonth = 0;
      this.currentYear += 1;
    
    } else if(this.currentMonth === 0 && dir === -1){
      this.currentMonth = this.months.length - 1;
      this.currentYear -= 1;
    
    } else this.currentMonth += dir;
  }

  openModal(day: number){
    document.getElementById('scheduleModal').style.display = 'block';
  }

  closeModal(){
    document.getElementById('scheduleModal').style.display = 'none';
  }
}
