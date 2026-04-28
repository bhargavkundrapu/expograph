import { useMemo, useState } from "react";

const LOGO_SOURCES = {
  full: [
    "https://res.cloudinary.com/da2wrgabu/image/upload/v1777379728/1_ajimf0.png",
    "/1.png",
    "/2.png",
  ],
  icon: [
    "https://res.cloudinary.com/da2wrgabu/image/upload/v1777379714/e_x_1_xoh57o.png",
    "/e%5Ex.png",
    "/2.png",
    "/1.png",
  ],
};

export default function BrandLogo({
  variant = "full",
  alt = "ExpoGraph",
  className = "",
  ...props
}) {
  const sources = useMemo(() => LOGO_SOURCES[variant] || LOGO_SOURCES.full, [variant]);
  const [sourceIndex, setSourceIndex] = useState(0);

  const handleError = () => {
    setSourceIndex((current) => {
      if (current >= sources.length - 1) return current;
      return current + 1;
    });
  };

  return (
    <img
      src={sources[sourceIndex]}
      alt={alt}
      className={className}
      onError={handleError}
      loading="eager"
      decoding="async"
      {...props}
    />
  );
}
