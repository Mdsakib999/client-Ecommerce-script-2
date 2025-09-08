import Info1 from "./info1";
import Info2 from "./Info2";

export default function AboutSection({
  preheading,
  heading,
  normaltext,
  image,
  reverse,
}) {
  return (
    <div className="flex gap-10 text-left mb-32">
      <div className={`about-content flex flex-col justify-center gap-4 p-4 w-3/5 ${reverse ? "order-2" : "order-1"}`}>
        <h6 className="text-blue-500">{preheading}</h6>
        <h1 className="text-3xl font-semibold">{heading}</h1>
        <p className="w-4/5 opacity-70">{normaltext}</p>
        {reverse ? (
          <div className="">
            <Info2 />
          </div>
        ) : (
          <div className="">
            <Info1 />
          </div>
        )}
      </div>
      <div className={`image-content w-2/5 ${reverse ? "order-1" : "order-2"}`}>
        <img src={image} className="w-100% rounded-lg" alt="history-image" />
      </div>
    </div>
  );
}
