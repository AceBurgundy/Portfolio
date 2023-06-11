import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Stagger = ({ dictionaries = [], children }) => {
    const elementRefs = useRef([]);

    useEffect(() => {
        const timeline = gsap.timeline();

        dictionaries.forEach((dictionary, index) => {
            const { childDict = {}, text = "" } = dictionary;
            const combinedDict = { ...childDict, text };

            timeline.to(elementRefs.current[index], combinedDict);
        });
    }, [dictionaries]);

    return (
        <>
            {children.split("").map((char, index) => (
                <p
                    key={index}
                    ref={(element) => (elementRefs.current[index] = element)}
                >
                    {char}
                </p>
            ))}
        </>
    );
};

export default Stagger;
