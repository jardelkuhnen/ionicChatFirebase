import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from './../pages/signup/signup';
import { AuthService } from './../providers/auth/auth.service';
import { UserService } from './../providers/user/user.service';

import { AngularFireModule, FirebaseAppConfig } from 'angularFire2';


  const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyBpbZxY4wSi3kkZFRSzTcJAR4JShbcXqq0",
    authDomain: "ionic-firebase-chat-2ff11.firebaseapp.com",
    databaseURL: "https://ionic-firebase-chat-2ff11.firebaseio.com",
    storageBucket: "ionic-firebase-chat-2ff11.appspot.com",
    messagingSenderId: "203280769797"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage

  ],
  providers: [
    StatusBar,
    UserService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
  ]
})
export class AppModule {}
