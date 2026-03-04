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
      <Html
        className="skills"
        position={[-9, 0, 0]}
        transform={false}
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "0 8vw",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "8vw",
            pointerEvents: "all", // ← re-enable on content only
          }}
        ></div>
        <Section className="skills__section">
          <motion.div
            className="skills__div"
            whileInView={"visible"}
            animate={{ display: "flex" }}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8vw",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <div className="skills__box1">
              <h2 className="skills__title">Skills</h2>
              <div>
                {skills.map((skill, index) => (
                  <div className="skills__name" key={index}>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      variants={{
                        visible: {
                          opacity: 1,
                          transition: { duration: 1, delay: 1 + index * 0.2 },
                        },
                      }}
                    >
                      {skill.title}
                      <span className="skills__percent">
                        {skill.level}%
                      </span>{" "}
                      {/* ← ADD */}
                    </motion.h3>
                    <div className="skills__bar">
                      <motion.div
                        className="skills__progress"
                        style={{ width: `${skill.level}%` }}
                        initial={{ scaleX: 0, originX: 0 }}
                        variants={{
                          visible: {
                            scaleX: 1,
                            transition: { duration: 1, delay: 1 + index * 0.2 },
                          },
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="other">
                Also: MySQL · REST APIs · Agile · OAuth · GitHub · Salsa Dancing
                💃
              </p>
            </div>

            <div className="skills_box2">
              <h2 className="skills__title">Languages</h2>
              <div className="lang__grid">
                {" "}
                {/* ← CHANGE: was plain <div> */}
                {languages.map((lng, index) => (
                  <div className="lang__pill" key={index}>
                    {" "}
                    {/* ← CHANGE: was skills__name div */}
                    <motion.span
                      className="lang__name"
                      initial={{ opacity: 0 }}
                      variants={{
                        visible: {
                          opacity: 1,
                          transition: { duration: 1, delay: 2 + index * 0.2 },
                        },
                      }}
                    >
                      {lng.title}
                    </motion.span>
                    <span className="lang__level">
                      {lng.level === 100
                        ? "Native"
                        : lng.level >= 80
                        ? "Fluent"
                        : "Conversational"}
                    </span>
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
