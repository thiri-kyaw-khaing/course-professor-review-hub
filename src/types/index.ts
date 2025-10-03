export interface NavItem {
  title: string;
  href?: string;
  description?: string;
}

export type MainNavItem = NavItem;

export type Professor = {
  id: number;
  name: string;
  title: string; // e.g., "Associate Professor"
  averageRating?: number; // e.g., 4.8
  faculty: string; // e.g., "School of Information Technology"
  office: string; // e.g., "IT Building, Room 301"
  email: string;
  phone: string;
  specializations: string[]; // ["Software Engineering", "Database Systems"]
  education: string[]; // ["Ph.D. Computer Science - Chulalongkorn University", "M.Sc. Information Technology - MFU"]
  image?: string;
  totalReviews: number;
  reviews?: { id: number; comment: string; rating: number }[];
  imageUrl?: string;
};

export type Course = {
  id: number;
  code: string;
  name: string;
  faculty: string;
  credits: number;
  description: string;
  status?: "active" | "inactive";
  averageRating?: number;
  totalReviews: number;
  reviews?: { id: number; comment: string; rating: number }[];
  title?: string;
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  courseId: number | null;
  professorId: number | null;
  authorId: number;
  updatedAt: string;
  course: MyCourse | null;
  professor: MyProfessor | null;
};

export type MyCourse = {
  id: number;
  title: string;
  code: string;
  faculty: string;
  totalReviews: number;
};

export type MyProfessor = {
  id: number;
  name: string;
  faculty: string;
  totalReviews: number;
};

export type UserInfo = {
  id: number;
  name: string; // "Anonymous Student 12"
  faculty: string; // "School of ADT"
  academicYear: number; // 2566
  avatarUrl?: string; // optional, for profile image
};
