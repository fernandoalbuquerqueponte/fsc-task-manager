import CheckIcon from "../assets/icons/check.svg?react"
import LoaderIcon from "../assets/icons/loader-circle.svg?react"
import DetailsIcon from "../assets/icons/details.svg?react"

const TaskItem = ({ task }) => {
  const getContainerClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5]/10 text-[#00ADB5]"
    }

    if (task.status === "in_progress") {
      return "bg-[#FFAA04]/10 text-[#FFAA04]"
    }

    if (task.status === "not_started") {
      return "bg-[#35383E]/10 text-[#35383E]"
    }
  }

  const getCheckboxClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5]"
    }
    if (task.status === "in_progress") {
      return "bg-[#FFAA04]"
    }
    if (task.status === "not_started") {
      return "bg-[#35383E]/10"
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm ${getContainerClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getCheckboxClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="text-brand-white animate-spin" />
          )}
        </label>
        {task.title}
      </div>
      <a href="#" className="transition hover:opacity-75">
        <DetailsIcon />
      </a>
    </div>
  )
}

export default TaskItem
