import React, { useEffect, useState, useRef } from "react";
import styles from "./Code.module.css";
import worksData from "../../data/works.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import MouseFollower from "../../components/MouseFollower/MouseFollower"

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
    const scrollContainerRef = useRef(null);
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

    return (
        <>
            <LoadingScreen text="" backgroundColor="black" loadingColor="red" />
            <div
                id={styles.workContainer}
                className={styles.scrollContainer}
                ref={scrollContainerRef}
            >
                <MouseFollower boundTo={scrollContainerRef}/>
                {works.map((work, index) => (
                    <section
                        key={index}
                        ref={(element) => (sections.current[index] = element)}
                        style={{
                            backgroundColor: colors[index % colors.length],
                        }}
                        className={`page ${styles.section}`}
                    >
                        <a
                            href={work.url ? work.url : ""}
                            className={styles.link}
                        >
                            <img
                                className={styles.image}
                                src={work.image}
                                alt={work.title}
                                ref={imageRef}
                            />
                        </a>

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
