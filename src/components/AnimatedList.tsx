import { FunctionComponent } from "react";
import { motion } from "framer-motion";

interface AnimatedListProps {
  list: string[];
}
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      opacity: {
        duration: 2,
      },
    },
  },
};

const listItem = {
  hidden: { opacity: 0, scale: 0.8, y: -100 },
  show: { opacity: 1, scale: 1, y: 0 },
};

const emojiArr = ["🌎", "🌱", "📊", "⭐"];
const AnimatedList: FunctionComponent<AnimatedListProps> = ({ list }) => {
  return (
    <motion.ul
      className="list-group"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {list.map((item, i) => (
        <motion.li
          className="list-group-item d-flex gap-2 rounded-3 box-shadow-custom fw-bold my-2 p-4 text-dark"
          key={i}
          variants={listItem}
        >
          <p className="h1">{emojiArr[i]}</p>
          <p>{item}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default AnimatedList;
