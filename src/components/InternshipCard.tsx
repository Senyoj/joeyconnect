import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { Internship } from "@/types/internship";

interface InternshipCardProps {
  internship: Internship;
  onClick: () => void;
  index: number;
}

const categoryColors = {
  Tech: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Finance:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Design:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Marketing:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  Healthcare: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

export const InternshipCard = ({
  internship,
  onClick,
  index,
}: InternshipCardProps) => {
  const formatDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const date = new Date(deadline);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isDeadlineSoon = (deadline?: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      onClick={onClick}
      className="group cursor-pointer bg-gradient-card border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {internship.role}
          </h3>
          <p className="text-primary font-medium">{internship.company}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              categoryColors[internship.category]
            }`}
          >
            {internship.category}
          </span>
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
        {internship.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {internship.tags.slice(0, 3).map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
        {internship.tags.length > 3 && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
            +{internship.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          {internship.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{internship.location}</span>
            </div>
          )}
          {internship.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{internship.duration}</span>
            </div>
          )}
        </div>

        {internship.deadline && (
          <div
            className={`flex items-center space-x-1 ${
              isDeadlineSoon(internship.deadline)
                ? "text-destructive font-medium"
                : ""
            }`}
          >
            <Calendar className="h-3 w-3" />
            <span>Due {formatDeadline(internship.deadline)}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
