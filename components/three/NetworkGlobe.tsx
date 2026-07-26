"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Pure Vanilla Three.js implementation of the Hero Network Globe.
 * Eliminates reliance on @react-three/fiber internal React secrets that break on React 19,
 * providing maximum stability, lower memory overhead, and smooth 60fps rendering.
 */
export default function NetworkGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x8b5cf6, 0x050816, 0.4);
    scene.add(hemiLight);

    const pointLight = new THREE.PointLight(0x22d3ee, 0.8);
    pointLight.position.set(-4, 2, -3);
    scene.add(pointLight);

    // Main rotating group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // A. Dense Inner Core Layers
    const coreGroup = new THREE.Group();
    const core1Geo = new THREE.IcosahedronGeometry(1.35, 3);
    const core1Mat = new THREE.MeshBasicMaterial({ color: 0x2563eb, wireframe: true, transparent: true, opacity: 0.4 });
    const core1Mesh = new THREE.Mesh(core1Geo, core1Mat);
    coreGroup.add(core1Mesh);

    const core2Geo = new THREE.IcosahedronGeometry(1.42, 2);
    const core2Mat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.22 });
    const core2Mesh = new THREE.Mesh(core2Geo, core2Mat);
    coreGroup.add(core2Mesh);

    mainGroup.add(coreGroup);

    // B. Tilted Equatorial Ring
    const ringGeo = new THREE.TorusGeometry(2.1, 0.012, 8, 128);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.5 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.4;
    mainGroup.add(ringMesh);

    // C. Outer Tech Shell
    const shellGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const shellMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, wireframe: true, transparent: true, opacity: 0.12 });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    mainGroup.add(shellMesh);

    // D. Network Node Points
    const nodeCount = 14;
    const nodeGroup = new THREE.Group();
    const nodeMeshes: { mesh: THREE.Mesh; speed: number; offset: number }[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.9 });

    for (let i = 0; i < nodeCount; i++) {
      const r = 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      nodeGroup.add(mesh);
      nodeMeshes.push({
        mesh,
        speed: 1 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2,
      });
    }
    mainGroup.add(nodeGroup);

    // E. Ambient Particle Shell
    const particleCount = 700;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.022,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // Pointer Interaction
    let targetX = 0;
    let targetY = 0;
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.15;
      targetY = y * 0.15;
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Rotations
      coreGroup.rotation.y += delta * 0.05;
      ringMesh.rotation.z += delta * 0.12;
      shellMesh.rotation.y -= delta * 0.025;
      nodeGroup.rotation.y += delta * 0.025;
      particlePoints.rotation.y += delta * 0.015;

      // Node Pulses
      for (let i = 0; i < nodeMeshes.length; i++) {
        const item = nodeMeshes[i];
        if (!item) continue;
        const { mesh, speed, offset } = item;
        const pulse = 1 + Math.sin(elapsedTime * speed + offset) * 0.35;
        mesh.scale.setScalar(pulse);
      }

      // Pointer Lerp
      mainGroup.rotation.x += (targetY - mainGroup.rotation.x) * 0.04;
      mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up WebGL resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      core1Geo.dispose();
      core1Mat.dispose();
      core2Geo.dispose();
      core2Mat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[300px]" />;
}
