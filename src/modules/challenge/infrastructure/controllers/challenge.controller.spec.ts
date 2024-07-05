import { Test, TestingModule } from "@nestjs/testing";
import { ChallengeService } from "../../application/services/challenge.service";
import { ChallengeController } from "./challenge.controller";

describe("ChallengeController", () => {
  let controller: ChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeController],
      providers: [
        {
          provide: ChallengeService,
          useValue: { easy: () => [], real: () => [] },
        },
      ],
    }).compile();

    controller = module.get<ChallengeController>(ChallengeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
