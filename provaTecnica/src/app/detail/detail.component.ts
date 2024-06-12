import { Component, OnInit } from '@angular/core'
import { PhotographerService } from '../service/photographer.service'
import { Photographer } from '../model/photographer.model'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  photographer: Photographer = {} as Photographer
  photographerId: string | null = null

  constructor (
    private readonly photographerService: PhotographerService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit (): void {
    this.photographerId = this.route.snapshot.paramMap.get('id')
    this.data()
  }

  data (): void {
    if (this.photographerId != null) {
      this.photographerService.getPhotographerDetail(this.photographerId).subscribe((data) => {
        console.log(data)
        this.photographer = data
      })
    }
  }
}
