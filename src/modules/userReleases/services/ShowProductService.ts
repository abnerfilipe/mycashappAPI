import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRelease from "../typeorm/entities/UserRelease";
import UserReleasesRepository from "../typeorm/repositories/UserReleasesRepository";


interface IRequest{
  id: string
}

class ShowUserReleaseService{
  public async execute({ id }: IRequest): Promise<UserRelease> {
    const userReleaseRepository = getCustomRepository(UserReleasesRepository);
    const userRelease = await userReleaseRepository.findOne(id,{relations: ["user", "transaction"],});
    if (!userRelease) {
      throw new AppError("User release not found.");
    }
    return userRelease;
  }
}

export default ShowUserReleaseService;
