import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect } from "react";
import { useErrorBoundary } from "use-error-boundary";
import { extend } from "@react-three/fiber";
import { Route } from "wouter";
import { useSpring } from "@react-spring/core";
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
import useWindowDimensions from "./components/Viewport/Viewport";
import { ScrollManage } from "./components/ScrollManager/ScrollManager";
import { framerMotionConfig } from "./components/Config/Config";

import { SpaceMan } from "../public/Outhere_space_buddy";

extend({ Overlay });

function Experience() {
  const { height, width } = useThree((state) => state.viewport);
  const data = useScroll();
  const group = useRef();

  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 3;
    group.current.children[3].material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[4].material.zoom =
      1 + data.range(1.25 / 3, 1 / 3) / 1;
    group.current.children[5].material.zoom =
      1 + data.range(1.8 / 3, 1 / 3) / 3;
    group.current.children[6].material.zoom =
      1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
    group.current.children[7].material.zoom =
      1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
    group.current.children[8].material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 3;
    group.current.children[9].material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 3;
  });
}

function App({ children }) {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  const [open, setOpen] = useState(false);
  const [hoveredState, setHoveredState] = useState(false);
  const props = useSpring({ open: Number(open) });
  const viewport = useWindowDimensions();

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
        store.openOverlay ? 4 : 0.01,
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
        background: props.open.to([0, 1], ["#f0f0f0", "#ff5c5c"]),
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
          click to open
        </web.h1>

        <ErrorBoundary>
          <Route path="/">
            <Canvas
              className="flex justify-center items-center h-screen w-screen"
              camera={{ position: [0, -3.5, 12.5] }}
              dpr={[1, 3]}
              gl={{ antialias: false }}
            >
              <ScrollControls damping={0.5} pages={3}>
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
                      position={[0, 0, 0]}
                    >
                      <Selector>
                        <Mac
                          rotation={[1.15, Math.PI, 1]}
                          open={open}
                          hinge={props.open.to([0, 1], [1.575, -0.425])}
                          onPointerEnter={() => setHoveredState(true)}
                        />
                      </Selector>

                      {open && (
                        <Text
                          style={{
                            position: "absolute",
                            top: "60vh",
                            left: "0.5em",
                          }}
                          className="name"
                          position={[2, 12, -7]}
                          fontSize={6}
                        >
                          Stephanie Waterson
                          <meshStandardMaterial
                            color="#ffffff"
                            toneMapped={false}
                          />
                        </Text>
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
                    <group position={[0, -24, 0]}>
                      <SkillsSection />
                      <SpaceMan position={[9, 7, 0]} scale={5} />
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
