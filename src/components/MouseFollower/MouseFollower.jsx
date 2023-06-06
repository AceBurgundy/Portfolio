import React, { useEffect, useRef } from "react";
import styles from "./MouseFollower.module.css";
import { gsap } from "gsap";

const MouseFollower = ({ boundTo = window }) => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const inValid = ["DIV", "SECTION"];

        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

        let mouseX;
        let mouseY;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const isCursorInsideBound = boundTo.current.contains(e.target);

            let height =
                isCursorInsideBound && !inValid.includes(e.target.tagName)
                    ? e.target.getBoundingClientRect().height + "px"
                    : "20px";

            gsap.to(cursorRef.current, {
                duration: 0.5,
                height,
                width: height,
                x: mouseX,
                y: mouseY,
                autoAlpha: isCursorInsideBound ? 1 : 0,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [boundTo]);

    return <div id={styles.follower} ref={cursorRef} />;
};

export default MouseFollower;
