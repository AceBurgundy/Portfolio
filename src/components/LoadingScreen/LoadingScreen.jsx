import React, { useEffect, useRef } from "react";
import styles from "./LoadingScreen.module.css";
import gsap from "gsap";

const LoadingScreen = () => {

    const surname = "Sam";
    const firstNameRefs = useRef([]);
    const loadingRef = useRef(null)
    
    useEffect(() => {

        const timeline = gsap.timeline();

        timeline

            .to(firstNameRefs.current, {
                duration: 0.8,
                delay: 1,
                y: "0",
                stagger: 0.05,
            })

            .to(
                firstNameRefs.current,
                {
                    duration: 2,
                    delay: 0.4,
                    y: "-100%",
                    stagger: -0.1,
                }
            )
            .to(
                loadingRef.current,
                {
                    duration: 1.5,
                    height: "0",
                }, "<0"
            )
    })
    return (
        <section id={styles.loading} className="page" ref={loadingRef}>
            {surname.split("").map((char, index) => (
                <p
                    key={index}
                    ref={(element) => (firstNameRefs.current[index] = element)}
                    className={styles.letter}
                >
                    {char}
                </p>
            ))}
        </section>
    );
};

export default LoadingScreen;
