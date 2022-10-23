import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTheTransaction} = props
  const {title, amount, transactionType, id} = transactionDetails

  const deleteTheItem = () => {
    deleteTheTransaction(amount, transactionType, id)
  }
  return (
    <li className="title-amount-type-container bt-none">
      <p className="mh-elements">{`${title}`}</p>
      <p className="mh-elements">{amount}</p>
      <p className="mh-elements">{`${transactionType}`}</p>
      <span className="mh-elements">
        <button type="button" className="delete-button" onClick={deleteTheItem}>
          <img
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            className="image"
          />
        </button>
      </span>
    </li>
  )
}

TransactionItem.defaultProps = {
  transactionDetails: {
    title: 'Salary',
    amount: '100',
    transactionType: 'Income',
  },
}

export default TransactionItem
