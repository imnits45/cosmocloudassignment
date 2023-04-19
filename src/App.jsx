import { useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initial, reducer } from './state'

function App() {
  const [state, dispatch] = useReducer(reducer, initial)
  return (
    <Field fields={state.fields} path={[]} dispatch={dispatch} />
  )
}

export default App

const Field = ({ fields, path, dispatch }) => {
  return <div>
    {fields.map((field, key) => <FieldItem key={key} field={field} path={[...path, key]} dispatch={dispatch} />)}
  </div>
}

const FieldItem = ({ field, path, dispatch }) => {
  return <div>
    <div className="row">
      <div className='a'>
        <input type='text' value={field.name} onChange={e => {
          dispatch({
            type: "update",
            payload: {
              path,
              name: "name",
              value: e.target.value
            }
          })
        }} />
        <select
          value={field.type}
          onChange={(e) => {
            dispatch({
              type: "update",
              payload: {
                path,
                name: "type",
                value: e.target.value
              }
            })
          }}
        >
          <option value="string">String</option>
          <option value="number">number</option>
          <option value="boolean">boolean</option>
          <option value="object">object</option>
        </select>
      </div>
      <div className='actions'>
        <input type='checkbox' value={field.required} onChange={e => { // TODO
          dispatch({
            type: "update",
            payload: {
              path,
              name: "required",
              value: e.target.checked
            }
          })
        }} />
        {field.type === "object" &&
          <button onClick={() => {
            dispatch({
              type: "add",
              payload: {
                path
              }
            })
          }}>
            +
          </button>
        }
        <button onClick={() => {
          dispatch({
            type: "remove",
            payload: {
              path
            }
          })
        }}>
          -
        </button>
      </div>
    </div>
    {field.fields?.length > 0 && (
      <div className='child'>
        <Field fields={field.fields} path={path} dispatch={dispatch}></Field>
      </div>
    )}
  </div>
}