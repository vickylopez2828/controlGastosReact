
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useBudget } from '../hooks/useBudget'
import { Budget } from '../types'
import ErrorMessage from './ErrorMessage'
import { clearBudget } from '../services/PresupuestoService'

export default function MessageModal() {
    const {state, dispatch, fetchBudget} = useBudget()
    const [error, setError] = useState("")
    const budgetInitial: Budget = {
      id:-1,
      name:"",
      initial_budget:0,
      start_date:new Date(), 
      is_active:false,
    }
    const closeBudget =  async () => {
      try{
        await clearBudget(state.budget.id);
        fetchBudget()
        dispatch({type:'set-budget', payload:{budget:budgetInitial}})
    } catch(error){
        setError(`Hubo un error al cerrar el gasto ${error}`);
    }
    }
  return (
    <>
      

      <Transition appear show={state.modalMsg} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => dispatch({type: 'close-modal-msg'})}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <h2 className="text-2xl text-center p-10 uppercase font-bold">Quieres cerrar el presupuesto actual?</h2>
                    <div className='flex gap-10 py-5 justify-center'>
                      {error && <ErrorMessage>{error}</ErrorMessage>}
                      <button
                          type="button"
                          onClick={()=>{closeBudget()}}
                          className="bg-pink-600 hover:bg-pink-700 w-full p-2 text-white uppercase font-bold rounded-lg"
                      >
                          SI
                      </button>
                      <button
                          type="button"
                          onClick={()=>{dispatch ({type:'close-modal-msg'})}}
                          className="bg-blue-600 hover:bg-blue-700 w-full p-2 text-white uppercase font-bold rounded-lg"
                      >
                          NO
                      </button>
                    </div>
                        
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      
    </>
  )
}