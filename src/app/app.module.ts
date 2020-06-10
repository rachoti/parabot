import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { DashdoardComponent } from './dashdoard/dashdoard.component';
import { GenderviewComponent } from './genderview/genderview.component';
import { GeomapComponent } from './geomap/geomap.component';
import { LivemessageComponent } from './livemessage/livemessage.component';
import { LoginComponent } from './login/login.component';
import { MessagecountComponent } from './messagecount/messagecount.component';
import { RecenttranscriptComponent } from './recenttranscript/recenttranscript.component';
import { RetentionComponent } from './retention/retention.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { TimezoneComponent } from './timezone/timezone.component';
import { TranSearchComponent } from './tran-search/tran-search.component';
import { UseractivityComponent } from './useractivity/useractivity.component';
import { RouterModule, Routes } from '@angular/router';
import { MessageInComponent } from './message-in/message-in.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MessageOutComponent } from './message-out/message-out.component';

import {MessageInChatComponent} from './message-in-chat/message-in-chat.component';
import { MessageOutChatComponent } from './message-out-chat/message-out-chat.component';
import { ChatDisplayInComponent } from './chat-display-in/chat-display-in.component';
import { ChatDisplayOutComponent } from './chat-display-out/chat-display-out.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchPageNewComponent } from './search-page-new/search-page-new.component';

import { LogindumComponent } from './maildummy/logindum.component';
import { TranscriptComponent } from './transcript/transcript.component';
import { TransnextComponent } from './transnext/transnext.component';
import { UnhandledMessageComponent } from './unhandled-message/unhandled-message.component';
import { CompareComponent } from './compare/compare.component';
import { AbandonMessageComponent } from './abandon-message/abandon-message.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AbandontrynextComponent } from './abandontrynext/abandontrynext.component';
import { StepsComponent } from './steps/steps.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashdoardComponent,canActivate: [AuthGuard]  },

  { path: 'login', component: LoginComponent},
  { path: 'tranSearch', component: TranSearchComponent,canActivate: [AuthGuard] },
  { path: 'messagecount', component: MessagecountComponent,canActivate: [AuthGuard] },
  { path: 'useractivity', component: UseractivityComponent,canActivate: [AuthGuard] },
  { path: 'recentTrans', component: RecenttranscriptComponent,canActivate: [AuthGuard] },
  { path: 'liveMessage', component: LivemessageComponent,canActivate: [AuthGuard] },
  { path: 'retention', component: RetentionComponent,canActivate: [AuthGuard] },
  { path: 'genderview', component: GenderviewComponent,canActivate: [AuthGuard] },
  { path: 'geomap', component: GeomapComponent,canActivate: [AuthGuard] },
  { path: 'sentiment', component: SentimentComponent,canActivate: [AuthGuard] },
  { path: 'timezone', component: TimezoneComponent,canActivate: [AuthGuard] },
  { path: 'message_in', component: MessageInComponent,canActivate: [AuthGuard] },

  { path: 'message_out', component: MessageOutComponent,canActivate: [AuthGuard] },
  { path: 'transcript', component: TranscriptComponent,canActivate: [AuthGuard] },
  { path: 'unhandled', component: UnhandledMessageComponent,canActivate: [AuthGuard] },
  { path: 'abandon', component: AbandonMessageComponent,canActivate: [AuthGuard] },
  { path: 'steps', component: StepsComponent,canActivate: [AuthGuard] },

  { path: 'messageinchat/:id1/:id2/:id3', component: MessageInChatComponent,canActivate: [AuthGuard] },
  { path: 'messageoutchat/:id1/:id2/:id3', component: MessageOutChatComponent,canActivate: [AuthGuard] },
  { path: 'chatdisplayin/:id1/:id2', component: ChatDisplayInComponent,canActivate: [AuthGuard] },
 { path: 'chatdisplayout/:id1/:id2', component: ChatDisplayOutComponent,canActivate: [AuthGuard] },

 { path: 'searchpage/:id1', component: SearchPageComponent,canActivate: [AuthGuard] },
 //{ path: 'searchpagenew/:id1', component: SearchPageNewComponent,canActivate: [AuthGuard] },
 { path: 'logindum', component: LogindumComponent,canActivate: [AuthGuard] },



 { path: 'searchpage', component: SearchPageComponent,canActivate: [AuthGuard] },
 { path: 'searchpagenew/:id1/:id2', component: SearchPageNewComponent,canActivate: [AuthGuard] },
 { path: 'transnext/:id1', component: TransnextComponent,canActivate: [AuthGuard] },
 { path: 'compare', component: CompareComponent,canActivate: [AuthGuard] },
 { path: 'abanndontrynext/:id1', component: AbandontrynextComponent,canActivate: [AuthGuard] },
 

  ];
@NgModule({
  declarations: [
    AppComponent,
    DashdoardComponent,
    GenderviewComponent,
    GeomapComponent,
    LivemessageComponent,
    LoginComponent,
    MessagecountComponent,
    RecenttranscriptComponent,
    RetentionComponent,
    SentimentComponent,
    TimezoneComponent,
    TranSearchComponent,
    UseractivityComponent,
    MessageInComponent,
    

    MessageOutComponent,

    MessageInChatComponent,

    MessageOutChatComponent,

    ChatDisplayInComponent,

    ChatDisplayOutComponent,

    SearchPageComponent,

    SearchPageNewComponent,

    

   
    LogindumComponent,

    TranscriptComponent,
    UnhandledMessageComponent,
    AbandonMessageComponent,
    TransnextComponent,
    CompareComponent,
    AbandontrynextComponent,
    StepsComponent
   


  ],
  imports: [
    
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } ,
    // <-- debugging purposes only
    ),

    
     
    ReactiveFormsModule,

   
    RouterModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    
    Ng2SearchPipeModule,

    
    
    NgxSmartModalModule.forRoot(),
    ModalModule.forRoot(),
    //NgbModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  //entryComponents: [AbandonMessageComponent]
})
export class AppModule { }
