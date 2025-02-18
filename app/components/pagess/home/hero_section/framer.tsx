import {motion} from "framer-motion";

export const Framer = () => {
    return (<div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#613cc1] rounded-full"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                }}
                animate={{
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1]
                }}
                transition={{
                    duration: Math.random() * 5 + 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        ))}

        <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-[1px] bg-gradient-to-r from-[#613cc1] to-transparent"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 20 + 10}%`,
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        background: [
                            'linear-gradient(90deg, #613cc1 0%, transparent 100%)',
                            'linear-gradient(90deg, transparent 0%, #613cc1 50%, transparent 100%)',
                            'linear-gradient(90deg, transparent 0%, #613cc1 100%)'
                        ]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    </div>);
}
