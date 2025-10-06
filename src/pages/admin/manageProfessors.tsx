import CourseForm from "@/components/page-components/admin/CourseForm";
import CourseMangeCard from "@/components/page-components/admin/CourseMangeCard";
import ProfessorForm from "@/components/page-components/admin/ProfessorForm";
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
import { courses } from "@/data";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

export default function ManageProfessorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
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

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#8B0000] text-white hover:bg-red-700">
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
            <ProfessorForm />
          </DialogContent>
        </Dialog>
      </div>
      <CourseMangeCard courses={courses} />
    </>
  );
}
