import { Person, PersonalBest, formatCentiseconds } from "@wca/helpers";
import { decodeMultiResult } from "./results";
import regions from "./regions";

export const generateRanking = (
  persons: Person[],
  event: string,
  type: string
) => {
  const ranking: {
    id: number;
    name: string;
    wcaId: string;
    country: string;
    result: string;
    worldRank: number;
    notResult: boolean;
  }[] = [];
  persons.forEach((person: Person) => {
    if (person.registration) {
      const stringEvents = person.registration.eventIds.join(",");
      if (!stringEvents.includes(event)) {
        return;
      }
      person.personalBests?.forEach((pb: PersonalBest) => {
        if (pb.eventId === event && pb.type === type) {
          let result = "";
          if (event === "333mbf") {
            result = decodeMultiResult(pb.best);
          } else {
            result = formatCentiseconds(pb.best);
          }
          ranking.push({
            id: person.wcaUserId,
            name: person.name,
            wcaId: person.wcaId || "",
            country: person.countryIso2,
            result: result,
            worldRank: pb.worldRanking,
            notResult: false,
          });
        }
      });
      if (
        !person.personalBests?.some(
          (pb: PersonalBest) => pb.eventId === event && pb.type === type
        )
      ) {
        ranking.push({
          id: person.wcaUserId,
          name: person.name,
          wcaId: person.wcaId || "",
          country: person.countryIso2,
          result: "",
          worldRank: 999999999999,
          notResult: true,
        });
      }
    }
  });
  ranking.sort((a, b) => {
    return a.worldRank - b.worldRank;
  });
  return ranking.filter((player) => isEuropean(player.country));
};

export const isEuropean = (countryIso2: string) => {
  return regions.find((region) => region.iso2 === countryIso2)?.continentId === "_Europe";
};