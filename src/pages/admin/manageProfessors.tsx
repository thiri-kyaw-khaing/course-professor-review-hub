import { professorQuery } from "@/api/query";
import CourseForm from "@/components/page-components/admin/CourseForm";
import CourseMangeCard from "@/components/page-components/admin/CourseMangeCard";
import ProfessorForm from "@/components/page-components/admin/ProfessorForm";
import ProfessorMangeCard from "@/components/page-components/admin/ProfessorManageCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Professor } from "@/types";
import { useProfessorsStore } from "@/store/professorStore";

export default function ManageProfessorsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    data: professorsData,
    isLoading: professorsLoading,
    isError: professorsError,
    refetch,
  } = useQuery(professorQuery);
  const [searchTerm, setSearchTerm] = useState("");
  const { professors, setProfessors } = useProfessorsStore();
  useEffect(() => {
    if (professorsData?.professors) {
      console.log("Fetched professors:", professorsData.professors);
      setProfessors(professorsData.professors);
    }
  }, [professorsData, setProfessors]);
  if (professorsLoading) {
    return <div>Loading...</div>;
  }

  if (professorsError) {
    return <div>Error loading professors.</div>;
  }

  const filteredProfessors = (professors || []).filter(
    (professor: Professor) => {
      return professor.name?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  );

  return (
    <>
      <div>
        {" "}
        <h1 className="text-3xl font-semibold mt-4">Manage Professors</h1>
        <p className="text-gray-500 mt-2">
          Add, edit, and manage professor profiles and information.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md mt-4 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses, professors, departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[#8B0000] text-white hover:bg-red-700"
              // onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Professor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Professor</DialogTitle>
              <DialogDescription>
                Create a new professor profile with contact information and
                academic details.
              </DialogDescription>
            </DialogHeader>
            {/* Course Forms */}
            <ProfessorForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <ProfessorMangeCard professors={filteredProfessors} />
    </>
  );
}
