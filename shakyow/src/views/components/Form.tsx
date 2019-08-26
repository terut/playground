import React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import './Form.css';

type Props = {
  addSutra: Function
} & RouteComponentProps;

const _form: React.FC<Props> = (props: Props) => {
  const { addSutra } = props

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("submit!!!")
    addSutra({
      url: "https://github.com/terut/duo-desktop",
      description: "good example",
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
            <input type="text" name="url" required />
          </div>
          <div className="form-textarea">
            <label htmlFor="description">Description <span className="form-note">(optional)</span></label>
            <textarea></textarea>
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