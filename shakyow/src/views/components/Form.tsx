import React, { useState } from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import './Form.css';

type Props = {
  isRedirect?: boolean,
  addSutra: Function
} & RouteComponentProps;

const _form: React.FC<Props> = (props: Props) => {
  const { history, isRedirect, addSutra } = props

  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")

  if (isRedirect) {
    history.push("/")
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    addSutra({
      url: url,
      description:  description,
    })
  }

  return (
    <>
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
    </>
  )
}

export const form = withRouter(_form);