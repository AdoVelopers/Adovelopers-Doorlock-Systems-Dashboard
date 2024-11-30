import React, { useState, useEffect } from 'react';
import '../styles/Ripple.css'

const Ripple = ({ color = "#32cd32", size = "medium", text = "", textColor = "" }) => {
    const [ripples, setRipples] = useState([]);
    
    useEffect(() => {

        const timeout = setTimeout(() => {
            setRipples([]);
        }, 300);
        
        return () => clearTimeout(timeout);
    }, [ripples]);

    const handleRippleClick = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const sizeValue = size === "large" ? 100 : size === "medium" ? 50 : 30;
        const rippleSize = Math.max(width, height);

        const newRipple = {
            x: e.clientX - left - rippleSize / 2,
            y: e.clientY - top - rippleSize / 2,
            size: rippleSize,
            color: color,
        };

        setRipples([...ripples, newRipple]);
    };

    return (
        <div 
            className="ripple-container" 
            onClick={handleRippleClick} 
            style={{ position: "relative", display: "inline-block" }}
        >
            {ripples.map((ripple, index) => (
                <div
                    key={index}
                    className="ripple"
                    style={{
                        position: "absolute",
                        borderRadius: "50%",
                        width: ripple.size,
                        height: ripple.size,
                        left: ripple.x,
                        top: ripple.y,
                        backgroundColor: ripple.color,
                        animation: "ripple-animation 0.6s linear",
                    }}
                ></div>
            ))}
            {text && <span style={{ color: textColor, fontSize: "14px" }}>{text}</span>}
        </div>
    );
};

export default Ripple;
