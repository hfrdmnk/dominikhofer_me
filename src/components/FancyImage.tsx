import { MapPin } from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";

const PhotoCard = ({
  className,
  image,
  alt,
  location,
  displayName,
  date,
}: {
  className: string;
  image: string;
  alt: string;
  location: string;
  displayName: string;
  date?: string;
}) => {
  let displayDate;

  if (date) {
    displayDate = formatDistanceToNow(new Date(date));
  }

  return (
    <figure className="select-none space-y-2">
      <div className="relative overflow-hidden rounded">
        <img src={image} alt={alt} className={`${className} object-cover`} />
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-end px-4 py-6 font-mono text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin name="ph:map-pin" className="h-5 w-5 text-brand-400" />
            <span>{location}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-2/3 z-10 bg-gradient-to-b from-transparent to-black"></div>
      </div>
      <figcaption className="flex justify-between font-mono text-sm">
        <span>{date && `${displayDate} ago`}</span>
        <span>{displayName}</span>
      </figcaption>
    </figure>
  );
};

export default PhotoCard;
