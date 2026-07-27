import { Chapter1Arrival } from "@/components/home/chapters/Chapter1Arrival";
import { Chapter7Training } from "@/components/home/chapters/Chapter7Training";
import { Chapter3WhoWeAre } from "@/components/home/chapters/Chapter3WhoWeAre";
import { Chapter4WhatWeBuild } from "@/components/home/chapters/Chapter4WhatWeBuild";
import { Chapter5HowWeSolve } from "@/components/home/chapters/Chapter5HowWeSolve";
import { Chapter2Future } from "@/components/home/chapters/Chapter2Future";
import { Chapter6Industries } from "@/components/home/chapters/Chapter6Industries";
import { Chapter8SocialProof } from "@/components/home/chapters/Chapter8SocialProof";
import { Chapter9FinalInvitation } from "@/components/home/chapters/Chapter9FinalInvitation";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero & Statement of Excellence */}
      <Chapter1Arrival />

      {/* 2. Promoted Bootcamp Spotlight & Training Registration */}
      <Chapter7Training />

      {/* 3. Mission, Vision, Values & Identity */}
      <Chapter3WhoWeAre />

      {/* 4. Core Enterprise Capabilities */}
      <Chapter4WhatWeBuild />

      {/* 5. Engineering Workflow & Problem-Solving Process */}
      <Chapter5HowWeSolve />

      {/* 6. Engineering Tech Stack & Tools Arsenal */}
      <Chapter2Future />

      {/* 7. Sector Expertise & Industries Transformed */}
      <Chapter6Industries />

      {/* 8. Track Record & Social Proof */}
      <Chapter8SocialProof />

      {/* 9. Final Call to Action & Consultation */}
      <Chapter9FinalInvitation />
    </>
  );
}


