import type { Metadata } from 'next';
import Hero from '../components/home/Hero';
import ProjectCards, { ProjectIndex } from '../components/home/ProjectCards';
import Sections, { ContactSection } from '../components/home/Sections';
import PipelineMap from '../components/home/PipelineMap';
import FaqDetails from '../components/home/FaqDetails';
import Discovery from '../components/home/Discovery';
import PipelineReplay from '../components/home/PipelineReplay';
import Faq from '../components/home/Faq';
import AgentOverview from '../components/home/AgentOverview';
import Motion from '../components/home/Motion';
import ContactEmail from '../components/ContactEmail';
import HomeFooter from '../components/home/HomeFooter';

const title = 'Hans Aaron Laureles — Applied AI Engineer & Full-Stack Builder';
const description =
  'Hans Aaron Laureles — Applied AI Engineer. I build AI agents that do real work and the web interfaces around them.';
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://hanslaureles.vercel.app/' },
  openGraph: {
    type: 'website',
    url: 'https://hanslaureles.vercel.app/',
    title,
    description,
    images: [
      {
        url: 'https://hanslaureles.vercel.app/og-card-1200x630.png',
        width: 1200,
        height: 630,
        alt: description,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://hanslaureles.vercel.app/og-card-1200x630.png'],
  },
  other: { 'twitter:url': 'https://hanslaureles.vercel.app/' },
};

export default async function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <PipelineReplay>
          <PipelineMap />
        </PipelineReplay>
        <Discovery gallery={<ProjectCards />} index={<ProjectIndex />} />
        <Sections
          contact={
            <>
              <Faq>
                <FaqDetails />
              </Faq>
              <ContactSection>
                <ContactEmail home />
              </ContactSection>
            </>
          }
        />
      </main>
      <HomeFooter />
      <AgentOverview />
      <Motion />
    </>
  );
}
