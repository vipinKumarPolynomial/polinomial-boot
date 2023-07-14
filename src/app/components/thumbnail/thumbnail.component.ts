import { Component, OnInit, Input } from '@angular/core';
import { GetApiResponseService } from 'src/app/services/getApiResponse/get-api-response.service';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {

  constructor(private getApiResponseService: GetApiResponseService,
    private sanitizer:DomSanitizer
    ) { }
  @Input() userFile: any;
  thumbnail: any;
  statusText:string = "";
  uploaded: boolean = false;
  timeout:number;
  format:string = "";
  docURL:string = "";
  ngOnInit(): void {
    this.thumbnail = JSON.parse(this.userFile);
    this.format = this.thumbnail.format.split('/')[0];
    setTimeout(()=>{
      this.statusText = "Still uploading...";
    },45000);
    this.getApiResponseService.getThumbnailStatus.subscribe(
      (obj: any) => {
          if(obj){
            let statusObj = JSON.parse(obj);
            if (statusObj.id == this.thumbnail.id) {
              if(statusObj.status){
                this.uploaded = true;
                this.thumbnail.url = statusObj.url;
                this.docURL = `https://docs.google.com/gview?url=${this.thumbnail.url}&embedded=true`;
              }else{
                this.uploaded = false;
                this.statusText = "Upload failed.";
              }
              
            }
          }
      },
      (err) => {
        console.log("error ", err);
      }
    );

  }

  // sanitizedURL() {
  //   let url = this.sanitizer.bypassSecurityTrustResourceUrl(this.thumbnail.url);
  //   let googleViewer = `https://docs.google.com/gview?url=${this.thumbnail.url}&embedded=true`;
  //   return googleViewer;
  // }

  formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }



}
