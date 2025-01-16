
import { motion } from "framer-motion";


const AuroraBackgroundDemo = () => {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className=" flex flex-col gap-4 items-center justify-center px-4 h-[80vh] "
    >
       <div className="absolute top-10 left-10 md:top-[10vh] md:left-16 transform -rotate-6 opacity-90 z-0 ">
        {/* <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/23c8ca56299053.59a8587611b02.jpg" // Replace with your image URL
          alt="Stylish Note Background"
          className="w-[300px] md:w-[300px] rounded-lg shadow-lg"
        /> */}
      </div>
      <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
      Discover Stunning Visuals Every Day
      </div>
      <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4">
      Upload, showcase, and inspire creativity.
      </div>
      <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
        Get Started
      </button>
    </motion.div>
  )
}

export default AuroraBackgroundDemo
