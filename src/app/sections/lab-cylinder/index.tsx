import { Cyllinder } from "../../components/cyllinder";

export const LabCylinder = async () => {
  const processSteps = [
    { title: "1. Discover", description: "Deep research. Market intelligence.", contributors: [] },
    { title: "2. Architect", description: "Positioning. Messaging. Structure.", contributors: [] },
    { title: "3. Design", description: "Identity + Experience.", contributors: [] },
    { title: "4. Deploy", description: "Launch. Automate. Optimize.", contributors: [] },
    { title: "5. Scale", description: "Measure. Refine. Expand.", contributors: [] },
  ];

  return <Cyllinder experiments={processSteps as any} />;
};
