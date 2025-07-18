import React from 'react';
import MotionWrap from '../../components/MotionWrap';
import { Network, BrainCircuit, Goal, Smartphone } from 'lucide-react';

const factors = [
  { icon: <Network />, text: "Digital India infrastructure is now operational and widespread." },
  { icon: <BrainCircuit />, text: "Advanced AI models for local languages have matured and are reliable." },
  { icon: <Goal />, text: "Government legal aid reforms are expanding rapidly." },
  { icon: <Smartphone />, text: "Rural digital adoption and trust in online platforms are at an all-time high." }
];

const WhyNowSection = () => {
  return (
    // This section uses the image as a background
    <section 
        className="py-32 sm:py-48 relative bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/hero-image.jpg')" }}
    >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>

        <MotionWrap className="relative z-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-cyan-400">Why Now?</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">The Perfect Confluence of Factors</p>
                    <p className="mt-6 text-lg leading-8 text-slate-200">
                        We are uniquely positioned to deliver AI-powered legal access to 900 million underserved Indians because the technology, infrastructure, and user readiness have finally aligned.
                    </p>
                </div>
                
                <div className="mx-auto mt-16 max-w-4xl">
                    <ul className="space-y-4">
                        {factors.map((factor) => (
                            <li 
                                key={factor.text}
                                className="flex items-start gap-x-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-400/50 transition-colors"
                            >
                                <div className="flex-shrink-0 text-cyan-400 mt-1">
                                    {factor.icon}
                                </div>
                                <span className="text-base text-slate-200">{factor.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </MotionWrap>
    </section>
  );
};

export default WhyNowSection;