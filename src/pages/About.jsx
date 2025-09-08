import AboutSection from "../components/shared/AboutSection";
import Team from "../components/shared/Team";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto p-12">
      <AboutSection
        preheading="OUR HISTORY"
        heading="Creative and renovate fashion trends"
        normaltext="Collaboratively administrate empowered markets via plug-and-play maintain networks. Dynamically usable procrastinate B2B users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI."
        image="https://i.ibb.co.com/V0RVB1DL/steampunk-1636156-1280.png"
        reverse={false}
      />
      <AboutSection
        preheading="Our vision"
        heading="We are marketpress"
        normaltext="Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI."
        image="https://i.ibb.co.com/V0RVB1DL/steampunk-1636156-1280.png"
        reverse={true}
      />
      <Team />
    </div>
  );
}
