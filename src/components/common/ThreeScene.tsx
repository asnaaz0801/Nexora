import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  className?: string;
  variant?: 'hero' | 'ecosystem' | 'minimal';
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ 
  className = "w-full h-full",
  variant = 'hero' 
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = mount.clientWidth || 300;
    const height = mount.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = variant === 'hero' ? 6 : 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group to hold all 3D components
    const group = new THREE.Group();
    scene.add(group);

    // Central Icosahedron Wireframe
    const geometry = new THREE.IcosahedronGeometry(variant === 'hero' ? 1.6 : 1.2, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00D2FF,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const sphere = new THREE.Mesh(geometry, wireframeMaterial);
    group.add(sphere);

    // Inner Glowing Core
    const coreGeo = new THREE.SphereGeometry(variant === 'hero' ? 0.9 : 0.6, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0070F3,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Orbit Ring 1 (Torus)
    const ringGeo1 = new THREE.TorusGeometry(variant === 'hero' ? 2.4 : 1.8, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    group.add(ring1);

    // Orbit Ring 2
    const ringGeo2 = new THREE.TorusGeometry(variant === 'hero' ? 2.8 : 2.1, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00D2FF,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    // Orbiting Satellite Node (Rocket / Innovation Node)
    const satelliteGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const satelliteMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const satellite = new THREE.Mesh(satelliteGeo, satelliteMat);
    group.add(satellite);

    // Mouse Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / height) * 2 - 1);
      targetRotationY = mouseX * 0.5;
      targetRotationX = -mouseY * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous rotations
      sphere.rotation.y = elapsedTime * 0.15;
      sphere.rotation.x = elapsedTime * 0.08;

      core.rotation.y = -elapsedTime * 0.2;
      core.rotation.z = elapsedTime * 0.1;

      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.2;

      // Orbiting satellite path
      const radius = variant === 'hero' ? 2.4 : 1.8;
      const angle = elapsedTime * 0.8;
      satellite.position.x = Math.cos(angle) * radius;
      satellite.position.y = Math.sin(angle) * radius * Math.cos(Math.PI / 3);
      satellite.position.z = Math.sin(angle) * radius * Math.sin(Math.PI / 3);

      // Smooth mouse easing
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      wireframeMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satelliteGeo.dispose();
      satelliteMat.dispose();
      renderer.dispose();
    };
  }, [variant]);

  return <div ref={mountRef} className={className} />;
};
