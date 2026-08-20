export default function ItemList({ items, onToggle, onDelete }) {
  if (!items.length) {
    return (
      <div className="empty">
        <h3>No items yet</h3>
        <p>Add your first item to see auth + CRUD working end to end.</p>
      </div>
    )
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id} className={item.completed ? 'is-done' : ''}>
          <div className="item-body">
            <strong>{item.title}</strong>
            {item.description ? <p>{item.description}</p> : null}
            <time dateTime={item.createdAt}>
              {new Date(item.createdAt).toLocaleString()}
            </time>
          </div>
          <div className="item-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onToggle(item)}
            >
              {item.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
