import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { YamapngModule } from 'projects/yamapng/src/public_api';
import { YaCoreModule } from 'projects/yamapng/src/lib/core.module';
import { HttpClientModule } from '@angular/common/http';

import {NgAutoCompleteModule} from 'ng-auto-complete';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    YamapngModule,
    HttpClientModule,
    NgAutoCompleteModule,
    YaCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
