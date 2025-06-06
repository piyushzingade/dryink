"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// import Image from "next/image";
import { Brain, Download, Edit3, Type} from 'lucide-react';



const sections = [
  {
    title: "1. Enter Your Prompt",
    text: "Start by describing the video you envision. Be as detailed as possible to guide the AI.",
    subText: "Tell the AI your story idea, characters, setting, and desired mood.",
    video: "/Typing.mp4", 
    icon: <Type size={24} />,
  },
  {
    title: "2. AI Generates Your Video",
    text: "Our intelligent AI takes your prompt and transforms it into a unique video.",
    subText: "Sit back and watch as the AI brings your vision to life, frame by frame.",
    video: "Video.mp4", 
    icon: <Brain size={24} />,
  },
  {
    title: "3. Download Your Creation",
    text: "Once complete, your video is ready for download in high quality.",
    subText: "Get your masterpiece in a format that's perfect for sharing.",
    video: "download.mp4", 
    icon: <Download size={24} />,
  },
  {
    title: "4. Refine with Follow-up Prompts",
    text: "Need tweaks? Provide additional prompts to fine-tune your video.",
    subText: "Iterate and perfect your creation until it's exactly what you imagined.",
    video: "man.mp4",
    icon: <Edit3 size={24} />,
  },
];


export default function Featured() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-white w-full text-neutral-900 dark:bg-neutral-900 dark:text-white py-10 px-6 md:px-32">
      <div className="flex flex-col justify-center items-center text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#4a3294]">
         Bring Learning to Life with Dryink
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Turn complex concepts into dynamic, engaging animations in seconds. Dryink empowers educators, creators, and students to bring lessons to life through visually compelling, AI-generated videos — no design or animation skills required.
        </p>
      </div>

      <div ref={containerRef} className="relative min-h-screen py-20">
        {/* Vertical Line */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-[1px] bg-[#4a3294] rounded-full z-0"
          style={{ height: lineHeight }}
        />

        {/* Sections */}
        <div className="space-y-32 relative z-10">
          {sections.map((section, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center max-w-6xl mx-auto"
              >
                {isEven ? (
                  <>
                    {/* Text */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-left"
                    >
                      <h3 className="text-3xl font-semibold text-[#4a3294] mb-4">
                        {section.title}
                      </h3>
                      <p className="text-base text-gray-300 mb-2">
                        {section.text}
                      </p>
                      <p className="text-base text-gray-400">
                        {section.subText}
                      </p>
                    </motion.div>

                    {/* Icon */}
                    <div className="flex justify-center items-center h-full">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#4a3294] text-white p-3 rounded-full shadow-lg"
                      >
                        {section.icon}
                      </motion.div>
                    </div>

                    {/* Video */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-center"
                    >
                      <video
                        src={section.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-[250px] h-[250px] object-cover rounded-xl shadow-xl"
                      />
                    </motion.div>
                  </>
                ) : (
                  <>
                    {/* Video */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-center"
                    >
                      <video
                        src={section.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-[250px] h-[250px] object-cover rounded-xl shadow-xl"
                      />
                    </motion.div>

                    {/* Icon */}
                    <div className="flex justify-center items-center h-full">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#4a3294] text-white p-3 rounded-full shadow-lg"
                      >
                        {section.icon}
                      </motion.div>
                    </div>

                    {/* Text */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-left"
                    >
                      <h3 className="text-3xl font-semibold text-[#4a3294] mb-4">
                        {section.title}
                      </h3>
                      <p className="text-base text-gray-300 mb-2">
                        {section.text}
                      </p>
                      <p className="text-base text-gray-400">
                        {section.subText}
                      </p>
                    </motion.div>
                  </>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
