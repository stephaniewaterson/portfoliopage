import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { useErrorBoundary } from "use-error-boundary";
import { extend } from "@react-three/fiber";
import { Route } from "wouter";
import { useSpring } from "@react-spring/core";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Mac } from "../public/Mac-draco";
import { a as web } from "@react-spring/web";
import { PerspectiveCamera } from "@react-three/drei";

function App() {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  const [open, setOpen] = useState(false);
  const props = useSpring({ open: Number(open) });

  return (
    <web.main
      style={{
        background: props.open.to([0, 1], ["#f0f0f0", "#e1f5ff"]),
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
            >
              <ambientLight />

              <Suspense fallback={null}>
                <group
                  rotation={[0, 0, 0]}
                  onClick={(e) => (e.stopPropagation(), setOpen(!open))}
                >
                  <Mac
                    rotation={[1.15, Math.PI, 1]}
                    open={open}
                    hinge={props.open.to([0, 1], [1.575, -0.425])}
                  />
                </group>
              </Suspense>

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
              <OrbitControls />
              <ContactShadows
                position={[0, -4.5, 0]}
                opacity={0.4}
                scale={20}
                blur={1.75}
                far={4.5}
              />
            </Canvas>
          </Route>
        </ErrorBoundary>
      </div>
    </web.main>
  );
}

export default App;
