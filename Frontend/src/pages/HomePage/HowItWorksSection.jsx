import React from 'react';
import MotionWrap from '../../components/MotionWrap';

const steps = [
  { name: 'Access', description: 'User opens the Nyaya Saathi app or visits a nearby kiosk.', },
  { name: 'Speak the Problem', description: 'User explains the issue in Hindi or their local dialect; no legal terms needed.' },
  { name: 'AI Understands', description: 'Our AI extracts key information, identifies the issue, and asks clarifying questions.' },
  { name: 'Auto-Generate Documents', description: 'The system instantly fills forms and generates affidavits, letters, or certificates.' },
  { name: 'Guide & Submit', description: 'We provide clear voice guidance, print necessary forms, and help track the status.' },
  { name: 'Human Escalation', description: 'Complex cases are intelligently routed to our network of local paralegals for expert help.' },
]

const HowItWorksSection = () => {
  return (
    <MotionWrap className="py-24 sm:py-32 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-cyan-400">How It Works</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">From Conversation to Resolution in 6 Simple Steps</p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <ol className="grid grid-cols-1 gap-x-8 gap-y-10 text-base font-semibold leading-7 text-white sm:grid-cols-2 lg:grid-cols-3">
                {steps.map((step, index) => (
                    <li key={step.name} className="flex gap-x-3 p-4 rounded-lg bg-slate-800 border border-slate-700">
                        <span className="flex-none text-xl text-cyan-400">0{index + 1}</span>
                        <div>
                            <p>{step.name}</p>
                            <p className="mt-2 text-sm text-slate-400 font-normal">{step.description}</p>
                        </div>
                    </li>
                ))}
                </ol>
            </div>
        </div>
    </MotionWrap>
  );
};
export default HowItWorksSection;