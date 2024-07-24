import { useEffect, useState } from "react";
import events from "../logic/events";
import EventSelect from "./EventSelect";
import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { Event } from "../logic/interfaces";
import { Event as EventInterface, Competition as PublicWCIF } from "@wca/helpers";
import { getWcif } from "../logic/wcaApi";
import CompetitionEvent from "./CompetitionEvent";

const Competition = () => {
  const [competition, setCompetition] = useState<PublicWCIF | null>(null);
  const [competitionEvents, setCompetitionEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        const info = await getWcif("Euro2024");
        if (info) {
          setCompetition(info);
          info.events.forEach((e: EventInterface) => {
            const event = events.find((event) => event.id === e.id);
            if (event) {
              setCompetitionEvents((prev) => [...prev, event]);
              if (events[0].id === e.id) setEvent(event);
            }
          });
        }
    };
    fetchData();
  }, []);
  const handleEventChange = (id: string) => {
    const newEvent = events.find((e) => e.id === id);
    if (newEvent) {
      setEvent(newEvent);
    }
  };
  if (!competition) return <CircularProgress />;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mt: 3,
        }}
      >
        <Typography variant="h4">
          <Link
            href={`https://worldcubeassociation.org/competitions/${competition.id}`}
            sx={{ textDecoration: "none" }}
            target="_blank"
          >
            {competition.name}
          </Link>
        </Typography>
        <EventSelect
          selectedEvent={event}
          events={competitionEvents}
          eventChange={handleEventChange}
        />
        {competition && competition.id && event ? (
          <CompetitionEvent competition={competition} event={event} />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
};

export default Competition;