export type ImageCarouselProps = {
  paths: string[];
};

export default function ImageCarousel(props: ImageCarouselProps) {
  return (
    <div id="image-list">
      {props.paths?.map((path) => {
        return <img src={`file://${path}`} alt="some" />;
      })}
    </div>
  );
}
