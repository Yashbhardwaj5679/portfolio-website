import React, { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

interface ParticleBackgroundProps {
  darkMode: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ darkMode }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // Load the slim bundle (basic features, lightweight)
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent", // Keep page background visible
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push", // Add particles on click
            },
            onHover: {
              enable: true,
              mode: "grab", // Smooth link hover effect
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 3, // Add 3 particles per click
            },
            grab: {
              distance: 180,
              links: {
                opacity: 0.6, // Stronger glow on hover
              },
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: darkMode
              ? ["#60A5FA", "#9333EA", "#3B82F6"] // blue → purple gradient in dark mode
              : ["#2563EB", "#1D4ED8", "#3B82F6"], // lighter blue shades for light mode
          },
          links: {
            color: darkMode ? "#60A5FA" : "#3B82F6",
            distance: 150,
            enable: true,
            opacity: 0.35,
            width: 1.2,
            triangles: {
              enable: true, // extra geometric effect
              opacity: 0.05,
            },
          },
          move: {
            enable: true,
            speed: 1.2,
            outModes: {
              default: "bounce",
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 70, // Balanced count (doesn't lag)
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;
