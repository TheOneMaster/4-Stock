import { useQueries, useQuery } from "@tanstack/react-query";
import { useFetchData } from "../../fetchAPI";
import { GetPhaseGroupSetsDocument, GetPhaseGroupSetsQuery, GetPhaseGroupSetsQueryVariables, PhaseGroupDetailsDocument, PhaseGroupDetailsQuery, PhaseGroupDetailsQueryVariables } from "../../gql/gql";

export function useSets(pGroupID: string | null) {

  const { data: PhaseGroupDetails, isInitialLoading: loadingPGroupData, status: pGroupStatus } = useQuery({
    queryKey: ['pGroupInfo', pGroupID],
    queryFn: () => useFetchData<PhaseGroupDetailsQuery, PhaseGroupDetailsQueryVariables>(PhaseGroupDetailsDocument)({ pgID: pGroupID! }),
    enabled: !!pGroupID
  });

  const totalPages = PhaseGroupDetails?.phaseGroup?.sets?.pageInfo?.totalPages;
  const pageArray = Array.from(Array(totalPages), (x, i) => i + 1);

  const pGroupInfo = PhaseGroupDetails?.phaseGroup;

  const setQueries = useQueries({
    queries: pageArray.map(page => {
      return {
        queryKey: ['sets', pGroupID, page],
        queryFn: () => useFetchData<GetPhaseGroupSetsQuery, GetPhaseGroupSetsQueryVariables>(GetPhaseGroupSetsDocument)({pgID: pGroupID!, page: page}),
        enabled: !!pGroupID && !!page,
        retry: false
      }
    })
  });

  const queriesStatus = setQueries.map(query => query.status);
  const success = queriesStatus.every(query => query === "success");

  return { 
    loadingPGroupData, pGroupStatus, queriesStatus, success,  
    pGroupInfo, setPages: setQueries
  }
}
