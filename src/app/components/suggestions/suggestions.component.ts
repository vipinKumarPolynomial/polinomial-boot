import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  constructor() { }

  @Input() suggestionButton : any[] = [];

  ngOnInit(): void {
  }

}
