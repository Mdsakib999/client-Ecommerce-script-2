import AboutSection from "../components/shared/AboutSection";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto p-12">
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
