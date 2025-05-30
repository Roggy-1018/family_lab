import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Survey, SurveyResponse, ResultComparison } from '../types';

interface SurveyState {
  surveys: Survey[];
  currentSurvey: Survey | null;
  currentPage: number;
  userResponses: SurveyResponse[];
  partnerResponses: SurveyResponse[];
  isLoading: boolean;
  results: ResultComparison[];
  answers: Record<string, number>;
  
  fetchSurveys: () => Promise<void>;
  fetchSurveyById: (id: string) => Promise<void>;
  submitResponse: (response: SurveyResponse) => Promise<void>;
  fetchResults: (surveyId: string) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setAnswer: (questionId: string, value: number) => void;
}

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set) => ({
      surveys: [],
      currentSurvey: null,
      currentPage: 1,
      userResponses: [],
      partnerResponses: [],
      isLoading: false,
      results: [],
      answers: {},
      
      setCurrentPage: (page: number) => set({ currentPage: page }),
      
      setAnswer: (questionId: string, value: number) => 
        set(state => ({
          answers: {
            ...state.answers,
            [questionId]: value
          }
        })),

      fetchSurveys: async () => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const mockSurveys: Survey[] = [
            // ... (existing mock surveys data)
          ];
          set({ surveys: mockSurveys });
        } catch (error) {
          console.error('Failed to fetch surveys:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchSurveyById: async (id: string) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const mockSurvey = (await useSurveyStore.getState().fetchSurveys(), useSurveyStore.getState().surveys.find(s => s.id === id));
          if (mockSurvey) {
            set({ currentSurvey: mockSurvey });
          }
        } catch (error) {
          console.error('Failed to fetch survey:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      submitResponse: async (response: SurveyResponse) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          set(state => ({
            userResponses: [...state.userResponses, response]
          }));
        } catch (error) {
          console.error('Failed to submit response:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchResults: async (surveyId: string) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const mockResults: ResultComparison[] = [
            // ... (existing mock results data)
          ];
          set({ results: mockResults });
        } catch (error) {
          console.error('Failed to fetch results:', error);
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'survey-storage',
      partialize: (state) => ({
        userResponses: state.userResponses,
        answers: state.answers,
        currentPage: state.currentPage
      })
    }
  )
);