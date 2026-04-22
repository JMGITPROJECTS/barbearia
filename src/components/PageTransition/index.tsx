import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

function PageTransition(props: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {props.children}
    </motion.div>
  );
}

export default PageTransition;