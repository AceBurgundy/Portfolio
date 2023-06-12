import React, { useEffect, useState, useRef } from "react";
import styles from "./Code.module.css";
import worksData from "../../data/works.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const colors = [
    "#0053ff",
    "#24282c",
    "#161c21",
    "#2c2c2c",
    "#010b13",
    "#2c2c2c",
];

gsap.registerPlugin(ScrollTrigger);

const Code = () => {
    const sections = useRef([]);
    const wordsContainer = useRef(null);
    const imageRef = useRef(null);

    const [works, setWorks] = useState([]);

    useEffect(() => {
        setWorks(worksData.works);
        window.scrollTo(0, 0);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        if (works.length > 0) {
            sections.current.forEach((section) => {
                gsap.to(section.querySelectorAll(".word"), {
                    scrollTrigger: {
                        trigger: section,
                        start: "40% bottom",
                    },
                    duration: 0.9,
                    y: "0",
                    stagger: 0.05,
                });

                const handleMouseMove = (event) => {
                    const { clientX, clientY } = event;
                    gsap.to(section.querySelector("img"), {
                        x: clientX / 20,
                        y: clientY / 20,
                        ease: "power2.out",
                    });
                };

                window.addEventListener("mousemove", handleMouseMove);

                return () => {
                    window.removeEventListener("mousemove", handleMouseMove);
                };
            });
        }
    }, [works]);

    useEffect(() => {
        const handleOrientationChange = (event) => {
            const { beta, gamma } = event;

            const movementX = gamma / 30;
            const movementY = beta / 30;

            gsap.to(imageRef.current, {
                x: -movementX,
                y: -movementY,
                duration: 0.6,
                ease: "power2.out",
            });
        };

        if ("DeviceOrientationEvent" in window) {
            window.addEventListener(
                "deviceorientation",
                handleOrientationChange
            );
        }

        return () => {
            if ("DeviceOrientationEvent" in window) {
                window.removeEventListener(
                    "deviceorientation",
                    handleOrientationChange
                );
            }
        };
    }, []);

    return (
        <>
            <LoadingScreen
                text="Works"
                backgroundColor="black"
                loadingColor="white"
            />
            <div id={styles.workContainer}>
                {works.map((work, index) => (
                    <section
                        key={index}
                        ref={(element) => (sections.current[index] = element)}
                        style={{
                            backgroundColor: colors[index % colors.length],
                        }}
                        className={`page ${styles.section}`}
                    >
                        <img
                            className={styles.image}
                            src={work.image}
                            alt={work.title}
                            ref={imageRef}
                        />

                        <div
                            className={styles.titleContainer}
                            ref={wordsContainer}
                        >
                            {[...work.title].map((char, charIndex) => (
                                <p
                                    key={charIndex}
                                    className={`${styles.title} word`}
                                >
                                    {char}
                                </p>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </>
    );
};

export default Code;
