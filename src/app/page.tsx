import { HeroSection }      from '@/components/sections/HeroSection'
import { HowItWorks }       from '@/components/sections/HowItWorks'
import { StatsBar }         from '@/components/sections/StatsBar'
import { UseCasesPreview }  from '@/components/sections/UseCasesPreview'
import { GradientLine }     from '@/components/ui/GradientLine'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GradientLine />
      <HowItWorks />
      <StatsBar />
      <GradientLine />
      <UseCasesPreview />
    </>
  )
}
