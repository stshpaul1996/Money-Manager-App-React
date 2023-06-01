// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionList, deleteTransaction} = props
  const {id, title, amount, type} = transactionList

  const onDeleteItem = () => {
    deleteTransaction(id)
  }

  return (
    <li>
      <div className="list-container">
        <p className="history-item">{title}</p>
        <p className="history-item">Rs.{amount}</p>
        <p className="history-item">{type}</p>
        <button
          type="button"
          onClick={onDeleteItem}
          className="btn-delete"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
