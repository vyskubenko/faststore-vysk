import React from "react";

export interface BannerSliderProps {
  title: string;
  link: {
    text: string;
    url: string;
  };
}

export default function BannerSlider(props: BannerSliderProps) {
  return (
    <section>
      <p>33333</p>
      <h2>{props.title}</h2>
      <a href={props.link.url}>{props.link.text}</a>
    </section>
  );
}
