"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Pure Vanilla Three.js implementation of the AI Brain scene for Chapter 7.
 * Eliminates reliance on @react-three/fiber internal React secrets that break on React 19,
 * providing maximum stability, lower memory overhead, and smooth 60fps rendering.
 */
export default function AIBrain() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x22d3ee, 0.6);
    pointLight.position.set(3, 2, 4);
    scene.add(pointLight);

    // 3. Core Neural Geometry
    const coreGroup = new THREE.Group();

    const icosaGeo = new THREE.IcosahedronGeometry(1.3, 2);
    const edgesGeo = new THREE.EdgesGeometry(icosaGeo);

    const lineMat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.55 });
    const lineSegments = new THREE.LineSegments(edgesGeo, lineMat);
    coreGroup.add(lineSegments);

    const meshMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });
    const coreMesh = new THREE.Mesh(icosaGeo, meshMat);
    coreGroup.add(coreMesh);

    scene.add(coreGroup);

    // 4. Prominent Orbit Nodes (6 cyan spheres)
    const nodeCount = 6;
    const orbitNodesGroup = new THREE.Group();
    const orbitNodeMeshes: { mesh: THREE.Mesh; radius: number; speed: number; offset: number }[] = [];

    const orbitNodeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const orbitNodeMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 1.2,
    });

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(orbitNodeGeo, orbitNodeMat);
      orbitNodesGroup.add(mesh);
      orbitNodeMeshes.push({
        mesh,
        radius: 2.1,
        speed: 0.3,
        offset: (i / nodeCount) * Math.PI * 2,
      });
    }
    scene.add(orbitNodesGroup);

    // 5. Ambient Synapses (60 small spheres)
    const synapseCount = 60;
    const synapseGroup = new THREE.Group();
    const synapseMeshes: { mesh: THREE.Mesh; radius: number; speed: number; offset: number; tilt: number }[] = [];

    const synapseGeo = new THREE.SphereGeometry(0.025, 8, 8);
    const cyanMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.85 });
    const blueMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.85 });

    for (let i = 0; i < synapseCount; i++) {
      const mat = Math.random() > 0.5 ? cyanMat : blueMat;
      const mesh = new THREE.Mesh(synapseGeo, mat);
      synapseGroup.add(mesh);
      synapseMeshes.push({
        mesh,
        radius: 1.8 + Math.random() * 1.4,
        speed: 0.15 + Math.random() * 0.25,
        offset: Math.random() * Math.PI * 2,
        tilt: Math.random() * Math.PI,
      });
    }
    scene.add(synapseGroup);

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

      // Core rotation & pulse
      coreGroup.rotation.y += delta * 0.05;
      const pulse = 1 + Math.sin(elapsedTime * 1.2) * 0.04;
      coreGroup.scale.setScalar(pulse);

      // Orbit Nodes Animation
      for (let i = 0; i < orbitNodeMeshes.length; i++) {
        const item = orbitNodeMeshes[i];
        if (!item) continue;
        const { mesh, radius, speed, offset } = item;
        const angle = elapsedTime * speed + offset;
        mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 0.6) * radius * 0.5,
          Math.sin(angle) * radius
        );
      }
      orbitNodesGroup.rotation.y += delta * 0.03;

      // Synapses Animation
      for (let i = 0; i < synapseMeshes.length; i++) {
        const item = synapseMeshes[i];
        if (!item) continue;
        const { mesh, radius, speed, offset, tilt } = item;
        const angle = elapsedTime * speed + offset;
        mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * radius * Math.cos(tilt)),
          Math.sin(angle * radius * Math.sin(tilt))
        );
      }
      synapseGroup.rotation.y += delta * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up WebGL resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      icosaGeo.dispose();
      edgesGeo.dispose();
      lineMat.dispose();
      meshMat.dispose();
      orbitNodeGeo.dispose();
      orbitNodeMat.dispose();
      synapseGeo.dispose();
      cyanMat.dispose();
      blueMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[300px]" />;
}
