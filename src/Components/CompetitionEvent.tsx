import Psychsheet from "./Psychsheet";
import { Event } from "../logic/interfaces";
import {Competition as PublicWCIF } from "@wca/helpers";

const CompetitionEvent = (props: {
  competition: PublicWCIF | null;
  event: Event;
}) => {

  if (!props.competition) return <></>;

  return (
    <>
        <Psychsheet
          competition={props.competition}
          event={props.event}
          type={"average"}
        />
    </>
  );
};

export default CompetitionEvent;