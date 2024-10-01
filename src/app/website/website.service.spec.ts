import { TestBed } from "@angular/core/testing"

import { WebsiteService } from "./website.service"

describe("BuildService", () => {
  let service: WebsiteService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(WebsiteService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
})
