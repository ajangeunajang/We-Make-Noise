'use client'

import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Sketch = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];
      const particleSize = 6;
      const startingParticleCount = 50;
      let theme;
      let graphics;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noStroke();
        p.fill(255);

        theme = {
          colors: ["#e71c28", "#ff12d2", "#FFF", "#9e342a", "#0e0374"],
          background: "#000",
        };

        for (let i = 0; i < startingParticleCount; i++) {
          particles.push(new Particle());
        }

        graphics = p.createGraphics(p.width, p.height);
        graphics.background(theme.background);
        graphics.noStroke();
      };

      p.draw = () => {
        for (const particle of particles) {
          particle.update();
          particle.draw();
        }
        p.image(graphics, 0, 0);
      };

      // **마우스 인터랙션 이벤트**
      p.mousePressed = () => {
        const particle = new Particle(p.mouseX, p.mouseY);
        particle.color = p.random(theme.colors);
        particles.push(particle);
      };

      p.mouseDragged = () => {
        const particle = new Particle(
          p.mouseX + p.random(-10, 10),
          p.mouseY + p.random(-10, 10)
        );
        particle.color = p.random(theme.colors);
        particles.push(particle);
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        graphics = p.createGraphics(p.width, p.height);
        graphics.background(theme.background);
      };

      class Particle {
        constructor(x, y) {
          this.pos = p.createVector(
            x || p.random(-50, p.width + 50),
            y || p.random(-50, p.height + 50)
          );
          this.color = p.random(theme.colors);
          this.radius = p.random(1, particleSize);
        }

        update() {
          const dir =
            p.noise(this.pos.x / 1000, this.pos.y / 1000) * p.TWO_PI * 1000;
          this.pos.add(
            (0.5 * Math.cos(dir)) / 2,
            (0.5 * Math.sin(dir)) / 2
          );

          if (this.pos.x < -50) this.pos.x = p.width + 50;
          if (this.pos.x > p.width + 50) this.pos.x = -50;
          if (this.pos.y < -50) this.pos.y = p.height + 50;
          if (this.pos.y > p.height + 50) this.pos.y = -50;
        }

        draw() {
          graphics.fill(this.color);
          graphics.circle(this.pos.x, this.pos.y, this.radius);
        }
      }
    };

    const canvas = new p5(sketch, sketchRef.current);
    return () => canvas.remove();
  }, []);

  return <div ref={sketchRef} style={{ width: "100%", height: "100%", position: "fixed", }} />;
};

export default Sketch;
