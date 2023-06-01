import {Component} from 'react'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

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

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updateTransactionList = transactionList.filter(each => id !== each.id)

    this.setState({transactionList: updateTransactionList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        expensesAmount += each.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    let expensesAmount = 0
    let balanceAmount = 0

    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      } else {
        expensesAmount += each.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, transactionList, optionId} = this.state
    const balanceAmount = this.getBalance()
    const expensesAmount = this.getExpenses()
    const incomeAmount = this.getIncome()
    return (
      <div className="bg-page">
        <div className="name-container">
          <h1 className="heading">Hi, Richard</h1>
          <p className="para">
            Welcome back to your <span className="para-span">Money Manger</span>
          </p>
        </div>

        <MoneyDetails
          balanceAmount={balanceAmount}
          expensesAmount={expensesAmount}
          incomeAmount={incomeAmount}
        />
        <div className="transaction-history-container">
          <form
            className="transaction-container"
            onSubmit={this.onAddTransaction}
          >
            <h1 className="transaction-heading">Add Transaction</h1>
            <label htmlFor="title" className="title-label">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              className="title"
              placeholder="TITLE"
              onChange={this.onChangeTitleInput}
              value={titleInput}
            />
            <label htmlFor="amount" className="title-label">
              AMOUNT
            </label>
            <input
              type="text"
              id="amount"
              className="title"
              placeholder="TYPE"
              onChange={this.onChangeAmountInput}
              value={amountInput}
            />
            <label htmlFor="select" className="title-label">
              TYPE
            </label>
            <select
              className="select"
              id="select"
              value={optionId}
              onChange={this.onChangeOptionId}
            >
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>

          <div className="history-container">
            <ul className="history-list-container">
              <li>
                <h1 className="history-heading">History</h1>
              </li>
              <li>
                <div className="list-container">
                  <p className="history-item">Title</p>
                  <p className="history-item">Amount</p>
                  <p className="history-item">Type</p>
                </div>
              </li>
              {transactionList.map(each => (
                <TransactionItem
                  ket={each.id}
                  transactionList={each}
                  deleteTransaction={this.deleteTransaction}
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
