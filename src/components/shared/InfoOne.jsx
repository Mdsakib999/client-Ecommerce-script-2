import Countup from "../shared/Countup";
export default function InfoOne() {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-blue-500 text-5xl">
          {" "}
          <Countup>12</Countup>{" "}
        </h1>
        <p>Years Experience</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-blue-500 text-5xl">
          <Countup>20</Countup>K
        </h1>
        <p>Years Experience</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-blue-500 text-5xl">
          <Countup>100</Countup>%
        </h1>
        <p>Years Experience</p>
      </div>
    </div>
  );
}
