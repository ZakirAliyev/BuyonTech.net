// import { motion, useAnimationControls } from "framer-motion";
// import { useEffect } from "react";
// import "./index.scss";

// export default function LoadingScreen() {
//     const center = useAnimationControls();
//     const sides = useAnimationControls();
//     const wrapper = useAnimationControls();

//     useEffect(() => {
//         const sequence = async () => {
//             // 1️⃣ Ortadakı çıxır — scale 0 → 1 və fırlanır
//             await center.start("appear");

//             // 2️⃣ Qıraqdakılar uzaqdan yaxınlaşır, opacity 0 → 1
//             await sides.start("approach");

//             // 3️⃣ Hamısı bir yerdə fırlanır (parent div dönür)
//             await wrapper.start("rotateAll");

//             // 4️⃣ Qıraqdakılar geri uzaqlaşır və itir
//             await sides.start("retreat");

//             // 5️⃣ Ortadakı əksi istiqamətdə fırlanıb scale 1 → 0 olur
//             await center.start("disappear");
//         };

//         sequence();
//     }, []);

//     // 🔹 Ortadakı simvol
//     const centerVariants = {
//         initial: { scale: 0, rotate: 0, opacity: 0 },
//         appear: {
//             scale: 1,
//             rotate: 360,
//             opacity: 1,
//             transition: { duration: 1.2, ease: "easeInOut" },
//         },
//         disappear: {
//             scale: 0,
//             rotate: -360,
//             opacity: 0,
//             transition: { duration: 1.2, ease: "easeInOut" },
//         },
//     };

//     // 🔹 Qıraqdakılar (uzaqdan yaxınlaşır, sonra uzaqlaşır)
//     const sideVariants = (x, y) => ({
//         initial: { x: x * 10, y: y * 10, opacity: 0 },
//         approach: {
//             x: 0,
//             y: 0,
//             opacity: 1,
//             transition: { duration: 1.3, ease: "easeOut" },
//         },
//         retreat: {
//             x: x * 10,
//             y: y * 10,
//             opacity: 0,
//             transition: { duration: 1.3, ease: "easeIn" },
//         },
//     });

//     // 🔹 Bütün simvolların parent rotasiyası
//     const wrapperVariants = {
//         initial: { rotate: 0 },
//         rotateAll: {
//             rotate: 720,
//             transition: { duration: 2, ease: "easeInOut" },
//         },
//     };

//     return (
//         <div className=" loading-screen">
//             <motion.div
//                 className="loadingBox"
//                 variants={wrapperVariants}
//                 initial="initial"
//                 animate={wrapper}
//             >
//                 {/* --- ORTADAKI --- */}
//                 <motion.div
//                     className="shape center"
//                     variants={centerVariants}
//                     initial="initial"
//                     animate={center}
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 201 201" fill="none">
//                         <path d="M201.123 82.6704L152.253 99.9647L201.123 127.211V201.334H138.855L139.42 194.9L107.161 160.151L73.3983 201.334H0.143677V167.821L60.3131 120.419L0.143677 81.5867V0.297607H73.7112L104.086 35.9775L119.101 0.297607H201.123V82.6704Z" fill="black" />
//                     </svg>
//                 </motion.div>

//                 {/* --- ÜST --- */}
//                 <motion.div
//                     className="shape top"
//                     variants={{
//                         initial: { x: 0, y: -120, opacity: 0 }, // başlanğıcda yuxarıda və görünməz
//                         approach: {
//                             x: 0,
//                             y: 180, // ortadakıya yaxınlaşır
//                             opacity: 1,
//                             transition: { duration: 1.3, ease: "easeOut" },
//                         },
//                         retreat: {
//                             x: 0,
//                             y: -120, // geri yuxarıya çəkilir
//                             opacity: 0,
//                             transition: { duration: 1.3, ease: "easeIn" },
//                         },
//                     }}
//                     initial="initial"
//                     animate={sides}
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="44" height="55" viewBox="0 0 44 55" fill="none">
//                         <path d="M43.8448 14.1561L33.6665 38.3345L26.8835 54.4458L13.165 38.3345L0.171265 23.0627L12.0434 6.52407L38.336 0.158936L43.8448 14.1561Z" fill="black" />
//                     </svg>
//                 </motion.div>

