import { Component, OnInit } from '@angular/core';
import { PhotographerService } from '../service/photographer.service';
import { Photographer } from '../model/photographer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  photographer: Photographer = {} as Photographer;
  photographerId: string | null = null;

  constructor(
    private photographerService: PhotographerService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.photographerId = this.route.snapshot.paramMap.get('id');
    this.data();
  }

  data(): void {
    if (this.photographerId != null) {
      this.photographerService.getPhotographerDetail(this.photographerId).subscribe((data) => {
        console.log(data);
        this.photographer = data;
      });
    }
  }
}