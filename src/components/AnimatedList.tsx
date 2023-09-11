import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import "./AnimatedList.css";

type ComponentType<T> = React.ComponentType<T>;

interface AnimatedListProps<T> {
  list: T[];
  component: ComponentType<{ item: T; i: number }>;
  styles?: string;
  stylesItem?: string;
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
const AnimatedList: FunctionComponent<AnimatedListProps<any>> = ({
  list,
  component: Component,
  styles,
  stylesItem,
}) => {
  return (
    <motion.ul
      className={`${styles ? styles : "list-group"}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {list.map((item, i) => (
        <motion.li
          className={`list-unstyled ${stylesItem}`}
          key={i}
          variants={listItem}
        >
          <ListItem key={i} item={item} i={i} component={Component} />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default AnimatedList;

type ListItemProps<T> = {
  item: T;
  component: ComponentType<{ item: T; i: number }>;
  i: number;
};

const ListItem = <T,>({ item, component: Component, i }: ListItemProps<T>) => {
  return <Component item={item} i={i} />;
};

interface HomeCopyProps {
  item: string[];
  i: number;
}

export const HomeCopy: FunctionComponent<HomeCopyProps> = ({ item, i }) => {
  return (
    <div className="list-group-item d-flex gap-2 align-items-center rounded-3 box-shadow-custom fw-bold my-2 p-4 text-dark">
      <p className="h1">{emojiArr[i]}</p>
      <p className="list-text">
        <strong>{item[0]} </strong>
        {item[1]}
      </p>
    </div>
  );
};
