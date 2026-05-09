import type { JSX } from "react";

export interface Technician {
  userId: string;
  fullname: string; // لاحظ أنها مكتوبة في الـ Response بـ n واحدة fullname وليس fullName
  bio: string;
  serviceCategory: string;
  experienceYears: number;
  state: string; // اتغيرت من isActive إلى state ونوعها string (مثلاً "Active")
  availabilityStatus: boolean;
  profileImageURL: string;
  ratingAvg: number;
  completedJobs: number;
  createdAt: string;
  inspectedPrice: number; // ضفنا دي كمان لأنها موجودة في الـ Response الجديد
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  color: string;
  iconBg: string;
}

export interface TechnicianDetails {
  fullName: string;
  phoneNumber: string;
  profileImageURL: string;
  serviceCategory: string;
  experienceYears: number;
  city: string;
  government: string;
  faceImageUrl: string;
  backImageUrl: string;
  uploadedAt: string;
}

export interface Order {
  id: number;
  serviceName: string;
  finalPrice: number;
  state: string;
  createdAt: string;
  nameCli: string | null;
  nameTec: string | null;
}

export interface Customer {
  userId: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  government: string;
  profileImageURL: string;
  isActive: boolean;
  numberOfOrder: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  state: string; // أو Date إذا كنت ستقوم بتحويلها
}

export interface OrderDetails {
  id: number;
  serviceName: string;
  scheduledDate: string;
  scheduledTime: string;
  workImage: string | null;
  inspectedPrice: number;
  afterPrice: number;
  finalPrice: number;
  placeDetails: string;
  problemDetails: string;
  nameClient: string;
  phoneClient: string | null;
  imageCliURL: string;
  nameTec: string | null;
  ratingAvg: number;
  imageTecUrl: string | null;
  state: string;
}

export interface Review {
  id: number;
  client: string;
  worker: string;
  job: string;
  rating: number;
  comment: string;
  reasons: string[];
  date: string;
  initial: string;
}

export interface Complaint {
  id: number;
  orderId: number;
  title: string;
  userName: string;
  userRole: string;
  status: string;
  createdAt: string;
  response: string | null;
  userId: string;
}

export interface OrderResponse {
  createdAt: string; // أو Date إذا كنت بتعمل لها parse لاحقاً
  id: number;
  orderId: number;
  response: string | null; // لأنه حالياً null ومستقبلاً قد يحتوي على نص
  status: "Submitted" | "Pending" | "Completed" | string; // حددت الحالة وممكن تزيد عليها
  title: string;
  userId: string;
  userName: string;
  userRole: "Client" | "Technician" | "Admin" | string; // الـ Role بناءً على البيانات
}