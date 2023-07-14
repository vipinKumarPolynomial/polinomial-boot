import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';

// components


import { RoundedButtonComponent } from './components/rounded-button/rounded-button.component';
import { RoundedRectangleButtonComponent } from './components/rounded-rectangle-button/rounded-rectangle-button.component';
import { HeaderUpShapeComponent } from './components/header-up-shape/header-up-shape.component';
import { TypoButtonComponent } from './components/typo-button/typo-button.component';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { UserQueryComponent } from './components/user-query/user-query.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { NumberSliderComponent } from './components/number-slider/number-slider.component';
import { SystemQueryComponent } from './components/system-query/system-query.component';
import { SuggestionButtonComponent } from './components/suggestion-button/suggestion-button.component';
import { PlainQuickReplyComponent } from './components/plain-quick-reply/plain-quick-reply.component';
import { RectangleEdgedButtonComponent } from './components/rectangle-edged-button/rectangle-edged-button.component';
import { IconQuickReplyComponent } from './components/icon-quick-reply/icon-quick-reply.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { SliderComponent } from './components/slider/slider.component';
import { VisualReplyComponent } from './components/visual-reply/visual-reply.component';
import { ListviewComponent } from './components/listview/listview.component';
import { ActionCardComponent } from './components/action-card/action-card.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { PaymentCardComponent } from './components/payment-card/payment-card.component';
import { FormCardComponent } from './components/form-card/form-card.component';
import { LocationCompositeCardComponent } from './components/location-composite-card/location-composite-card.component';
import { VoteCardComponent } from './components/vote-card/vote-card.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketCorosalComponent } from './components/ticket-corosal/ticket-corosal.component';
import { CardsComponent } from './components/cards/cards.component';
import { RoundQuickReplyComponent } from './components/round-quick-reply/round-quick-reply.component';
import { ParagraphReplyComponent } from './components/paragraph-reply/paragraph-reply.component';
import { PropertyDetailCardComponent } from './components/property-detail-card/property-detail-card.component';
import { ImageReplyComponent } from './components/image-reply/image-reply.component';
import { HomeScreenComponent } from './layout/home-screen/home-screen.component';
import { LoginComponent } from './components/login/login.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { SelectCategoryComponent } from './components/select-category/select-category.component';
import { IconMessageComponent } from './components/icon-message/icon-message.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { AgentMessageComponent } from './components/agent-message/agent-message.component';
import { SafeHtmlPipe } from './layout/home-screen/home-screen-pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CustomHttpInterceptor } from './@theme/interceptor/httpInterceptor';
// import { NgxSliderModule } from '@angular-slider/ngx-slider/slider.module';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxSliderModule } from 'ngx-slider-v2';
@NgModule({
  declarations: [
    AppComponent,
    RoundedButtonComponent,
    SafeHtmlPipe,
    RoundedRectangleButtonComponent,
    TypoButtonComponent,
    HeaderUpShapeComponent,
    CarouselItemComponent,
    InputFieldComponent,
    UserQueryComponent,
    SuggestionsComponent,
    NumberSliderComponent,
    SystemQueryComponent,
    SuggestionButtonComponent,
    PlainQuickReplyComponent,
    RectangleEdgedButtonComponent,
    IconQuickReplyComponent,
    RangeSliderComponent,
    SliderComponent,
    VisualReplyComponent,
    ListviewComponent,
    ActionCardComponent,
    TextboxComponent,
    PaymentCardComponent,
    FormCardComponent,
    LocationCompositeCardComponent,
    VoteCardComponent,
    TicketComponent,
    TicketCorosalComponent,
    CardsComponent,
    RoundQuickReplyComponent,
    ParagraphReplyComponent,
    PropertyDetailCardComponent,
    ImageReplyComponent,
    HomeScreenComponent,
    LoginComponent,
    FeedbackComponent,
    SelectCategoryComponent,
    IconMessageComponent,
    ThumbnailComponent,
    AgentMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgScrollbarModule,
    SlickCarouselModule,
    CommonModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    NgxSliderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
