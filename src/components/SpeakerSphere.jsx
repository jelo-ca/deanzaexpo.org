import { useEffect, useMemo, useRef, useState } from "react";
import "./SpeakerSphere.css";
import "./Card.css";
import Card from "./Card";

// Sample data – replace with real speakers when you have them
const speakers = [
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
  {
    name: "John Jhonson",
    role: "Head of the heads in Tech",
    org: "Cool Organization",
    image: "https://picsum.photos/200?random=1",
  },
];

// Helper: compute radius based on viewport height (vh)
function computeRadiusFromVh() {
  if (typeof window === "undefined") return 180;
  const vh = window.innerHeight;
  let radius = vh * 0.3; // ~22vh
  radius = Math.max(300, Math.min(radius, 300));
  return radius;
}

// Place cards in latitude bands, max 8 columns per band
function createTransforms(count, radius) {
  const items = [];
  if (count === 0) return items;

  const columns = 6; // ⬅ fixed number of "columns"
  const bands = Math.max(1, Math.ceil(count / columns)); // how many rows

  const maxLatDeg = 45; // vertical spread from top (+45°) to bottom (−45°)

  let placed = 0;

  for (let band = 0; band < bands; band++) {
    const remaining = count - placed;
    if (remaining <= 0) break;

    const itemsInBand = Math.min(columns, remaining);

    // 0 at top row, 1 at bottom row
    const tBand = bands === 1 ? 0.5 : band / (bands - 1);

    // latitude degrees: +maxLat at top → -maxLat at bottom
    const latDeg = (1 - 2 * tBand) * maxLatDeg;

    for (let col = 0; col < itemsInBand; col++) {
      const lonDeg = (360 / itemsInBand) * col; // evenly spaced in this band

      const transform = `
        translate(-50%, -50%)
        rotateY(${lonDeg}deg)
        rotateX(${latDeg}deg)
        translateZ(${radius}px)
      `;

      items.push({
        transform,
        thetaDeg: lonDeg, // used for snapping around Y axis
        phiDeg: latDeg,
      });

      placed++;
      if (placed >= count) break;
    }
  }

  return items;
}

function SpeakerSphere() {
  const containerRef = useRef(null);
  const sphereRef = useRef(null);

  const [radius, setRadius] = useState(() => computeRadiusFromVh());

  // Update radius on window resize
  useEffect(() => {
    function handleResize() {
      setRadius(computeRadiusFromVh());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Recompute transforms whenever radius changes
  const itemTransforms = useMemo(
    () => createTransforms(speakers.length, radius),
    [radius]
  );

  useEffect(() => {
    const container = containerRef.current;
    const sphere = sphereRef.current;
    if (!container || !sphere) return;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    let currentRotX = -10;
    let currentRotY = 0;

    let targetRotX = -10;
    let targetRotY = 0;

    const dragSensitivity = 0.25;
    const damping = 0.12;

    const clampRotX = (x) => Math.max(-85, Math.min(85, x));

    // --- Idle auto-rotation settings ---
    const idleDelay = 2500; // ms to wait after last drag before resuming
    const autoRotateSpeed = 10; // degrees per second around Y

    // IMPORTANT: start as if we were idle long ago
    // so auto-rotation runs immediately on load.
    let lastInteraction = performance.now() - idleDelay - 1;

    let animationFrameId;
    let prevTime = null;

    function animate(timestamp) {
      if (prevTime === null) prevTime = timestamp;
      const dt = timestamp - prevTime;
      prevTime = timestamp;

      // If not dragging and we've been idle long enough, auto-rotate
      if (!isDragging && timestamp - lastInteraction > idleDelay) {
        targetRotY += (autoRotateSpeed * dt) / 1000; // deg per frame
      }

      // Ease current rotation toward target
      currentRotX += (targetRotX - currentRotX) * damping;
      currentRotY += (targetRotY - currentRotY) * damping;

      sphere.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    function markInteraction() {
      lastInteraction = performance.now();
    }

    function startDrag(clientX, clientY) {
      isDragging = true;
      container.classList.add("dragging");
      lastX = clientX;
      lastY = clientY;
      markInteraction(); // stop auto-rotate right away
    }

    function moveDrag(clientX, clientY) {
      if (!isDragging) return;
      const deltaX = clientX - lastX;
      const deltaY = clientY - lastY;
      lastX = clientX;
      lastY = clientY;

      targetRotY += deltaX * dragSensitivity;
      targetRotX = clampRotX(targetRotX - deltaY * dragSensitivity);
      markInteraction(); // keep resetting idle timer while dragging
    }

    // Snap to nearest card on release
    function snapToNearest() {
      const longitudes = itemTransforms.map((t) => t.thetaDeg);

      let bestRotY = targetRotY;
      let bestDelta = Infinity;
      const currentY = currentRotY;

      for (const thetaDeg of longitudes) {
        const base = -thetaDeg;
        const k = Math.round((currentY - base) / 360);
        const candidate = base + 360 * k;
        const delta = Math.abs(candidate - currentY);

        if (delta < bestDelta) {
          bestDelta = delta;
          bestRotY = candidate;
        }
      }

      targetRotY = bestRotY;
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      container.classList.remove("dragging");
      snapToNearest();
      markInteraction(); // wait idleDelay before resuming auto-rotate
    }

    // Mouse
    const onMouseDown = (e) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    };
    const onMouseMove = (e) => {
      moveDrag(e.clientX, e.clientY);
    };
    const onMouseUp = () => {
      endDrag();
    };

    // Touch
    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      endDrag();
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);

      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [itemTransforms]);

  return (
    <div className="sphere-container" ref={containerRef}>
      <div className="sphere-glow" />
      <div className="sphere" ref={sphereRef}>
        {itemTransforms.map((item, idx) => (
          <div className="sphere-item" key={idx}>
            <div
              className="sphere-item-inner"
              style={{ transform: item.transform }}
            >
              <Card person={speakers[idx]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpeakerSphere;
