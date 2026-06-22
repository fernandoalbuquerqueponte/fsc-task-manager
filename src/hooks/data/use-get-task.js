import { useQuery } from "@tanstack/react-query"

import { taskQueryKeys } from "../../keys/querys"
import { api } from "../../lib/axios"

export const useGetTask = (taskId) => {
  return useQuery({
    queryKey: taskQueryKeys.getOne(taskId),
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`)

      return task
    },
  })
}
