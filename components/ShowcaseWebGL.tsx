"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ShowcaseWebGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    cam.position.z = 14;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geo = new THREE.PlaneGeometry(34, 20, 160, 100);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        u_time: { value: 0 },
        u_c1: { value: new THREE.Color("#8a6a4a") },
        u_c2: { value: new THREE.Color("#EFE9DD") },
        u_c3: { value: new THREE.Color("#5d4631") },
      },
      vertexShader: `
        uniform float u_time;
        varying float v_e;
        varying vec2 v_uv;
        void main() {
          v_uv = uv;
          vec3 p = position;
          float w = sin(p.x * 0.5 + u_time * 0.6) * cos(p.y * 0.4 + u_time * 0.4) * 1.4;
          w += sin(p.x * 0.2 - u_time * 0.3) * 1.2;
          p.z += w;
          v_e = w;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: `
        precision mediump float;
        uniform vec3 u_c1, u_c2, u_c3;
        varying float v_e;
        varying vec2 v_uv;
        void main() {
          float m = smoothstep(-2.0, 2.0, v_e);
          vec3 col = mix(u_c3, u_c1, m);
          col = mix(col, u_c2, pow(m, 2.5) * 0.5);
          float a = 0.42 + 0.22 * m;
          a *= smoothstep(0.0, 0.18, v_uv.y) * smoothstep(0.0, 0.18, 1.0 - v_uv.y);
          gl_FragColor = vec4(col, a);
        }`,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -0.5;
    scene.add(mesh);

    const clock = new THREE.Clock();
    let raf = 0;

    const frame = () => {
      mat.uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, cam);
      raf = requestAnimationFrame(frame);
    };
    frame();

    const onResize = () => {
      cam.aspect = window.innerWidth / window.innerHeight;
      cam.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="webgl" ref={canvasRef} />;
}
