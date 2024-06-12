import { Component ,OnInit} from '@angular/core';
import { PhotographerService } from '../service/photographer.service';
import { Photographer } from '../model/photographer.model';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{

   photographers: Photographer[] = [ ];
  constructor(private photographerService: PhotographerService) { }

  data(){
    this.photographerService.getPhotographerData().subscribe((data) => {
      console.log(data.results);
      this.photographers = data.results;
    }
    );

  }
  ngOnInit(): void {
      this.data();
  }

}
