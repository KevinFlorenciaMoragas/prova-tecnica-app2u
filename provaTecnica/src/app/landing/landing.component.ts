import { Component, OnInit } from '@angular/core'
import { PhotographerService } from '../service/photographer.service'
import { Photographer } from '../model/photographer.model'
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  photographers: Photographer[] = []
  constructor (private readonly photographerService: PhotographerService) { }
  
  data (): void {
    this.photographerService.fetchPhotographers().subscribe((data) => {
      console.log(data)
      this.photographers = data
    })
  }

  ngOnInit (): void {
    this.data()
  }
}
