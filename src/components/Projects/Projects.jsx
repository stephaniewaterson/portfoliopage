import { Html } from "@react-three/drei";
import { motion } from "framer-motion";

const projects = [
  {
    img: "/images/2.png",
    title: "LocalLingo",
    desc: "Language learning platform with country-based matching, multi-language chat, and Spanish, Arabic, and Malay support.",
    tags: ["React", "Node.js", "MySQL"],
    link: "https://locallingo.netlify.app/",
    featured: true,
  },
  {
    img: "/images/4.png",
    title: "3D Racing Game",
    tags: ["Three.js", "WebGL", "R3F"],
    link: "https://spaceflight.netlify.app/",
  },
  {
    img: "/images/2.png",
    title: "This Portfolio",
    tags: ["R3F", "Drei", "React Spring"],
    link: "#",
  },
];

export function Items() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Html
      position={[0, 0, 0]}
      transform={false}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 8vw",
        pointerEvents: "none",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "55vw" }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            color: "#f0f0f0",
            marginBottom: "0.75rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Projects
        </h2>

        {/* Layout */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "flex-start",
            marginTop: "1.5rem",
          }}
        >
          {/* Featured card */}
          <div
            style={{
              flex: "1.4",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(232,69,60,0.25)",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => window.open(featured.link)}
          >
            <img
              src={featured.img}
              alt={featured.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                display: "block",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            />
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  fontFamily: "'Dela Gothic One', sans-serif",
                  fontSize: "1.4rem",
                  color: "#f0f0f0",
                  marginBottom: "0.6rem",
                }}
              >
                {featured.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#888",
                  lineHeight: "1.7",
                  marginBottom: "1rem",
                }}
              >
                {featured.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                  marginBottom: "1.2rem",
                }}
              >
                {featured.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "4px",
                      background: "rgba(232,69,60,0.12)",
                      color: "#e8453c",
                      border: "1px solid rgba(232,69,60,0.25)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(featured.link);
                }}
                style={{
                  padding: "0.5rem 1.2rem",
                  border: "1px solid #e8453c",
                  borderRadius: "6px",
                  background: "transparent",
                  color: "#e8453c",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                View project →
              </button>
            </div>
          </div>

          {/* Sidebar list */}
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
            }}
          >
            {rest.map((p, i) => (
              <div
                key={i}
                onClick={() => p.link !== "#" && window.open(p.link)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.2rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  cursor: p.link !== "#" ? "pointer" : "default",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
                }
              >
                <img
                  src={p.img}
                  alt={p.title}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      color: "#f0f0f0",
                      marginBottom: "0.2rem",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#666",
                    }}
                  >
                    {p.tags.join(" · ")}
                  </div>
                </div>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#555",
                    fontSize: "1rem",
                  }}
                >
                  →
                </span>
              </div>
            ))}

            {/* Coming soon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 1.2rem",
                border: "1px dashed rgba(255,255,255,0.08)",
                borderRadius: "12px",
                opacity: 0.4,
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  border: "1px dashed rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: "4vh 8vw",
                  color: "#555",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                }}
              >
                +
              </div>
              <div style={{ fontSize: "0.85rem", color: "#555" }}>
                More coming soon
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Html>
  );
}

// import { Html } from "@react-three/drei";
// import "./Projects.css";
// import * as THREE from "three";
// import { useRef, useState, useEffect } from "react";
// import { useFrame, useThree } from "@react-three/fiber";
// import { useIntersect, Image, ScrollControls, Scroll } from "@react-three/drei";

// function Item({ url, scale, ...props }) {
//   const visible = useRef(false);
//   const [hovered, hover] = useState(false);
//   const ref = useIntersect((isVisible) => (visible.current = isVisible));
//   const { height } = useThree((state) => state.viewport);
//   useFrame((state, delta) => {
//     ref.current.position.y = THREE.MathUtils.damp(
//       ref.current.position.y,
//       visible.current ? 0 : -height / 2 + 1,
//       4,
//       delta
//     );
//     ref.current.material.zoom = THREE.MathUtils.damp(
//       ref.current.material.zoom,
//       visible.current ? 1 : 1.5,
//       4,
//       delta
//     );
//     ref.current.material.grayscale = THREE.MathUtils.damp(
//       ref.current.material.grayscale,
//       hovered ? 1 : 0,
//       4,
//       delta
//     );
//   });
//   return (
//     <group {...props}>
//       <Image
//         ref={ref}
//         onPointerOver={() => hover(true)}
//         onPointerOut={() => hover(false)}
//         scale={scale}
//         url={url}
//       />
//     </group>
//   );
// }

// export function Items() {
//   const { width: w, height: h } = useThree((state) => state.viewport);

//   const projects = [
//     {
//       url: "/images/2.png",
//       title: "LocalLingo",
//       desc: "Language learning platform with country-based chat.",
//       tags: ["React", "Node.js", "MySQL"],
//       link: "https://locallingo.netlify.app/",
//     },
//     {
//       url: "/images/4.png",
//       title: "3D Racing Game",
//       desc: "WebGL racing game with procedural terrain.",
//       tags: ["Three.js", "R3F", "WebGL"],
//       link: "https://spaceflight.netlify.app/",
//     },
//   ];

//   const imageHeight = w / 3.5;
//   const imageWidth = w / 2.5;

//   return (
//     <>
//       {projects.map((p, i) => {
//         const xPos = i === 0 ? -imageWidth / 2 - 1 : imageWidth / 2 + 1;
//         return (
//           <group key={i} position={[xPos, 0, 0]}>
//             <Item
//               url={p.url}
//               scale={[imageWidth, imageHeight, 1]}
//               position={[0, 0, 0]}
//               onClick={() => window.open(p.link)}
//             />
//             <Html position={[0, -imageHeight / 2 - 1, 0]} center>
//               <div
//                 style={{
//                   color: "#f0f0f0",
//                   textAlign: "center",
//                   pointerEvents: "none",
//                   fontFamily: "'DM Sans', sans-serif",
//                   width: "200px",
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: "1rem",
//                     fontWeight: "600",
//                     marginBottom: "0.3rem",
//                   }}
//                 >
//                   {p.title}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "0.75rem",
//                     color: "#888",
//                     marginBottom: "0.5rem",
//                   }}
//                 >
//                   {p.desc}
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "0.3rem",
//                     justifyContent: "center",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   {p.tags.map((tag, t) => (
//                     <span
//                       key={t}
//                       style={{
//                         fontSize: "0.65rem",
//                         padding: "0.2rem 0.5rem",
//                         borderRadius: "4px",
//                         background: "rgba(232,69,60,0.15)",
//                         color: "#e8453c",
//                         border: "1px solid rgba(232,69,60,0.25)",
//                       }}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </Html>
//           </group>
//         );
//       })}
//     </>
//   );
// }
