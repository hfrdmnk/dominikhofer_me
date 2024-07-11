import { format } from "date-fns";

export const formatPostDate = (date: Date) => {
  //   return format(date, "MMMM do, yyyy 'at' HH:mm");
  return format(date, "MMMM do, yyyy");
};
