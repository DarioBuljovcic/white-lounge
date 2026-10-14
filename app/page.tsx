import ContactSection from "@/features/home/ContactSection/ContactSection";
import HeroSection from "@/features/home/HeroSection/HeroSection";
import PlaceSection from "@/features/home/PlaceSection/PlaceSection";
import StorySection from "@/features/home/StorySection/StorySection";
import { getPlace } from "@/features/place/place";
import { JsonLd } from "@/lib/seo/JsonLdScript";
import { localBusinessJsonLd } from "@/lib/seo/jsonld";

export default async function Home() {
  const place = await getPlace();

  return (
    <>
      <JsonLd data={localBusinessJsonLd(place)} />
      <HeroSection />
      <StorySection />
      <PlaceSection />
      <ContactSection />
    </>
  );
}
