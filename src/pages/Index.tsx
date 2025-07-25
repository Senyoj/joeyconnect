import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InternshipCard } from "@/components/InternshipCard";
import { PreviewModal } from "@/components/PreviewModal";
import { internships } from "@/data/internships";
import { Internship } from "@/types/internship";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedInternship, setSelectedInternship] =
    useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      const matchesSearch =
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        internship.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || internship.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleCardClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInternship(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div>
        <img src="/topnavimg.png" alt="nav iamge" />
      </div>

      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Joey's Intership{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect internship that matches your skills and career
            goals. From tech giants to innovative startups, your future starts
            here.
          </p>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            Showing {filteredInternships.length} of {internships.length}{" "}
            opportunities
            {searchTerm && (
              <span>
                {" "}
                for "
                <span className="font-medium text-foreground">
                  {searchTerm}
                </span>
                "
              </span>
            )}
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in{" "}
                <span className="font-medium text-foreground">
                  {selectedCategory}
                </span>
              </span>
            )}
          </p>
        </motion.div>

        {/* Grid */}
        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship, index) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                onClick={() => handleCardClick(internship)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              No internships found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more
              opportunities.
            </p>
          </motion.div>
        )}
      </main>

      {/* Modal */}
      <PreviewModal
        internship={selectedInternship}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />

      <img src="/footerimg.png" alt="" />
    </div>
  );
};

export default Index;
