import React, { useState, useEffect } from 'react'
import { RouteComponentProps, withRouter, Link, Redirect } from 'react-router-dom'
import './Form.css'

type Props = {
  isRedirect: boolean | undefined,
  addSutra: Function,
  clearContext: Function,
} & RouteComponentProps;

const _form: React.FC<Props> = (props: Props) => {
  const { isRedirect, addSutra, clearContext } = props

  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    return () => { clearContext() }
  },[clearContext])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addSutra({
      url: url,
      description:  description,
    })
  }

  return !isRedirect ?
    (<>
      <Link className="button-cancel" to="/">Back</Link>
      <div className="form">
        <h2 className="form-title">Provide good example's URL</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-text">
            <label htmlFor="url">Example URL</label>
            <input type="text" name="url" value={url} onChange={handleUrlChange} required />
          </div>
          <div className="form-textarea">
            <label htmlFor="description">Description <span className="form-note">(optional)</span></label>
            <textarea value={description} onChange={handleDescriptionChange}></textarea>
          </div>
          <div className="form-button">
            <input className="button-primary" type="submit" value="Post" />
          </div>
        </form>
      </div>
    </>) : (<Redirect to="/" />)
}

export const _Form = withRouter(_form);