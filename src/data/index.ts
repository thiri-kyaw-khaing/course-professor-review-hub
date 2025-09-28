import type { Professor } from "@/types";

export const professors: Professor[] = [
  {
    id: 1,
    name: "Siriporn Thanakit",
    title: "Associate Professor",
    rating: 3.5,
    faculty: "School of Information Technology",
    office: "IT Building, Room 301",
    email: "siriporn.t@mfu.ac.th",
    phone: "+66-2-555-0101",
    specializations: ["Software Engineering", "Database Systems"],
    education: [
      "Ph.D. Computer Science - Chulalongkorn University",
      "M.Sc. Information Technology - Mae Fah Luang University",
    ],
    image: "/src/assets/profile3.jpeg",
    reviews: 34,
  },
  {
    id: 2,
    name: "Somchai Wattanakul",
    title: "Professor",
    rating: 4.5,
    faculty: "School of Management",
    office: "Business Building, Room 210",
    email: "somchai.w@mfu.ac.th",
    phone: "+66-2-555-0202",
    specializations: ["Marketing", "Business Analytics"],
    education: [
      "Ph.D. Business Administration - Thammasat University",
      "MBA - MFU",
    ],
    image: "/src/assets/profile3.jpeg",
    reviews: 28,
  },
];
