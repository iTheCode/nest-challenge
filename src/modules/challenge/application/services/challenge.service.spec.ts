import { Test, TestingModule } from "@nestjs/testing";
import { ChallengeController } from "../../infrastructure/controllers/challenge.controller";
import { ChallengeService } from "./challenge.service";

describe("ChallengeController", () => {
  let service: ChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeController],
      providers: [
        {
          provide: ChallengeService,
          useValue: {
            easy: () => [],
            real: () => [],
          },
        },
      ],
    }).compile();

    service = module.get<ChallengeService>(ChallengeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
