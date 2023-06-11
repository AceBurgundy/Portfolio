import React, { useEffect, useRef } from "react";
import styles from "./LoadingScreen.module.css";
import gsap from "gsap";

const LoadingScreen = ({ text = "Sam", backgroundColor = "white", loadingColor = "red"}) => {
    const charRefs = useRef([]);
    const loadingRef = useRef(null);
    const backgroundRef = useRef(null);

    useEffect(() => {
        const timeline = gsap.timeline();

        timeline
            .to(loadingRef.current, {
                y: 0,
                duration: 0.7,
                height: "100dvh",
            })
            .to(
                charRefs.current,
                {
                    duration: 0.8,
                    y: "0",
                    stagger: 0.05,
                },
                "<0"
            )
            .to(charRefs.current, {
                duration: 1,
                delay: 0.4,
                y: "-100%",
                stagger: -0.1,
            })
            .to(
                backgroundRef.current,
                {
                    duration: 0.5,
                    y: "-100dvh",
                },
                "<0"
            );
    }, []);

    return (
        <>
            <section
                id={styles.background}
                className="page"
                ref={backgroundRef}
                style={{ backgroundColor: backgroundColor }}
            >
                <section id={styles.loading} className="page" ref={loadingRef} style={{ backgroundColor: loadingColor}} >
                    {text.split("").map((char, index) => (
                        <p
                            key={index}
                            ref={(element) =>
                                (charRefs.current[index] = element)
                            }
                            className={styles.letter}
                        >
                            {char}
                        </p>
                    ))}
                </section>
            </section>
        </>
    );
};

export default LoadingScreen;
