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
    title: "React / React Native",
    level: 80,
  },
  {
    title: "Nodejs",
    level: 80,
  },
  {
    title: "Threejs / React Three Fiber",
    level: 60,
  },
  {
    title: "Typescript",
    level: 60,
  },

  {
    title: "Python",
    level: 70,
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
    level: 25,
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
      <Html className="skills" position={[-9, 0, 0]}>
        <Section className="skills__section">
          <motion.div
            className="skills__div"
            whileInView={"visible"}
            animate={{ display: "flex" }}
          >
            <div className="skills__box1">
              <h2 className="skills__title">Skills</h2>
              <div>
                {skills.map((skill, index) => (
                  <div className="skills__name" key={index}>
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
                    <div className="skills__bar">
                      <motion.div
                        className="skills__progress"
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
            </div>
            <div>
              <div className="skills_box2">
                <h2 className="skills__title">Languages</h2>
                <div>
                  {languages.map((lng, index) => (
                    <div className="skills__name" key={index}>
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
                      <div className="skills__bar">
                        <motion.div
                          className="skills__progress"
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
            </div>
          </motion.div>
          <h3 className="other">
            Other: MySQL, REST APIs, Agile Development, User Authentication,
            OAuth, GitHub, Salsa Dancing.
          </h3>
        </Section>
      </Html>
    </>
  );
};
