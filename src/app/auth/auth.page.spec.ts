import { TestBed } from '@angular/core/testing';
import { AuthPage } from './auth.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';

describe('AuthPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        AngularFireModule.initializeApp({
          apiKey: "AIzaSyBWsVqfO9xSTog_eiBhJthA2A5HL3mpuYk",
          authDomain: "instrumaster-2c4e6.firebaseapp.com",
          projectId: "instrumaster-2c4e6",
          storageBucket: "instrumaster-2c4e6.appspot.com",
          messagingSenderId: "911820236695",
          appId: "1:911820236695:web:7bc98b50863e38ef3486d2"
        }), // Firebase config directly in the test
      ],
      declarations: [AuthPage],
      providers: [AngularFireAuth],
    }).compileComponents();
  });

  it('should display the AuthPage', () => {
    const fixture = TestBed.createComponent(AuthPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
