import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../core/services/team.service';

@Component({
selector:'app-team',
standalone:true,
imports:[CommonModule],
templateUrl:'./team.component.html',
styleUrls:['./team.component.css']
})
export class TeamComponent implements OnInit{

employees:any[]=[];

stats={
employees:0,
pending:0
};

constructor(private teamService:TeamService){}

ngOnInit(){

this.teamService.getTeam().subscribe((res:any)=>{

this.employees=res;

this.stats.employees=res.length;

this.stats.pending=res.reduce(
(sum:any,e:any)=>sum+parseInt(e.in_progress),
0
);

});

}

}