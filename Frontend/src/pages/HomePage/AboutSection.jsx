import React from 'react';
import MotionWrap from '../../components/MotionWrap';

const problems = [
  { 
    imgSrc: "/icon-problem-docs.png",
    title: "Document & Court Summons Errors", 
    description: "Low digital literacy and complex legal language lead to mistakes and missed deadlines." 
  },
  { 
    imgSrc: "/icon-problem-welfare.png",
    title: "Welfare Scheme & Land Gaps", 
    description: "Outdated records and middlemen exploitation block access to rightful benefits and property claims." 
  },
  { 
    imgSrc: "/icon-problem-access.jpg",
    title: "Limited Legal Access", 
    description: "Courts are far, lawyers are expensive, and reliable legal aid is often out of reach for many villagers." 
  },
];

const AboutSection = () => {
  return (
    <section className="py-24 sm:py-32">
        <MotionWrap>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-cyan-400">The Core Problem</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Bridging the Justice Gap for 900 Million Indians</p>
                    <p className="mt-6 text-lg leading-8 text-slate-300">Essential legal processes are broken for rural communities. From inaccessible government services to intimidating court procedures, the system is designed for failure.</p>
                </div>
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                    {problems.map((problem) => (
                        <div key={problem.title} className="flex flex-col rounded-xl bg-slate-800/50 border border-slate-700 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                           <img src={problem.imgSrc} alt={problem.title} className="h-40 w-full object-cover" />
                           <div className="p-6">
                                <h3 className="text-lg font-semibold leading-7 text-white">{problem.title}</h3>
                                <p className="mt-2 text-base leading-7 text-slate-300">{problem.description}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </MotionWrap>
    </section>
  );
};
export default AboutSection;