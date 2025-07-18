import React from 'react';
import MotionWrap from '../../components/MotionWrap';
import { Landmark, FileText, BotMessageSquare, Users } from 'lucide-react';

const features = [
  { icon: <BotMessageSquare />, title: "Simple Voice Conversations", description: "Helps villagers complete legal and government paperwork through natural Hindi and regional dialects." },
  { icon: <FileText />, title: "Auto-Generates Documents", description: "Creates ready-to-submit forms, affidavits, and legal notices based on your conversation." },
  { icon: <Landmark />, title: "Solves Common Issues", description: "Expertly handles Aadhaar, pension, land disputes, missing certificates, and fraud-related cases." },
  { icon: <Users />, title: "Human Escalation", description: "For complex issues, we seamlessly connect you with qualified local paralegals for expert assistance." },
];

const FeaturesSection = () => {
  return (
    // This is now a simple semantic section tag
    <section className="py-24 sm:py-32">
        <MotionWrap>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-cyan-400">What is Nyaya Saathi?</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">AI-Powered Legal Assistant for Rural India</p>
                    <p className="mt-6 text-lg leading-8 text-slate-300">We make justice accessible by translating complex paperwork into simple conversations, ensuring no one is left behind due to legal jargon or digital illiteracy.</p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        {features.map((feature) => (
                            <div key={feature.title} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                                        {feature.icon}
                                    </div>
                                    {feature.title}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-300">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </MotionWrap>
    </section>
  );
};
export default FeaturesSection;