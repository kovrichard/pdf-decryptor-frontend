import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('backendUrl should point to backend', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.backendUrl).toEqual(
      environment.backendUrl
    );
  });

  it('year should show current year', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.year).toEqual(new Date().getFullYear());
  });

  it('onChange should save file', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const testFile = new File([], 'test-file');
    const event: any = {
      target: {
        files: [testFile],
      },
    };

    fixture.componentInstance.onChange(event);
    expect(fixture.componentInstance.file).toEqual(testFile);
  });

  it('empty form should be invalid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.form.valid).toBeFalse();
  });

  it('file field should be required', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const file = fixture.componentInstance.form.controls['file'];
    expect(file.valid).toBeFalse();
    expect(file.errors!['required']).toBeTrue();
  });

  it('password field should be required', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const password = fixture.componentInstance.form.controls['password'];
    expect(password.valid).toBeFalse();
    expect(password.errors!['required']).toBeTrue();
  });
});
