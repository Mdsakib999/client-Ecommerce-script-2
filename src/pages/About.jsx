import banner from "../assets/about-banner.jpg";
import Countup from "../components/shared/Countup";
import AboutSection from "../components/shared/AboutSection";
export default function About() {
  return (
    <div className="">
      <div
        className="relative mb-12 min-h-[650px] bg-no-repeat bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="z-10 flex items-center flex-col gap-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white capitalize">
            About for UniMart
          </h1>
          <p className="tracking-widest">WE CAN DO MORE FOR YOU</p>
        </div>
      </div>
      <div className="px-4 max-w-7xl mx-auto text-center mb-12">
        <p className="opacity-60">
          At UniMart, we are committed to making online shopping simple,
          enjoyable, and trustworthy. Our mission is to deliver high-quality
          products directly to your doorstep while providing exceptional
          customer service. Every item is carefully selected for quality, value,
          and style. We aim to build a community where customers feel supported,
          valued, and inspired. Your satisfaction drives everything we do,
          making every interaction seamless and memorable.
        </p>
      </div>
      <div className="grid gap-6 grid-cols-4 mb-16 max-w-7xl mx-auto">
        <div className="flex bg-gray-50 text-black shadow-md flex-col gap-1 py-10 items-center justify-center text-center rounded-lg hover:bg-white hover:shadow-lg transition">
          <h1 className="text-4xl">
            {" "}
            <Countup>800</Countup>+{" "}
          </h1>
          <p className="text-md">Product Types</p>
        </div>
        <div className="flex bg-gray-50 text-black shadow-md flex-col gap-1 py-10 items-center justify-center text-center rounded-lg hover:bg-white hover:shadow-lg transition">
          <h1 className="text-4xl">
            {" "}
            <Countup>12</Countup>+{" "}
          </h1>
          <p className="text-md">Years Of Experience</p>
        </div>
        <div className="flex bg-gray-50 text-black shadow-md flex-col gap-1 py-10 items-center justify-center text-center rounded-lg hover:bg-white hover:shadow-lg transition">
          <h1 className="text-4xl">
            {" "}
            <Countup>2500</Countup>+{" "}
          </h1>
          <p className="text-md">Trust Customers</p>
        </div>
        <div className="flex bg-gray-50 text-black shadow-md flex-col gap-1 py-10 items-center justify-center text-center rounded-lg hover:bg-white hover:shadow-lg transition">
          <h1 className="text-4xl">
            {" "}
            <Countup>15</Countup>+{" "}
          </h1>
          <p className="text-md">Stores Nationwide</p>
        </div>
      </div>
      <AboutSection
        preheading="OUR HISTORY"
        heading="Creative and renovate fashion trends"
        normaltext="Collaboratively administrate empowered markets via plug-and-play maintain networks. Dynamically usable procrastinate B2B users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI."
        image="https://i.ibb.co.com/trJvsqh/pexels-karolina-grabowska-5650016.jpg"
        reverse={false}
      />
      <AboutSection
        preheading="Our vision"
        heading="We are marketpress"
        normaltext="Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI."
        image="https://i.ibb.co.com/tMBVZ117/pexels-karolina-grabowska-5632398.jpg"
        reverse={true}
      />
    </div>
  );
}
