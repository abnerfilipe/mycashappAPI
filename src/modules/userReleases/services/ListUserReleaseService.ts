import { setSeconds, setMinutes, setHours } from "date-fns";
import { Between, getCustomRepository, In } from "typeorm";
import UserRelease from "../typeorm/entities/UserRelease";
import { UserReleasesRepository } from "../typeorm/repositories/UserReleasesRepository";

class ListUserReleaseService {
  constructor() {}
  public async execute(): Promise<UserRelease[]> {
    const userReleasesRepository = getCustomRepository(UserReleasesRepository);
    return await userReleasesRepository.find({
      relations: ["user", "transaction"],
    });
  }
  public async executeAllFromTransactionId(id: string, date: string): Promise<UserRelease[]> {
    const userReleasesRepository = getCustomRepository(UserReleasesRepository);

    const dateWithCorrectedTZ = new Date(new Date(date).toLocaleString("en-US", {timeZone: 'Etc/UTC'}));

    let dateInital:any = setSeconds(setMinutes(setHours(dateWithCorrectedTZ,0),0),0);
    let dateFinal:any = setSeconds(setMinutes(setHours(dateWithCorrectedTZ,23),59),59);
    
    return await userReleasesRepository.find({
      where: { 
        transaction: id,
        createdAt: Between(dateInital,dateFinal)
      },
      relations: ["user", "transaction"],
    });
  }
  public async executeAllFromUserId(id: string, date: string): Promise<UserRelease[]> {
    const userReleasesRepository = getCustomRepository(UserReleasesRepository);

    const dateWithCorrectedTZ = new Date(new Date(date).toLocaleString("en-US", {timeZone: 'Etc/UTC'}));

    let dateInital:any = setSeconds(setMinutes(setHours(dateWithCorrectedTZ,0),0),0);
    let dateFinal:any = setSeconds(setMinutes(setHours(dateWithCorrectedTZ,23),59),59);

    return await userReleasesRepository.find({
      where: { 
        user: id,
        createdAt: Between(dateInital,dateFinal)
      },
      relations: ["user", "transaction"],
    });
  }
}

export default ListUserReleaseService;
