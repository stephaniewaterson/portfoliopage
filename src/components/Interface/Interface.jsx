import { motion } from "framer-motion";

import { Html } from "@react-three/drei";
import "./Interface.css";
import { useState } from "react";

const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.2,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 50,
  },
  {
    title: "React / React Native",
    level: 80,
  },
  {
    title: "Nodejs",
    level: 80,
  },
  {
    title: "Typescript",
    level: 60,
  },
  {
    title: "3D Modeling",
    level: 40,
  },
];
const languages = [
  {
    title: "🇬🇧 English",
    level: 100,
  },
  {
    title: "🇪🇸 Spanish",
    level: 90,
  },
  {
    title: "🇱🇧 Arabic",
    level: 20,
  },
];

export const Interface = () => {
  <div className="interface">
    <SkillsSection />
  </div>;
};

export const SkillsSection = () => {
  return (
    <>
      <Html>
        <Section className="skills">
          <motion.div whileInView={"visible"}>
            <h2>Skills</h2>
            <div>
              {skills.map((skill, index) => (
                <div key={index}>
                  <motion.h3
                    initial={{
                      opacity: 0,
                    }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          duration: 1,
                          delay: 1 + index * 0.2,
                        },
                      },
                    }}
                  >
                    {skill.title}
                  </motion.h3>
                  <div>
                    <motion.div
                      style={{ width: `${skill.level}%` }}
                      initial={{
                        scaleX: 0,
                        originX: 0,
                      }}
                      variants={{
                        visible: {
                          scaleX: 1,
                          transition: {
                            duration: 1,
                            delay: 1 + index * 0.2,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2>Languages</h2>
              <div>
                {languages.map((lng, index) => (
                  <div key={index}>
                    <motion.h3
                      initial={{
                        opacity: 0,
                      }}
                      variants={{
                        visible: {
                          opacity: 1,
                          transition: {
                            duration: 1,
                            delay: 2 + index * 0.2,
                          },
                        },
                      }}
                    >
                      {lng.title}
                    </motion.h3>
                    <div>
                      <motion.div
                        style={{ width: `${lng.level}%` }}
                        initial={{
                          scaleX: 0,
                          originX: 0,
                        }}
                        variants={{
                          visible: {
                            scaleX: 1,
                            transition: {
                              duration: 1,
                              delay: 2 + index * 0.2,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Section>
      </Html>
    </>
  );
};
