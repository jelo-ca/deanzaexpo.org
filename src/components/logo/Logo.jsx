import { delay, motion } from "framer-motion";

export default function Logo({
  className,
  width = 220,
  height = 176,
})  {

  const pathVariant = {
    hidden: { pathLength: 0 },
    show: {
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeIn" },
    }
  };

  const fillVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 1 ,duration: 1, ease: "easeIn" },
    }
  };

  return (

    // Draws Path
    <motion.svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 1733.3333 1386.6667"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="show"
      role="img"
      aria-label="DAX logo"
    >
      <motion.g
      viewport={{ once: true, amount: .75 }}
        variants={pathVariant}
        initial="hidden"
        whileInView="show"
      >
        <motion.path
          d="m 1731.52,6504.39 c 0,-239.88 2.11,-2319.18 2.11,-2546.13 226.01,-4.52 452.93,-3.01 678.34,16.88 34.753,37.97 658.46,22.759 873.93,485.17 122.35,176.6 200.7,380.91 245,590.66 44.3,323.35 -53.04,659.05 -244.4,921.23 -131.33,193 -325,327.65 -537.15,420.16 -157.1,68.5 -323.46,105.12 -494.78,109.8 -174.23,4.75 -348.87,-0.77 -523.05,2.23 m -989.336,904.96 c 113.257,0 160.179,-5.41 1397.066,-1.5 699.74,31.94 1413.65,-270.32 1868.69,-804.92 612.48,-745.18 656.51,-1751.85 202.51,-2463.56 -99.45,-193.16 -257.06,-343.84 -413.46,-490.9 -403.81,-351.98 -925.75,-577.39 -1465.18,-586.13 -220.79,-2.51 -1592.337,-7.79 -1592.337,-5.25 0,80.89 -6.961,1723.45 -8.739,2761.42 4.52,521.04 -9.652,1070.41 11.45,1590.84"
          transform="matrix(0.13333333,0,0,-0.13333333,0,1386.6667)"
          fill="currentColor"
          viewport={{ once: true, amount: .75 }}
          variants={pathVariant}
        initial="hidden"
        whileInView="show"
          style={{ stroke: "currentColor", strokeWidth: 30, fill: "transparent" }}
        />

        <motion.path
          d="m 5678.95,3994.65 278.76,2525.93 826.04,-1765.09 z m 6753.35,3414.7 H 10637.4 L 9216,6430.48 8760.98,7409.35 H 7620.66 l 733.07,-1572.5 -697.46,-484.19 -961.25,2056.69 H 4965.95 l -461.68,-4352.27 1643.89,5.55 1072.2,759.9 558,-1192.34 h 1153.23 l -848,1804.12 695.75,493.08 1075.05,-2297.2 H 11003.2 L 9666.39,5498.76"
          transform="matrix(0.13333333,0,0,-0.13333333,0,1386.6667)"
          fill="currentColor"
          viewport={{ once: true, amount: .75 }}
          variants={pathVariant}
        initial="hidden"
          whileInView="show"
          style={{ stroke: "currentColor", strokeWidth: 30, fill: "transparent" }}
        />
      </motion.g>

        {/* Fill in the SVG after path is drawn */}
      <motion.g
      viewport={{ once: true, amount: .75 }}
        variants={fillVariant}
        initial="hidden"
        whileInView="show"
      >
        <motion.path
          d="m 1731.52,6504.39 c 0,-239.88 2.11,-2319.18 2.11,-2546.13 226.01,-4.52 452.93,-3.01 678.34,16.88 34.753,37.97 658.46,22.759 873.93,485.17 122.35,176.6 200.7,380.91 245,590.66 44.3,323.35 -53.04,659.05 -244.4,921.23 -131.33,193 -325,327.65 -537.15,420.16 -157.1,68.5 -323.46,105.12 -494.78,109.8 -174.23,4.75 -348.87,-0.77 -523.05,2.23 m -989.336,904.96 c 113.257,0 160.179,-5.41 1397.066,-1.5 699.74,31.94 1413.65,-270.32 1868.69,-804.92 612.48,-745.18 656.51,-1751.85 202.51,-2463.56 -99.45,-193.16 -257.06,-343.84 -413.46,-490.9 -403.81,-351.98 -925.75,-577.39 -1465.18,-586.13 -220.79,-2.51 -1592.337,-7.79 -1592.337,-5.25 0,80.89 -6.961,1723.45 -8.739,2761.42 4.52,521.04 -9.652,1070.41 11.45,1590.84"
          transform="matrix(0.13333333,0,0,-0.13333333,0,1386.6667)"
          fill="currentColor"
          viewport={{ once: true, amount: .75 }}
          variants={fillVariant}
        initial="hidden"
        whileInView="show"
          style={{ stroke: "currentColor", strokeWidth: 30}}
        />

        <motion.path
          d="m 5678.95,3994.65 278.76,2525.93 826.04,-1765.09 z m 6753.35,3414.7 H 10637.4 L 9216,6430.48 8760.98,7409.35 H 7620.66 l 733.07,-1572.5 -697.46,-484.19 -961.25,2056.69 H 4965.95 l -461.68,-4352.27 1643.89,5.55 1072.2,759.9 558,-1192.34 h 1153.23 l -848,1804.12 695.75,493.08 1075.05,-2297.2 H 11003.2 L 9666.39,5498.76"
          transform="matrix(0.13333333,0,0,-0.13333333,0,1386.6667)"
          fill="currentColor"
          viewport={{ once: true, amount: .75 }}
          variants={fillVariant}
        initial="hidden"
        whileInView="show"
          style={{ stroke: "currentColor", strokeWidth: 18 }}
        />
      </motion.g>
    </motion.svg>
  );
}
