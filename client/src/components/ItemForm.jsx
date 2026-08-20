import { useState } from 'react'

export default function ItemForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title.trim()) return

    setSaving(true)
    setError('')
    try {
      await onCreate({ title: title.trim(), description: description.trim() })
      setTitle('')
      setDescription('')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <div className="panel-head">
        <h2>New item</h2>
        <p>Create a private note tied to your account.</p>
      </div>

      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ship the landing page"
          maxLength={120}
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details"
          rows={3}
          maxLength={500}
        />
      </label>

      {error && (
        <p className="alert alert-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={saving}>
        {saving ? 'Saving…' : 'Add item'}
      </button>
    </form>
  )
}
