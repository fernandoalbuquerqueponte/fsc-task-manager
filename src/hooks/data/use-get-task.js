import { useQuery } from "@tanstack/react-query"

export const useGetTask = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })

      const task = await response.json()

      return task
    },
  })
}
