import type { Professor, User } from "@/types";

export const professors: Professor[] = [
  {
    id: 1,
    name: "Siriporn Thanakit",
    title: "Associate Professor",
    averageRating: 3.5,
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
    totalReviews: 34,
    imageUrl: "/src/assets/profile3.jpeg",
    reviews: [
      {
        id: 1,
        comment:
          "Very knowledgeable and approachable. Always open to questions.",
        rating: 5,
      },
      {
        id: 2,
        comment: "Explains concepts clearly but sometimes goes too fast.",
        rating: 4,
      },
      {
        id: 3,
        comment: "Hard to understand during lectures, but notes were helpful.",
        rating: 3,
      },
      {
        id: 4,
        comment:
          "Strict grading but fair. You’ll learn a lot if you pay attention.",
        rating: 4,
      },
      {
        id: 5,
        comment:
          "Sometimes unorganized, but very passionate about the subject.",
        rating: 3,
      },
    ],
  },
  {
    id: 2,
    name: "Somchai Wattanakul",
    title: "Professor",
    averageRating: 4.5,
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
    totalReviews: 28,
    imageUrl: "/src/assets/profile3.jpeg",
    reviews: [
      {
        id: 1,
        comment:
          "Very knowledgeable and approachable. Always open to questions.",
        rating: 5,
      },
      {
        id: 2,
        comment: "Explains concepts clearly but sometimes goes too fast.",
        rating: 4,
      },
      {
        id: 3,
        comment: "Hard to understand during lectures, but notes were helpful.",
        rating: 3,
      },
      {
        id: 4,
        comment:
          "Strict grading but fair. You’ll learn a lot if you pay attention.",
        rating: 4,
      },
      {
        id: 5,
        comment:
          "Sometimes unorganized, but very passionate about the subject.",
        rating: 3,
      },
    ],
  },
  {
    id: 3,
    name: "Somchai Wattanakul",
    title: "Professor",
    averageRating: 4.5,
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
    totalReviews: 28,
    imageUrl: "/src/assets/profile3.jpeg",
    reviews: [
      {
        id: 1,
        comment:
          "Very knowledgeable and approachable. Always open to questions.",
        rating: 5,
      },
      {
        id: 2,
        comment: "Explains concepts clearly but sometimes goes too fast.",
        rating: 4,
      },
      {
        id: 3,
        comment: "Hard to understand during lectures, but notes were helpful.",
        rating: 3,
      },
      {
        id: 4,
        comment:
          "Strict grading but fair. You’ll learn a lot if you pay attention.",
        rating: 4,
      },
      {
        id: 5,
        comment:
          "Sometimes unorganized, but very passionate about the subject.",
        rating: 3,
      },
    ],
  },
  {
    id: 4,
    name: "Somchai Wattanakul",
    title: "Professor",
    averageRating: 4.5,
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
    totalReviews: 28,
    imageUrl: "/src/assets/profile3.jpeg",
    reviews: [
      {
        id: 1,
        comment:
          "Very knowledgeable and approachable. Always open to questions.",
        rating: 5,
      },
      {
        id: 2,
        comment: "Explains concepts clearly but sometimes goes too fast.",
        rating: 4,
      },
      {
        id: 3,
        comment: "Hard to understand during lectures, but notes were helpful.",
        rating: 3,
      },
      {
        id: 4,
        comment:
          "Strict grading but fair. You’ll learn a lot if you pay attention.",
        rating: 4,
      },
      {
        id: 5,
        comment:
          "Sometimes unorganized, but very passionate about the subject.",
        rating: 3,
      },
    ],
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
    averageRating: 4.8,
    totalReviews: 127,
    reviews: [
      {
        id: 1,
        comment:
          "Great introduction to coding! The professor explained concepts very clearly.",
        rating: 5,
      },
      {
        id: 2,
        comment:
          "Good course, but assignments were a bit too challenging for beginners.",
        rating: 4,
      },
      {
        id: 3,
        comment:
          "I wish there were more practical projects, but overall very useful.",
        rating: 3,
      },
    ],
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
    averageRating: 4.5,
    totalReviews: 89,
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
    averageRating: 4.2,
    totalReviews: 64,
    reviews: [
      {
        id: 1,
        comment:
          "Great introduction to coding! The professor explained concepts very clearly.",
        rating: 5,
      },
      {
        id: 2,
        comment:
          "Good course, but assignments were a bit too challenging for beginners.",
        rating: 4,
      },
      {
        id: 3,
        comment:
          "I wish there were more practical projects, but overall very useful.",
        rating: 3,
      },
    ],
  },
  {
    id: 4,
    code: "MED301",
    name: "Human Anatomy",
    faculty: "School of Medicine",
    credits: 4,
    description: "Detailed study of the human body structure and its systems.",
    status: "active",
    averageRating: 4.9,
    totalReviews: 210,
    reviews: [
      {
        id: 1,
        comment:
          "Great introduction to coding! The professor explained concepts very clearly.",
        rating: 5,
      },
      {
        id: 2,
        comment:
          "Good course, but assignments were a bit too challenging for beginners.",
        rating: 4,
      },
      {
        id: 3,
        comment:
          "I wish there were more practical projects, but overall very useful.",
        rating: 3,
      },
    ],
  },
];
import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    comment: "Prof.Som Prasara explained complex topics very clearly.",
    courseId: null,
    professorId: 1,
    authorId: 1,
    updatedAt: "October 2, 2025",
    course: null,
    professor: {
      id: 1,
      name: "Dr.Som Prasara",
      faculty: "School_of_Computer_Science",
      totalReviews: 12,
    },
  },
  {
    id: 2,
    rating: 4,
    comment: "Well-structured course with a lot of practical examples.",
    courseId: 1,
    professorId: null,
    authorId: 1,
    updatedAt: "October 1, 2025",
    course: {
      id: 1,
      title: "Data Structures",
      code: "CSC202",
      faculty: "School_of_Computer_Science",
      totalReviews: 8,
    },
    professor: null,
  },
  {
    id: 3,
    rating: 3,
    comment: "Professor needs to improve class engagement.",
    courseId: null,
    professorId: 2,
    authorId: 2,
    updatedAt: "September 28, 2025",
    course: null,
    professor: {
      id: 2,
      name: "Dr.Watcharawan Jareon",
      faculty: "School_of_Data_Analytics",
      totalReviews: 6,
    },
  },
  {
    id: 4,
    rating: 5,
    comment: "Learned a lot about real-world applications of machine learning.",
    courseId: 2,
    professorId: null,
    authorId: 2,
    updatedAt: "September 27, 2025",
    course: {
      id: 2,
      title: "Machine Learning Basics",
      code: "ML101",
      faculty: "School_of_Data_Analytics",
      totalReviews: 9,
    },
    professor: null,
  },
  {
    id: 5,
    rating: 4,
    comment: "Prof.Som Prasara is very inspiring and supportive.",
    courseId: null,
    professorId: 3,
    authorId: 3,
    updatedAt: "September 24, 2025",
    course: null,
    professor: {
      id: 3,
      name: "Dr.Som Prasara",
      faculty: "School_of_IT",
      totalReviews: 7,
    },
  },
  {
    id: 6,
    rating: 4,
    comment: "Great content but the pace was a bit fast.",
    courseId: 3,
    professorId: null,
    authorId: 3,
    updatedAt: "September 22, 2025",
    course: {
      id: 3,
      title: "Frontend Web Development",
      code: "WEB301",
      faculty: "School_of_IT",
      totalReviews: 10,
    },
    professor: null,
  },
];

export const currentUser: UserInfo = {
  id: 12,
  name: "Anonymous Student 12",
  faculty: "School of ADT",
  academicYear: 2566,
  avatarUrl: "/avatars/student12.png", // optional
};
