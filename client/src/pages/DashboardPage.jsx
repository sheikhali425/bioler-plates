import { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'
import Spinner from '../components/Spinner'
import { useAuth } from '../context/AuthContext'
import * as itemsApi from '../api/items'

export default function DashboardPage() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadItems = useCallback(async () => {
    setError('')
    try {
      const params = { limit: 50 }
      if (query.trim()) params.q = query.trim()
      if (filter === 'done') params.completed = 'true'
      if (filter === 'open') params.completed = 'false'

      const { data } = await itemsApi.fetchItems(params)
      setItems(data.data)
      setMeta(data.meta)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [query, filter])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(loadItems, 200)
    return () => clearTimeout(timer)
  }, [loadItems])

  const handleCreate = async (payload) => {
    const { data } = await itemsApi.createItem(payload)
    setItems((prev) => [data.data, ...prev])
    setMeta((prev) =>
      prev
        ? { ...prev, total: prev.total + 1 }
        : { total: 1, page: 1, limit: 50, pages: 1 }
    )
  }

  const handleToggle = async (item) => {
    try {
      const { data } = await itemsApi.updateItem(item.id, {
        completed: !item.completed,
      })
      setItems((prev) =>
        prev.map((row) => (row.id === data.data.id ? data.data : row))
      )
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await itemsApi.deleteItem(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
      setMeta((prev) =>
        prev ? { ...prev, total: Math.max(0, prev.total - 1) } : prev
      )
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Layout wide>
      <section className="dash-head">
        <div>
          <p className="eyebrow">Signed in</p>
          <h1>Hey, {user?.name?.split(' ')[0] || 'there'}</h1>
          <p className="lede">
            Your items are private and scoped to your account.
            {meta ? ` ${meta.total} total.` : ''}
          </p>
        </div>
      </section>

      <div className="dash-grid">
        <ItemForm onCreate={handleCreate} />

        <section className="panel">
          <div className="panel-head row">
            <div>
              <h2>Your items</h2>
              <p>Search and filter without leaving the page.</p>
            </div>
          </div>

          <div className="toolbar">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search items…"
              aria-label="Search items"
            />
            <div className="segmented" role="group" aria-label="Filter">
              {[
                ['all', 'All'],
                ['open', 'Open'],
                ['done', 'Done'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={filter === value ? 'is-active' : ''}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="alert alert-error" role="alert">
              {error}
            </p>
          )}

          {loading ? (
            <Spinner label="Loading items…" />
          ) : (
            <ItemList
              items={items}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </Layout>
  )
}
