'use client';import {motion} from "framer-motion";
export function Reveal({children,delay=0}:{children:React.ReactNode;delay?:number}){return <motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:.7,delay}}>{children}</motion.div>}
export function Magnetic({children}:{children:React.ReactNode}){return <motion.div whileHover={{scale:1.04,y:-2}} whileTap={{scale:.98}}>{children}</motion.div>}
