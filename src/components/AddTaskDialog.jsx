import "./AddTaskDialog.css"

import { useRef } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"

import Button from "./Button"
import Input from "./Input"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef()

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
                />
                <Input id="period" label="Horário" placeholder="Horário" />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descrava a tarefa"
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
                  <Button size="large" className="w-full">
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
