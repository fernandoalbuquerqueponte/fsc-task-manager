import { Link } from "react-router-dom"
import { toast } from "sonner"

import {
  CheckIcon,
  DetailsIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons/index"
import Button from "../components/Button"
import { useDeleteTask } from "../hooks/data/use-delete-task"
const TaskItem = ({ task, handleCheckboxClick }) => {
  const { mutate: deleteTask, isPending: deleteIsLoading } = useDeleteTask(
    task.id
  )

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => toast.success("Tarefa deletada com sucesso!"),
      onError: () => toast.error("Erro ao deletar tarefa."),
    })
  }

  const getContainerClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary/10 text-brand-primary"
    }

    if (task.status === "in_progress") {
      return "bg-brand-process/10 text-brand-process"
    }

    if (task.status === "not_started") {
      return "bg-brand-dark-blue/10 text-brand-dark-blue"
    }
  }

  const getCheckboxClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary"
    }
    if (task.status === "in_progress") {
      return "bg-brand-process"
    }
    if (task.status === "not_started") {
      return "bg-brand-dark-blue/10"
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition ${getContainerClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getCheckboxClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin text-brand-dark-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <Link to={`/task/${task.id}`} className="transition hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

export default TaskItem
