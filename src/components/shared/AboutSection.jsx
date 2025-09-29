import InfoOne from "./InfoOne";
import InfoTwo from "./InfoTwo";

export default function AboutSection({
  preheading,
  heading,
  normaltext,
  image,
  reverse,
}) {
  return (
    <div className="flex max-w-7xl mx-auto flex-col md:flex-row  gap-10 text-left mb-32">
      <div
        className={`about-content flex flex-col justify-center gap-4 p-4 md:w-3/5 w-full ${
          reverse ? "order-2" : "order-1"
        }`}
      >
        <h6 className="text-blue-500">{preheading}</h6>
        <h1 className="text-3xl font-semibold">{heading}</h1>
        <p className="w-4/5 opacity-70">{normaltext}</p>
        {reverse ? (
          <div className="">
            <InfoTwo />
          </div>
        ) : (
          <div className="">
            <InfoOne />
          </div>
        )}
      </div>
      <div
        className={`image-content w-1/2 md:w-2/5 mx-auto ${
          reverse ? "order-1" : "order-2"
        }`}
      >
        <img src={image} className="w-100% rounded-lg" alt="history-image" />
      </div>
    </div>
  );
}
