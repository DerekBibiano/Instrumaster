import { Component, OnInit } from '@angular/core';
import { ApiYoutubeService } from '../services/api-youtube.service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  videos: any[] = []; 

  constructor(private youtubeService: ApiYoutubeService) { }

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.youtubeService.getVideos().subscribe(response =>{
      this.videos = response.items;
      console.log(this.videos);
    })
  }

}
