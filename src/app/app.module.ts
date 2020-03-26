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
import {MessageInChatComponent} from './message-in-chat/message-in-chat.component'
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
  { path: 'messageinchat/:id1/:id2/:id3', component: MessageInChatComponent,canActivate: [AuthGuard] },
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
    MessageInChatComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    RouterModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
