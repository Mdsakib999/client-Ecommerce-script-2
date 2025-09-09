import banner from "../assets/about-banner.jpg";
import AboutSection from "../components/shared/AboutSection";
export default function About() {
  return (
    <div className="max-w-7xl mx-auto p-12">
      <div
        className="relative mb-16 min-h-[600px] bg-no-repeat bg-cover bg-center flex items-center justify-center text-white"
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
      <AboutSection
        className=""
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
