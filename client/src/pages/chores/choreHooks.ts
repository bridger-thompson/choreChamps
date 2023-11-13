import { useMutation, useQuery } from "@tanstack/react-query";
import { choreService } from "./choreService";
import { getQueryClient } from "../../services/queryClient";
import { childKeys } from "../../hooks/childHooks";

const queryClient = getQueryClient();

export const choreKeys = {
  choresForDate: (date: string, childId: number) => [
    "choresForDate",
    childId,
    date,
  ],
};

export const useGetChoresForDateQuery = (date: string, childId: number) =>
  useQuery({
    queryKey: choreKeys.choresForDate(date, childId),
    queryFn: async () => await choreService.getChoresForDate(date, childId),
  });

export const useUpdateChoreStatusMutation = (date: string, childId: number) =>
  useMutation({
    mutationFn: async ({
      childChoreId,
      status,
    }: {
      childChoreId: number;
      status: string;
    }) => {
      return await choreService.updateChoreStatus(childChoreId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: choreKeys.choresForDate(date, childId),
      });
      queryClient.invalidateQueries({
        queryKey: childKeys.pointsKey(childId),
      });
    },
  });