//                 {/* --- SOL --- */}
//                 <motion.div
//                     className="shape left"
//                     variants={{
//                         initial: { x: -120, y: 0, opacity: 0 }, // başlanğıcda yuxarıda və görünməz
//                         approach: {
//                             x: 500,
//                             y: 0, // ortadakıya yaxınlaşır
//                             opacity: 1,
//                             transition: { duration: 1.3, ease: "easeOut" },
//                         },
//                         retreat: {
//                             x: -120,
//                             y: 0, // geri yuxarıya çəkilir
//                             opacity: 0,
//                             transition: { duration: 1.3, ease: "easeIn" },
//                         },
//                     }}
//                     initial="initial"
//                     animate={sides}
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="86" height="64" viewBox="0 0 86 64" fill="none">
//                         <path d="M85.3685 25.5831L50.1794 53.3104L37.4604 63.3313L0.142532 32.368L3.53784 3.10669L45.9372 0.137817L50.1794 2.8701L85.3685 25.5831Z" fill="black" />
//                     </svg>
//                 </motion.div>

//                 {/* --- SAĞ --- */}
//                 <motion.div
//                     className="shape right"
//                     variants={{
//                         initial: { x: 120, y: 0, opacity: 0 }, // başlanğıcda yuxarıda və görünməz
//                         approach: {
//                             x: -500,
//                             y: 0, // ortadakıya yaxınlaşır
//                             opacity: 1,
//                             transition: { duration: 1.3, ease: "easeOut" },
//                         },
//                         retreat: {
//                             x: 120,
//                             y: 0, // geri yuxarıya çəkilir
//                             opacity: 0,
//                             transition: { duration: 1.3, ease: "easeIn" },
//                         },
//                     }}
//                     initial="initial"
//                     animate={sides}
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="73" height="52" viewBox="0 0 73 52" fill="none">
//                         <path d="M72.8337 31.9841L52.0575 51.0719L24.071 35.4644L0.326782 22.2304L24.071 13.8275L62.6554 0.173706L72.8337 31.9841Z" fill="black" />
//                     </svg>
//                 </motion.div>

//                 {/* --- ALT --- */}
//                 <motion.div
//                     className="shape bottom"
//                    variants={{
//                         initial: { x: 0, y: 120, opacity: 0 }, // başlanğıcda yuxarıda və görünməz
//                         approach: {
//                             x: 0,
//                             y: -180, // ortadakıya yaxınlaşır
//                             opacity: 1,
//                             transition: { duration: 1.3, ease: "easeOut" },
//                         },
//                         retreat: {
//                             x: 0,
//                             y: 120, // geri yuxarıya çəkilir
//                             opacity: 0,
//                             transition: { duration: 1.3, ease: "easeIn" },
//                         },
//                     }}
//                     initial="initial"
//                     animate={sides}
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="47" viewBox="0 0 48 47" fill="none">
//                         <path d="M47.7033 18.0185L47.5889 19.293L45.1549 46.86H16.3216L0.207214 37.9534L15.5128 19.293L31.1617 0.2052L47.7033 18.0185Z" fill="black" />
//                     </svg>
//                 </motion.div>
//             </motion.div>
//         </div >
//     );
// }


import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import "./index.scss";

