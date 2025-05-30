import React from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  familyId?: string;
  role: 'admin' | 'user';
  profile: UserProfile;
}

export interface UserProfile {
  birthDate?: string;
  gender?: string;
  marriageDate?: string;
  occupation?: string;
  prefecture?: string;
  hasChildren: boolean;
  children?: Child[];
}

export interface Child {
  id: string;
  birthDate: string;
  gender: string;
}

export interface Prefecture {
  code: string;
  name: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  categories: SurveyCategory[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SurveyCategory {
  id: string;
  name: string;
  description: string;
  subcategories: SurveySubcategory[];
}

export interface SurveySubcategory {
  id: string;
  name: string;
  description: string;
  questions: SurveyQuestion[];
  showForChildless: boolean;
  showForParents: boolean;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'expectation' | 'reality';
  categoryId: string;
  subcategoryId: string;
  showForChildless: boolean;
  showForParents: boolean;
}

export interface SurveyResponse {
  id: string;
  userId: string;
  surveyId: string;
  answers: QuestionAnswer[];
  completedAt?: string;
  startedAt: string;
}

export interface QuestionAnswer {
  questionId: string;
  value: number;
  comment?: string;
}

export interface ResultComparison {
  categoryId: string;
  categoryName: string;
  expectationScore: number;
  realityScore: number;
  partnerExpectationScore?: number;
  partnerRealityScore?: number;
  gap: number;
  partnerGap?: number;
}

export interface SurveyRatingOption {
  value: number;
  expectationLabel: string;
  realityLabel: string;
}