import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, MapPin, Calendar, Clock } from "lucide-react";
import { Internship } from "@/types/internship";
import { useEffect } from "react";

interface PreviewModalProps {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewModal = ({
  internship,
  isOpen,
  onClose,
}: PreviewModalProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!internship) return null;

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const date = new Date(deadline);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-card border border-border rounded-2xl shadow-modal z-50 flex flex-col overflow-hidden max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-8rem)] h-min"
          >
            {/* Header - Fixed */}
            <div className="flex-shrink-0 flex items-start justify-between p-4 md:p-6 border-b border-border bg-gradient-card">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1 break-words">
                  {internship.role}
                </h2>
                <p className="text-primary font-semibold text-base md:text-lg break-words">
                  {internship.company}
                </p>
                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-3 text-xs md:text-sm text-muted-foreground">
                  {internship.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                      <span className="truncate">{internship.location}</span>
                    </div>
                  )}
                  {internship.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                      <span className="truncate">{internship.duration}</span>
                    </div>
                  )}
                  {internship.deadline && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                      <span className="truncate">
                        Due {formatDeadline(internship.deadline)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2 ml-2 md:ml-4 flex-shrink-0">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={internship.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 text-sm md:text-base"
                >
                  <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Apply Now</span>
                  <span className="sm:hidden">Apply</span>
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                >
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                </motion.button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="p-4 md:p-6">
                <div className="max-w-3xl">
                  <h3 className="text-base md:text-lg font-semibold mb-3">
                    About this role
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
                    {internship.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm md:text-md font-medium mb-3">
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {internship.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 md:px-3 py-1 bg-primary/10 text-primary text-xs md:text-sm rounded-full border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
