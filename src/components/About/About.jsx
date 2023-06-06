import React, { useEffect, useRef } from "react";
import styles from "./About.module.css";
import gsap from "gsap";

const About = () => {
    const mainRef = useRef(null);
    const surname = "Sabalo";
    const firstName = "Sam";

    const lastNameChars = useRef([]);
    const firstNameChars = useRef([]);

    useEffect(() => {
        const timeline = gsap.timeline();

        timeline

            .to(
                mainRef.current,
                {
                    duration: 0.5,
                    y: "0",
                },
                "<0"
            )
            .to(firstNameChars.current, {
                duration: 1,
                delay: 1.3,
                y: "0",
                stagger: 0.2,
            })

            .to(lastNameChars.current, {
                duration: 0.8,
                delay: .1,
                y: "0",
                stagger: 0.1,
            }, "<0");
    });

    return (
        <section id={styles.main} className="page" ref={mainRef}>
            <div id={styles.about_container}>
                <p className={styles.about_item}>
                    I am a freelance digital designer and web developer,
                    specializing in creating responsive full-stack web
                    applications that adapt seamlessly across devices.
                </p>
                <p className={styles.about_item}>
                    I possess expertise in crafting desktop applications that
                    offer a seamless user experience and efficient
                    functionality.
                </p>
                <p className={styles.about_item}>
                    Developing aesthetically pleasing solutions that prioritize
                    functionality and deliver a beautiful user interface.
                </p>
            </div>
            <div id={styles.nameContainer}>
                <div id={styles.firstNameContainer}>
                    {firstName.split("").map((char, index) => (
                        <p
                            className={styles.nameCharacter}
                            key={index}
                            ref={(element) =>
                                (firstNameChars.current[index] = element)
                            }
                        >
                            {char}
                        </p>
                    ))}
                </div>
                {surname.split("").map((char, index) => (
                    <p
                        className={styles.nameCharacter}
                        key={index}
                        ref={(element) =>
                            (lastNameChars.current[index] = element)
                        }
                    >
                        {char}
                    </p>
                ))}
            </div>
        </section>
    );
};

export default About;
