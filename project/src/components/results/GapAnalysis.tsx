import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ResultComparison } from '../../types';

interface GapAnalysisProps {
  results: ResultComparison[];
}

export const GapAnalysis: React.FC<GapAnalysisProps> = ({ results }) => {
  // Sort results by gap size (descending)
  const sortedResults = [...results].sort((a, b) => b.gap - a.gap);
  
  const getGapSeverity = (gap: number) => {
    if (gap >= 2) return 'Critical';
    if (gap >= 1.5) return 'Significant';
    if (gap >= 1) return 'Moderate';
    if (gap >= 0.5) return 'Minor';
    return 'Minimal';
  };
  
  const getGapColor = (gap: number) => {
    if (gap >= 2) return 'text-red-600 bg-red-50';
    if (gap >= 1.5) return 'text-orange-600 bg-orange-50';
    if (gap >= 1) return 'text-yellow-600 bg-yellow-50';
    if (gap >= 0.5) return 'text-blue-600 bg-blue-50';
    return 'text-green-600 bg-green-50';
  };
  
  const getGapAdvice = (category: string, gap: number) => {
    if (gap < 0.5) return `Your expectations and reality in ${category} are well-aligned. Keep doing what you're doing!`;
    
    switch (category) {
      case 'Communication':
        return 'Try to have regular, dedicated time for open conversation without distractions.';
      case 'Emotional Connection':
        return 'Practice expressing your feelings more often and listen actively to your partner.';
      case 'Mutual Support':
        return 'Discuss specific ways you can support each other and be more mindful of each other\'s needs.';
      case 'Future Vision':
        return 'Set aside time to discuss your goals and dreams together, both short-term and long-term.';
      case 'Parenting Approach':
        return 'Discuss your parenting philosophies and find common ground on key issues.';
      default:
        return 'Consider having an open conversation about your expectations and current experiences.';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Areas Needing Attention</h3>
      
      {sortedResults.map((result) => (
        <Card 
          key={result.categoryId} 
          variant="outline" 
          className="overflow-hidden"
        >
          <CardHeader className="flex flex-row items-center justify-between bg-gray-50 px-6 py-4">
            <CardTitle>{result.categoryName}</CardTitle>
            <div className={`rounded-full px-3 py-1 text-sm font-medium ${getGapColor(result.gap)}`}>
              Gap: {result.gap.toFixed(1)} - {getGapSeverity(result.gap)}
            </div>
          </CardHeader>
          
          <CardContent className="px-6 py-4">
            <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Your Expectation</p>
                <p className="text-lg font-medium">{result.expectationScore.toFixed(1)}/5.0</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Your Reality</p>
                <p className="text-lg font-medium">{result.realityScore.toFixed(1)}/5.0</p>
              </div>
              {result.partnerExpectationScore !== undefined && (
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Partner's Expectation</p>
                  <p className="text-lg font-medium">{result.partnerExpectationScore.toFixed(1)}/5.0</p>
                </div>
              )}
              {result.partnerRealityScore !== undefined && (
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Partner's Reality</p>
                  <p className="text-lg font-medium">{result.partnerRealityScore.toFixed(1)}/5.0</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-medium text-blue-800">Suggestion</h4>
              <p className="text-blue-700">{getGapAdvice(result.categoryName, result.gap)}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};