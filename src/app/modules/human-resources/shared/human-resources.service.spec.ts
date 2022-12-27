/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HumanResourcesService } from './human-resources.service';

describe('Service: HumanResources', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HumanResourcesService]
    });
  });

  it('should ...', inject([HumanResourcesService], (service: HumanResourcesService) => {
    expect(service).toBeTruthy();
  }));
});
