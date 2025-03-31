import { useQuery } from '@tanstack/react-query';
import { getScoresByContentId } from '../services/scoreService';

// Unique query key pattern for scores associated with a specific content item
const scoresByContentQueryKey = (contentId: number) => ['scores', 'byContent', contentId];

/**
 * Custom hook to fetch scores for a specific content item using React Query.
 * Handles caching, refetching, loading, and error states.
 * @param contentId The ID of the content item for which to fetch scores.
 * @param options Optional query options, e.g., { enabled: false } to disable automatic fetching.
 */
export const useScores = (contentId: number | null, options?: { enabled?: boolean }) => {
  return useQuery({
    // Query key includes the specific content ID
    queryKey: scoresByContentQueryKey(contentId!), // Use non-null assertion assuming enabled logic handles null
    // Pass the content ID to the service function
    queryFn: () => getScoresByContentId(contentId!), // Use non-null assertion here too
    // Enable the query only when contentId is a valid number and options.enabled is not false
    enabled: typeof contentId === 'number' && contentId > 0 && (options?.enabled ?? true),
    // Optional: Configure stale time, cache time, etc.
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Potential future mutations for scores could be added here if needed 