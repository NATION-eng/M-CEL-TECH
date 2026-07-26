import { Chapter1Arrival } from "@/components/home/chapters/Chapter1Arrival";
import { Chapter2Future } from "@/components/home/chapters/Chapter2Future";
import { Chapter3WhoWeAre } from "@/components/home/chapters/Chapter3WhoWeAre";
import { Chapter4WhatWeBuild } from "@/components/home/chapters/Chapter4WhatWeBuild";
import { Chapter5HowWeSolve } from "@/components/home/chapters/Chapter5HowWeSolve";
import { Chapter6Industries } from "@/components/home/chapters/Chapter6Industries";
import { Chapter7Training } from "@/components/home/chapters/Chapter7Training";
import { Chapter8SocialProof } from "@/components/home/chapters/Chapter8SocialProof";
import { Chapter9FinalInvitation } from "@/components/home/chapters/Chapter9FinalInvitation";

export default function HomePage() {
  return (
    <>
      <Chapter1Arrival />
      <Chapter2Future />
      <Chapter3WhoWeAre />
      <Chapter4WhatWeBuild />
      <Chapter5HowWeSolve />
      <Chapter6Industries />
      <Chapter7Training />
      <Chapter8SocialProof />
      <Chapter9FinalInvitation />
    </>
  );
}
