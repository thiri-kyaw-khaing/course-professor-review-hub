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

import type { Course } from "@/types";

export const courses: Course[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Programming",
    faculty: "School of Information Technology",
    credits: 3,
    description:
      "Fundamentals of programming using Python, problem-solving, and algorithms.",
    status: "active",
    rating: 4.8,
    reviews: 127,
  },
  {
    id: 2,
    code: "BUS201",
    name: "Business Management",
    faculty: "School of Management",
    credits: 3,
    description:
      "Fundamentals of business management and organizational behavior.",
    status: "active",
    rating: 4.5,
    reviews: 89,
  },
  {
    id: 3,
    code: "IT202",
    name: "Database Systems",
    faculty: "School of Information Technology",
    credits: 3,
    description:
      "Design, implementation, and management of relational databases.",
    status: "inactive",
    rating: 4.2,
    reviews: 64,
  },
  {
    id: 4,
    code: "MED301",
    name: "Human Anatomy",
    faculty: "School of Medicine",
    credits: 4,
    description: "Detailed study of the human body structure and its systems.",
    status: "active",
    rating: 4.9,
    reviews: 210,
  },
];
