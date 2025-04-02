"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoadingOverlayProps {
  loading: boolean;
  status?: "success" | "error";
  errorMessage?: string;
  onAnimationComplete?: () => void;
}

export function LoadingOverlay({
  loading,
  status,
  errorMessage = "An error occurred. Please try again.",
  onAnimationComplete,
}: LoadingOverlayProps) {
  const [show, setShow] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Control visibility based on loading prop
  useEffect(() => {
    if (loading) {
      setShow(true);
      setAnimationComplete(false);
    } else if (status) {
      // Keep showing for success/error state
      setTimeout(() => {
        setAnimationComplete(true);
        if (onAnimationComplete) onAnimationComplete();
      }, 2000); // Auto-hide after 2 seconds for success
    }
  }, [loading, status, onAnimationComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.5 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onAnimationComplete={() => {
            if (animationComplete && !loading) {
              setShow(false);
            }
          }}
        >
          <motion.div
            className="relative flex flex-col items-center justify-center p-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {loading ? (
              <LoadingAnimation />
            ) : status === "success" ? (
              <SuccessAnimation />
            ) : status === "error" ? (
              <ErrorAnimation message={errorMessage} />
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
        <motion.div
          className="h-24 w-24 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </motion.div>
      <motion.div
        className="text-lg font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Processing...
      </motion.div>
    </div>
  );
}

function SuccessAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-green-100"
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <CheckCircle
            className="relative h-24 w-24 text-green-500"
            strokeWidth={1.5}
          />
        </div>
      </motion.div>
      <motion.p
        className="text-lg font-medium text-green-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Success!
      </motion.p>
    </motion.div>
  );
}

function ErrorAnimation({ message }: { message: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-red-100"
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <XCircle
            className="relative h-24 w-24 text-red-500"
            strokeWidth={1.5}
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md"
      >
        <Alert variant="destructive" className="border-red-500">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </motion.div>
    </motion.div>
  );
}
