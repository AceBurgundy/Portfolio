import React, { useEffect, useRef } from "react";
import styles from "./Index.module.css";
import gsap from "gsap";

const Index = () => {
    const surname = "Sabalo";
    const charRefs = useRef([]);
    const message = "Full stack software developer from the Philippines";
    const messageRefs = useRef([]);

    useEffect(() => {
        const chars = charRefs.current;
        const timeline = gsap.timeline();

        timeline

            .to(chars, {
                duration: 1,
                delay: 0.5,
                y: "0",
                stagger: 0.05,
            })

            .to(chars, {
                duration: 1,
                delay: 0.2,
                y: "-200%",
                stagger: -0.05,
            })

            .to(
                mainRef.current,
                {
                    y: "-100%",
                    duration: 1,
                    ease: "power2.out",
                },
                "<0.5"
            );

        const messageChars = messageRefs.current;
        timeline

        .to(messageChars, {
            duration: 1,
            y: "0",
            stagger: 0.05,
        }, "<0")
        
    }, []);

    const loadingRef = useRef(null);
    const mainRef = useRef(null);

    return (
        <>
            <section id={styles.loading} className="page" ref={loadingRef}>
                {surname.split("").map((char, index) => (
                    <p
                        id={styles.surname}
                        key={index}
                        ref={(element) => (charRefs.current[index] = element)}
                        className={styles.letter}
                    >
                        {char}
                    </p>
                ))}
            </section>
            <section id={styles.main} className="page" ref={mainRef}>
                <div id={styles.messageContainer}>
                    {message.split(" ").map((char, index) => (
                        <p
                            id={styles.main_message}
                            key={index}
                            ref={(element) =>
                                (messageRefs.current[index] = element)
                            }
                        >
                            {char}
                        </p>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Index;
