import type { JSX } from "react";

export interface Technician {
  userId: string;
  fullname: string;
  bio: string;
  serviceCategory: string;
  experienceYears: number;
  isActive: boolean;
  availabilityStatus: boolean;
  profileImageURL: string;
  ratingAvg: number;
  completedJobs: number;
  createdAt: string;
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
  createdAt: string; // أو Date إذا كنت ستقوم بتحويلها
}
