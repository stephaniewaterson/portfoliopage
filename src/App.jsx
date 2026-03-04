import "./App.css";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  Suspense,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
  Component,
} from "react";
import { useErrorBoundary } from "use-error-boundary";
import { Route } from "wouter";
import { useSpring } from "@react-spring/core";
import "./styles/partials/_typography.css";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import {
  ContactShadows,
  MeshTransmissionMaterial,
  Text,
  ScrollControls,
  Scroll,
  useScroll,
} from "@react-three/drei";
import { Mac } from "../public/Mac-draco";
import { a as web } from "@react-spring/web";
import { easing } from "maath";
import { useStore } from "../src/components/Store/Store";
import { Overlay } from "./components/Overlay/Overlay";
import { SkillsSection } from "./components/Interface/Interface";
import { Items } from "./components/Projects/Projects";
import { SpaceMan } from "../public/Outhere_space_buddy";
import { Html } from "@react-three/drei";

extend({ Overlay });
extend({ TextGeometry });

// ── Nav styles ─────────────────────────────────────────────────────────────
const navStyles = {
  position: "fixed",
  bottom: "2rem",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "1rem",
  zIndex: 100,
  pointerEvents: "all",
};

const navBtnStyles = {
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.3)",
  color: "#fff",
  padding: "0.55rem 1.4rem",
  borderRadius: "999px",
  fontSize: "0.85rem",
  letterSpacing: "0.08em",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  transition: "background 0.2s, transform 0.15s",
  fontFamily: "inherit",
};

// ── ScrollTo helper (lives inside Canvas so it can read the scroll el) ──────
function ScrollJumper({ targetPage, onDone }) {
  const scroll = useScroll();

  useFrame(() => {
    if (targetPage === null) return;
    // scroll.el is the underlying <div> that ScrollControls uses
    const el = scroll.el;
    if (!el) return;
    const totalWidth = el.scrollWidth - el.clientWidth;
    // pages={3.2} so each "page" = 1/3.2 of total scroll width
    const dest = (targetPage / 3) * totalWidth;
    el.scrollLeft += (dest - el.scrollLeft) * 0.06;
    if (Math.abs(el.scrollLeft - dest) < 1) {
      el.scrollLeft = dest;
      onDone();
    }
  });

  return null;
}

function App({ children }) {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  const [open, setOpen] = useState(false);
  const [hoveredState, setHoveredState] = useState(false);

  // null = idle, number = scroll to that page index
  const [scrollTarget, setScrollTarget] = useState(null);

  const props = useSpring({ open: Number(open) });

  function Selector({ children }) {
    const ref = useRef();
    const store = useStore();

    useFrame(({ viewport, camera, pointer }, delta) => {
      const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 3]);
      easing.damp3(
        ref.current.position,
        [(pointer.x * width) / 2, (pointer.y * height) / 5, 5],
        store.openOverlay ? 0 : 0.1,
        delta
      );
      easing.damp3(
        ref.current.scale,
        store.openOverlay ? 0.5 : 0.01,
        store.openOverlay ? 0.5 : 0.2,
        delta
      );
      easing.dampC(
        ref.current.material.color,
        store.openOverlay ? "#f0f0f0" : "#ccc",
        0.1,
        delta
      );
    });
    return (
      <>
        <mesh ref={ref}>
          <circleGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            samples={16}
            resolution={512}
            anisotropicBlur={0.1}
            thickness={0.1}
            roughness={0.4}
            toneMapped={true}
            background="white"
          />
        </mesh>
        <group
          onPointerOver={() => (store.openOverlay = true)}
          onPointerOut={() => (store.openOverlay = false)}
          onPointerDown={() => (store.openOverlay = true)}
          onPointerUp={() => (store.openOverlay = false)}
        >
          {children}
        </group>
      </>
    );
  }

  return (
    <web.main
      style={{
        background: props.open.to([0, 1], ["#f0f0f0", "#1b1e22"]),
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <web.h1
          style={{
            opacity: props.open.to([0, 1], [1, 0]),
            transform: props.open.to(
              (o) => `translate3d(-50%,${o * 50 - 100}px,0)`
            ),
          }}
        >
          Click to open
        </web.h1>

        {open && (
          <nav style={navStyles}>
            {[
              { label: "Projects", page: 0.5 },
              { label: "Skills", page: 3 },
            ].map(({ label, page }) => (
              <button
                key={label}
                style={navBtnStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => setScrollTarget(page)}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
        <ErrorBoundary>
          <Route path="/">
            <Canvas
              className="flex justify-center items-center h-screen w-screen"
              camera={{ position: [0, -1.5, 12.5] }}
              dpr={[1, 3]}
              gl={{ antialias: false }}
            >
              <ScrollControls
                horizontal
                damping={0.9}
                pages={open ? 3 : 0}
                // max
                // speed={0.2}
                prepend={true}
                distance={0.5}
              >
                {/* Scroll jumper - only active when a target is set */}
                {scrollTarget !== null && (
                  <ScrollJumper
                    targetPage={scrollTarget}
                    onDone={() => setScrollTarget(null)}
                  />
                )}
                <ambientLight />

                <ContactShadows
                  resolution={512}
                  position={[0, -0.8, 0]}
                  opacity={1}
                  scale={10}
                  blur={2}
                  far={0.8}
                />
                <Scroll>
                  <Suspense fallback={null}>
                    <group
                      rotation={[0, 0, 0]}
                      onClick={(e) => (e.stopPropagation(), setOpen(!open))}
                      position={[0, 0.5, 0]}
                    >
                      <Selector>
                        <Mac
                          rotation={[1.65, Math.PI, 1]}
                          open={open}
                          hinge={props.open.to([0, 1], [1.575, -0.425])}
                          onPointerEnter={() => setHoveredState(true)}
                        />
                      </Selector>
                      {open && (
                        <Html position={[0, 7, 0]}>
                          <h1 style={{ color: "white" }}>Stephanie Waterson</h1>
                        </Html>
                      )}
                      {hoveredState && open && (
                        <Overlay
                          style={{
                            position: "absolute",
                            top: "60vh",
                            left: "0.5em",
                          }}
                        />
                      )}
                    </group>
                    <group position={[60, 10, 0]}>
                      <SkillsSection />

                      {open && <SpaceMan position={[-5, -16, 2]} scale={5} />}
                    </group>
                    <group position={[30, 12, 0]} className="items">
                      <Items />
                    </group>
                  </Suspense>
                </Scroll>

                <directionalLight
                  position={[0, 5, -2]}
                  scale={[3, 3, 3]}
                  intensity={Math.PI}
                  color="#FFFFFF"
                />
                <directionalLight
                  position={[2, 2, 2]}
                  scale={[3, 3, 3]}
                  intensity={Math.PI}
                  color="#FFFFFF"
                />

                <ContactShadows
                  position={[0, -4.5, 0]}
                  opacity={0.4}
                  scale={20}
                  blur={1.75}
                  far={4.5}
                />
              </ScrollControls>
            </Canvas>
          </Route>
        </ErrorBoundary>
      </div>
    </web.main>
  );
}

export default App;
