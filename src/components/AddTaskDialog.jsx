import "./AddTaskDialog.css"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 as uuid } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("morning")
  const [description, setDescription] = useState("")
  const nodeRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle("")
      setTime("")
      setDescription("")
    }
  }, [isOpen])

  const handleSaveClick = () => {
    handleSubmit({
      id: uuid(),
      title,
      time,
      description,
      status: "not_started",
    })
    handleClose()
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
            className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="w-84 rounded-xl bg-white p-5 text-center shadow">
              {/* dialog */}
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mt-1 mb-4 text-sm text-[#9A9C9F]">
                Insira as informações abaixo
              </p>

              <div className="flex flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TimeSelect
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descrava a tarefa"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleClose}
                    variant="secondary"
                    size="large"
                    className="w-full"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSaveClick}
                    size="large"
                    className="w-full"
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
