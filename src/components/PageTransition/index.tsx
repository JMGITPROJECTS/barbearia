import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

function PageTransition(props: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {props.children}
    </motion.div>
  );
}

export default PageTransition;