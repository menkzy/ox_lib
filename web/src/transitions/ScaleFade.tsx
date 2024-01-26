import { AnimatePresence, motion } from 'framer-motion';

const ScaleFade: React.FC<{ visible: boolean; children: React.ReactNode; onExitComplete?: () => void }> = ({
  visible,
  children,
  onExitComplete,
}) => {
  return (
    <>
      <AnimatePresence onExitComplete={onExitComplete}>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: [0.6, 0, 1, 1] } }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScaleFade;
