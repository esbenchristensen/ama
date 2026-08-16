import { JsonLd } from "@/components/JsonLd";
import { Barriers } from "@/components/home/Barriers";
import { DoorGrid } from "@/components/home/DoorGrid";
import { Faq } from "@/components/home/Faq";
import { FighterBand } from "@/components/home/FighterBand";
import { FindUs } from "@/components/home/FindUs";
import { Hero } from "@/components/home/Hero";
import { MemberBoard } from "@/components/home/MemberBoard";
import { MemberVoices } from "@/components/home/MemberVoices";
import { PriceBoard } from "@/components/home/PriceBoard";
import { SponsorRow } from "@/components/home/SponsorRow";
import { StartSteps } from "@/components/home/StartSteps";
import { Ticker } from "@/components/home/Ticker";

export default function Home() {
  return (
    <>
      <JsonLd />
      <div className="flex min-h-[calc(100dvh-5rem)] flex-col">
        <Hero />
        <Ticker />
      </div>
      <Barriers />
      <DoorGrid />
      <StartSteps />
      <MemberVoices />
      <PriceBoard />
      <Faq />
      <FighterBand />
      <FindUs />
      <MemberBoard />
      <SponsorRow />
    </>
  );
}
