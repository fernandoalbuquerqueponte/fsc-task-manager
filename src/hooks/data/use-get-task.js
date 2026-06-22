import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetTask = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const { data: task } = await axios.get(
        `http://localhost:3000/tasks/${taskId}`
      )

      return task
    },
  })
}
