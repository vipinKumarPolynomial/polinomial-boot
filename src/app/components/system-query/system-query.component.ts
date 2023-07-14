import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-system-query',
  templateUrl: './system-query.component.html',
  styleUrls: ['./system-query.component.scss']
})

export class SystemQueryComponent implements OnInit {

  @Input() systemMessage: any;
  @Input() systemValue: any;
  @Input() voiceMessage: any;
  @Input() response: any;
  hour: any = undefined;
  constructor() { }

  ngOnInit(): void {
    console.log(this.response, "USER TIME")
    let options: any = {
      timeZone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    }
    const formatter: any = new Intl.DateTimeFormat([], options);
    console.log(formatter?.format(new Date()))
    this.hour = formatter?.format(new Date())?.split(":")?.slice(0,1)[0]
    if(this.response === "greetingsCard" && this.hour){
      if(Number(this.hour) < 12 && Number(this.hour) > 1){
        this.systemMessage = "Good Morning";
      } else if(Number(this.hour) < 17 && Number(this.hour) > 11){
        this.systemMessage = "Good Afternoon";
      } else if(Number(this.hour) < 20 && Number(this.hour) > 16){
        this.systemMessage = "Good Evening";
      } else {
        this.systemMessage = "Good Night";
      }
    }
    
    //call voice synthesis if message is not blank
    if (this.voiceMessage != "") {
      this.synthesisVoice();
    }
   // this.notificationSound();

  }

  
  notificationSound = () => {
    
    let audio = new Audio();
    audio.src = "assets/notification.mp3";
    audio.muted = true; 
    audio.load();
    audio.play();
  }

  synthesisVoice = () => {
    const synth = window['speechSynthesis'];
    const voices = synth.getVoices();
    const language = "hi-IN";



    const SpeechSynthesisUtterance = window['SpeechSynthesisUtterance'] || window['webkitSpeechSynthesisUtterance'];
    let utterThis = new SpeechSynthesisUtterance(this.systemMessage);

    //assign voice
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].lang == "hi-IN") {
        utterThis.voice = voices[i];
      }
    }

    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  }


}
