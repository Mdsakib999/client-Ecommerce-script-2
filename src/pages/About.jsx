import banner from "../assets/about-banner.jpg";
import Countup from '../components/shared/Countup'
import AboutSection from "../components/shared/AboutSection";
export default function About() {
  return (
    <div className="">
      <div
        className="relative mb-12 min-h-[600px] bg-no-repeat bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="z-10 flex items-center flex-col gap-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white capitalize">
            About for Bacola
          </h1>
          <p className="tracking-widest">WE CAN DO MORE FOR YOU</p>
        </div>
      </div>
      <div className="px-4 max-w-7xl mx-auto text-center mb-12">
        <p className="opacity-60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="grid gap-6 grid-cols-4 mb-16 max-w-7xl mx-auto">
        <div className="flex bg-gray-100 text-black flex-col gap-1 py-10 items-center justify-center text-center rounded-lg hover:bg-white hover:outline hover:outline-gray-600 transition">
          <h1 className="text-4xl"> <Countup>800</Countup>+ </h1>
          <p className="text-md">
            Product Types
          </p>
        </div>
        <div className="flex bg-gray-100 text-black flex-col gap-1 py-10 items-center justify-center text-center rounded-lg hover:bg-white hover:outline hover:outline-gray-600 transition">
          <h1 className="text-4xl"> <Countup>12</Countup>+ </h1>
          <p className="text-md">
            Years Of Experiance
          </p>
        </div>
        <div className="flex bg-gray-100 text-black flex-col gap-1 py-10 items-center justify-center text-center rounded-lg hover:bg-white hover:outline hover:outline-gray-600 transition">
          <h1 className="text-4xl"> <Countup>2500</Countup>+ </h1>
          <p className="text-md">
            Trust Customers
          </p>
        </div>
        <div className="flex bg-gray-100 text-black flex-col gap-1 py-10 items-center justify-center text-center rounded-lg hover:bg-white hover:outline hover:outline-gray-600 transition">
          <h1 className="text-4xl"> <Countup>15</Countup>+ </h1>
          <p className="text-md">
            Stores Nationwide
          </p>
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
