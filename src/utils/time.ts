import { parseISO } from "date-fns";
import { Status } from "./meta";

export function decideTimeFromStatus({ timeline, status }: post.PostMeta) {
  let time: string;
  switch (status) {
    case Status.DRAFT:
    case Status.FINISHED:
      time = timeline.created;
      break;
    case Status.STALE:
    case Status.OUTDATED:
    case Status.TBC:
    default:
      time = timeline.updated;
  }

  return parseISO(time);
}
