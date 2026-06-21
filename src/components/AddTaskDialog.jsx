import "./AddTaskDialog.css"

import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { v4 as uuid } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  })

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    const task = {
      id: uuid(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: "not_started",
    }

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      return onSubmitError()
    }

    onSubmitSuccess(task)
    handleClose()
    reset({
      title: "",
      time: "morning",
      description: "",
    })
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="w-96 rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-dark-blue">
                Insira as informações abaixo
              </p>

              <form
                className="flex flex-col space-y-4"
                onSubmit={handleSubmit(handleSaveClick)}
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={errors?.title?.message}
                  {...register("title", {
                    required: "O título é obrigatório.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O título  não pode ser vazio."
                      }
                      return true
                    },
                  })}
                  disabled={isSubmitting}
                />

                <TimeSelect
                  errorMessage={errors?.time?.message}
                  {...register("time", {
                    required: "O horário é obrigatório.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O horário  não pode ser vazio."
                      }
                      return true
                    },
                  })}
                  disabled={isSubmitting}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descrava a tarefa"
                  errorMessage={errors?.description?.message}
                  {...register("description", {
                    required: "A descrição é obrigatória.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "A descrição não pode ser vazia."
                      }
                      return true
                    },
                  })}
                  disabled={isSubmitting}
                />

                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleClose}
                    type="button"
                    color="secondary"
                    size="large"
                    className="w-full"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    size="large"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
