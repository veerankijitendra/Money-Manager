import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const moneyDetailsList = [
  {
    id: 'BALANCE',
    url:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png ',
    title: 'Your Balance',
    backgroundColor: '#84cc16',
    balance: 0,
    alt: 'balance',
  },
  {
    id: 'INCOME',
    url:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png ',
    title: 'Your Income',
    backgroundColor: '#06b6d4',
    balance: 0,
    alt: 'income',
  },
  {
    id: 'EXPENSES',
    url:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png ',
    title: 'Your Expenses',
    backgroundColor: '#7c3aed',
    balance: 0,
    alt: 'expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionHistoryList: [],
    amount: '',
    title: '',
    transactionType: 'INCOME',
    moneyDetailsListInState: moneyDetailsList,
  }

  upDatingMoneyDetails = (amount, transactionType) => {
    console.log(amount, transactionType)

    if (transactionType === 'INCOME') {
      this.setState(previous => ({
        moneyDetailsListInState: previous.moneyDetailsListInState.map(
          eachItem => {
            if (eachItem.id === 'INCOME') {
              return {...eachItem, balance: eachItem.balance + parseInt(amount)}
            }
            if (eachItem.id === 'BALANCE') {
              return {...eachItem, balance: eachItem.balance + parseInt(amount)}
            }
            return eachItem
          },
        ),
      }))
    } else {
      this.setState(previous => ({
        moneyDetailsListInState: previous.moneyDetailsListInState.map(
          eachItem => {
            if (eachItem.id === 'EXPENSES') {
              return {...eachItem, balance: eachItem.balance + parseInt(amount)}
            }
            if (eachItem.id === 'BALANCE') {
              return {...eachItem, balance: eachItem.balance - parseInt(amount)}
            }
            return eachItem
          },
        ),
      }))
    }
  }

  upDatingMoneyDetailsWhenDeleteItem = (amount, transactionType) => {
    console.log(amount, transactionType)

    if (transactionType === 'INCOME') {
      this.setState(previous => ({
        moneyDetailsListInState: previous.moneyDetailsListInState.map(
          eachItem => {
            if (eachItem.id === 'INCOME') {
              return {...eachItem, balance: eachItem.balance - parseInt(amount)}
            }
            if (eachItem.id === 'BALANCE') {
              return {...eachItem, balance: eachItem.balance - parseInt(amount)}
            }
            return eachItem
          },
        ),
      }))
    } else {
      this.setState(previous => ({
        moneyDetailsListInState: previous.moneyDetailsListInState.map(
          eachItem => {
            if (eachItem.id === 'EXPENSES') {
              return {...eachItem, balance: eachItem.balance - parseInt(amount)}
            }
            if (eachItem.id === 'BALANCE') {
              return {...eachItem, balance: eachItem.balance + parseInt(amount)}
            }
            return eachItem
          },
        ),
      }))
    }
  }

  deleteTheTransaction = (amount, transactionType, id) => {
    console.log(amount, transactionType, id)
    this.setState(previous => ({
      transactionHistoryList: previous.transactionHistoryList.filter(
        eachItem => {
          if (eachItem.id === id) {
            return false
          }
          return true
        },
      ),
    }))
    this.upDatingMoneyDetailsWhenDeleteItem(amount, transactionType)
  }

  addMoney = async event => {
    event.preventDefault()

    const {amount, title, transactionType} = this.state
    const history = {
      id: uuidv4(),
      amount,
      title,
      transactionType,
    }
    if (amount !== '' && title !== '') {
      await this.setState(previous => ({
        transactionHistoryList: [...previous.transactionHistoryList, history],
        amount: '',
        title: '',
      }))
      this.upDatingMoneyDetails(amount, transactionType)
    } else {
      alert('Enter the amount and title')
    }
  }

  addingTitle = event => {
    this.setState({title: event.target.value})
  }

  addingAmount = event => {
    this.setState({amount: event.target.value})
  }

  isChangeInTransactionType = event => {
    this.setState({transactionType: event.target.value})
  }

  render() {
    const {
      title,
      amount,
      transactionHistoryList,
      moneyDetailsListInState,
    } = this.state

    return (
      <div className="bg-money-manager">
        <div className="heading-container">
          <h1 className="richard-heading">Hi Richard</h1>
          <p className="heading-card-description">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <ul className="money-details-list-containers">
          {moneyDetailsListInState.map(eachItem => (
            <MoneyDetails key={eachItem.id} moneyDetails={eachItem} />
          ))}
        </ul>
        <div className="form-and-history-containers">
          <form onSubmit={this.addMoney} className="add-transaction-form">
            <h1 className="heading">Add Transaction</h1>
            <div className="input-label-container">
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input-text"
                value={title}
                placeholder="TITLE"
                onChange={this.addingTitle}
              />
            </div>
            <div className="input-label-container">
              <label htmlFor="AMOUNT" className="label">
                AMOUNT
              </label>
              <input
                type="number"
                id="AMOUNT"
                className="input-text"
                value={amount}
                placeholder="AMOUNT"
                onChange={this.addingAmount}
              />
            </div>
            <div className="input-label-container">
              <label htmlFor="transaction-type" className="label">
                TYPE
              </label>
              <select
                id="transaction-type"
                onChange={this.isChangeInTransactionType}
                className="input-text"
              >
                {transactionTypeOptions.map(eachItem => (
                  <option
                    key={eachItem.optionId}
                    selected
                    value={eachItem.optionId}
                  >
                    {eachItem.displayText}
                  </option>
                ))}
              </select>
            </div>

            <button className="button" type="submit">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="heading">History</h1>
            <ul className="title-amount-type-container-list">
              <li className="title-amount-type-container">
                <p className="mh-heading mh-elements">Title</p>
                <p className="mh-heading mh-elements">Amount</p>
                <p className="mh-heading mh-elements">Type</p>
                <p className="mh-heading mh-elements">{` `}</p>
              </li>
              {transactionHistoryList.map(eachItem => (
                <TransactionItem
                  key={eachItem.key}
                  transactionDetails={eachItem}
                  deleteTheTransaction={this.deleteTheTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
