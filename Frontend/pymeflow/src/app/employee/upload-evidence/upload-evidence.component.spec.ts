import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEvidenceComponent } from './upload-evidence.component';

describe('UploadEvidenceComponent', () => {
  let component: UploadEvidenceComponent;
  let fixture: ComponentFixture<UploadEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadEvidenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
