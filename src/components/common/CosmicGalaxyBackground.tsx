import React, { useEffect, useRef } from 'react';

interface CosmicGalaxyBackgroundProps {
  density?: number;
  className?: string;
}

export const CosmicGalaxyBackground: React.FC<CosmicGalaxyBackgroundProps> = ({
  density = 80,
  className = "absolute inset-0 pointer-events-none overflow-hidden"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create 3D starfield particles
    const stars: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      twinkleSpeed: number;
      color: string;
      speedX: number;
      speedY: number;
    }> = [];

    const colors = [
      '#00D2FF', // Cyan
      '#38BDF8', // Sky
      '#818CF8', // Indigo
      '#C084FC', // Purple
      '#FFFFFF', // White
      '#F472B6'  // Pink
    ];

    const starCount = Math.min(Math.floor((width * height) / 10000) + density, 160);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * width,
        size: Math.random() * 2 + 0.5,
        baseAlpha: Math.random() * 0.7 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2
      });
    }

    // Shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }> = [];

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * (height / 2),
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 4,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1,
        active: true
      });
    };

    let shootingStarTimer = 0;

    // Mouse tracking for parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.01;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const offsetX = (mouseX - width / 2) * 0.04;
      const offsetY = (mouseY - height / 2) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle rotating galaxy nebula gradient center
      const centerX = width / 2 + offsetX;
      const centerY = height / 2 + offsetY;

      const grad1 = ctx.createRadialGradient(
        centerX, centerY, 10,
        centerX, centerY, width * 0.4
      );
      grad1.addColorStop(0, 'rgba(138, 43, 226, 0.08)');
      grad1.addColorStop(0.5, 'rgba(0, 210, 255, 0.05)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Draw 3D moving stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle logic
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Parallax movement
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x > width) star.x = -50;
        if (star.x < -50) star.x = width;
        if (star.y > height) star.y = -50;
        if (star.y < -50) star.y = height;

        const drawX = star.x + offsetX * (star.size * 0.5);
        const drawY = star.y + offsetY * (star.size * 0.5);

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fill();

        // Extra glow for larger stars
        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.alpha * 0.25;
          ctx.fill();
        }
      }

      // Handle shooting stars
      shootingStarTimer++;
      if (shootingStarTimer % 180 === 0 && Math.random() > 0.3) {
        spawnShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) continue;

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.015;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          ss.active = false;
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const ssGrad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        ssGrad.addColorStop(0, `rgba(0, 210, 255, ${ss.opacity})`);
        ssGrad.addColorStop(0.3, `rgba(138, 43, 226, ${ss.opacity * 0.6})`);
        ssGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = ssGrad;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = ss.opacity;
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [density]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