export default function LoadingScreen() {
    const center = useAnimationControls();
    const sides = useAnimationControls();
    const wrapper = useAnimationControls();

    useEffect(() => {
        const sequence = async () => {
            for (let i = 0; i < 3; i++) { // 🔁 3 dəfə təkrar
                await center.start("appear");
                await sides.start("approach");
                await wrapper.start("rotateAll");
                await sides.start("retreat");
                await center.start("disappear");
            }
        };
        sequence();
    }, []);

    const centerVariants = {
        initial: { scale: 0, rotate: 0, opacity: 0 },
        appear: {
            scale: 1,
            rotate: 360,
            opacity: 1,
            transition: { duration: 1.8, ease: "easeInOut" },
        },
        disappear: {
            scale: 0,
            rotate: -360,
            opacity: 0,
            transition: { duration: 1.8, ease: "easeInOut" },
        },
    };

    const wrapperVariants = {
        initial: { rotate: 0 },
        rotateAll: {
            rotate: 360,
            transition: { duration: 2.8, ease: "easeInOut" },
        },
    };

    return (
        <div className="loading-screen">
            <motion.div
                className="loadingBox"
                variants={wrapperVariants}
                initial="initial"
                animate={wrapper}
            >
                {/* --- ORTADAKI --- */}
                <motion.div
                    className="shape center"
                    variants={centerVariants}
                    initial="initial"
                    animate={center}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 201 201" fill="none">
                        <path d="M201.123 82.6704L152.253 99.9647L201.123 127.211V201.334H138.855L139.42 194.9L107.161 160.151L73.3983 201.334H0.143677V167.821L60.3131 120.419L0.143677 81.5867V0.297607H73.7112L104.086 35.9775L119.101 0.297607H201.123V82.6704Z" fill="black" />
                    </svg>
                </motion.div>

                {/* --- ÜST --- */}
                <motion.div
                    className="shape top"
                    variants={{
                        initial: { x: -2, y: -120, opacity: 0, scale: 0.5 },
                        approach: {
                            x: -2,
                            y: 200,
                            opacity: 1,
                            transition: { duration: 1.8, ease: "easeOut" },
                        },
                        retreat: {
                            x: -2,
                            y: -120,
                            opacity: 0,
                            transition: { duration: 1.8, ease: "easeIn" },
                        },
                    }}
                    initial="initial"
                    animate={sides}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="55" viewBox="0 0 44 55" fill="none">
                        <path d="M43.8448 14.1561L33.6665 38.3345L26.8835 54.4458L13.165 38.3345L0.171265 23.0627L12.0434 6.52407L38.336 0.158936L43.8448 14.1561Z" fill="black" />
                    </svg>
                </motion.div>

                {/* --- SOL --- */}
                <motion.div
                    className="shape left"
                    variants={{
                        initial: { x: -120, y: 15, opacity: 0, scale: 0.8 },
                        approach: {
                            x: 505,
                            y: 15,
                            opacity: 1,
                            transition: { duration: 1.8, ease: "easeOut" },
                        },
                        retreat: {
                            x: -120,
                            y: 15,
                            opacity: 0,
                            transition: { duration: 1.8, ease: "easeIn" },
                        },
                    }}
                    initial="initial"
                    animate={sides}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="86" height="64" viewBox="0 0 86 64" fill="none">
                        <path d="M85.3685 25.5831L50.1794 53.3104L37.4604 63.3313L0.142532 32.368L3.53784 3.10669L45.9372 0.137817L50.1794 2.8701L85.3685 25.5831Z" fill="black" />
                    </svg>
                </motion.div>

                {/* --- SAĞ --- */}
                <motion.div
                    className="shape right"
                    variants={{
                        initial: { x: 120, y: 3, opacity: 0, scale: 0.7 },
                        approach: {
                            x: -500,
                            y: 3,
                            opacity: 1,
                            transition: { duration: 1.8, ease: "easeOut" },
                        },
                        retreat: {
                            x: 120,
                            y: 3,
                            opacity: 0,
                            transition: { duration: 1.8, ease: "easeIn" },
                        },
                    }}
                    initial="initial"
                    animate={sides}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="73" height="52" viewBox="0 0 73 52" fill="none">
                        <path d="M72.8337 31.9841L52.0575 51.0719L24.071 35.4644L0.326782 22.2304L24.071 13.8275L62.6554 0.173706L72.8337 31.9841Z" fill="black" />
                    </svg>
                </motion.div>

                {/* --- ALT --- */}
                <motion.div
                    className="shape bottom"
                    variants={{
                        initial: { x: -3, y: 120, opacity: 0, scale: 0.6 },
                        approach: {
                            x: -3,
                            y: -205,
                            opacity: 1,
                            transition: { duration: 1.8, ease: "easeOut" },
                        },
                        retreat: {
                            x: -3,
                            y: 120,
                            opacity: 0,
                            transition: { duration: 1.8, ease: "easeIn" },
                        },
                    }}
                    initial="initial"
                    animate={sides}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="47" viewBox="0 0 48 47" fill="none">
                        <path d="M47.7033 18.0185L47.5889 19.293L45.1549 46.86H16.3216L0.207214 37.9534L15.5128 19.293L31.1617 0.2052L47.7033 18.0185Z" fill="black" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
}
