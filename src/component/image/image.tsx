import React from "react";
import Image from "next/image";
import { SxProps, Theme } from "@mui/material";

type ImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  style: any;
  sx?: SxProps<Theme>;
};

function CustomImageComponent({
  src,
  width,
  height,
  alt,
  style,
  sx,
}: ImageProps) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      loading="lazy"
      style={style}
    />
  );
}

export default CustomImageComponent;
