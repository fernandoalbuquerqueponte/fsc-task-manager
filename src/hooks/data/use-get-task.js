import { useQuery } from "@tanstack/react-query"

import { api } from "../../lib/axios"

export const useGetTask = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`)

      return task
    },
  })
}
