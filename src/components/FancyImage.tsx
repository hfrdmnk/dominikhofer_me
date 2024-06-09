import { useState, useRef } from "react";
import { motion, useDomEvent } from "framer-motion";

import { MapPin } from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { default as cn } from "classnames";

const openTransition = {
  type: "spring",
  damping: 20,
  stiffness: 250,
};

const closeTransition = {
  type: "tween",
  duration: 0,
};

const FancyImage = ({
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
  const [isOpen, setOpen] = useState(false);

  if (typeof window !== "undefined") {
    useDomEvent(useRef(window), "scroll", () => isOpen && setOpen(false));
  }

  let displayDate;

  if (date) {
    displayDate = formatDistanceToNow(new Date(date));
  }

  return (
    <figure className="select-none space-y-2">
      <div
        className={cn(
          "image-container relative overflow-hidden rounded",
          className,
          isOpen ? "open" : "",
        )}
      >
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={isOpen ? openTransition : closeTransition}
          className="shade"
          onClick={() => setOpen(false)}
        />
        <motion.img
          src={image}
          alt={alt}
          className="absolute inset-0 h-full w-full rounded object-cover"
          onClick={() => setOpen(!isOpen)}
          layout
          transition={isOpen ? openTransition : closeTransition}
        />
        <div className="meta pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex items-center justify-end px-4 py-6 font-mono text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-brand-400" />
            <span>{location}</span>
          </div>
        </div>
        <div className="meta-gradient pointer-events-none absolute bottom-0 left-0 right-0 top-2/3 z-10 bg-gradient-to-b from-transparent to-black"></div>
      </div>
      <figcaption className="flex justify-between font-mono text-sm">
        <span>{date && `${displayDate} ago`}</span>
        <span>{displayName}</span>
      </figcaption>
    </figure>
  );
};

export default FancyImage;
