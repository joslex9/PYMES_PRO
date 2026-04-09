import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: BossDashboardComponent;
  let fixture: ComponentFixture<BossDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BossDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BossDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
