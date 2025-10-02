import MyReviewCourse from "@/components/page-components/MyReviewCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { reviews } from "@/data";

export default function MyReviewsPage() {
  return (
    <>
      <div>
        <h1 className="text-3xl space-y-4 mt-4">My Reviews</h1>
        <p className="text-gray-600 mt-2">
          Manage and edit your course and professor reviews. Help other students
          make informed decisions.
        </p>
        <Tabs defaultValue="all" className="w-full mt-6">
          <TabsList className="bg-gray-100 p-1 rounded-full w-full flex">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:text-black flex-1 rounded-full"
            >
              All Reviews (5)
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-white data-[state=active]:text-black flex-1 rounded-full"
            >
              Courses (3)
            </TabsTrigger>
            <TabsTrigger
              value="professors"
              className="data-[state=active]:bg-white data-[state=active]:text-black flex-1 rounded-full"
            >
              Professors (2)
            </TabsTrigger>
          </TabsList>

          {/* Content below (optional) */}
          <TabsContent value="all">
            {" "}
            <MyReviewCourse reviews={reviews} />
          </TabsContent>
          <TabsContent value="courses"></TabsContent>
          <TabsContent value="professors">
            Professors reviews content here...
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
