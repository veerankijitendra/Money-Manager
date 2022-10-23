import './index.css'

const MoneyDetails = props => {
  const {moneyDetails} = props
  const {title, url, alt, balance} = moneyDetails

  return (
    <li className="image-balance-container">
      <img src={url} alt={alt} className="money-details-image" />
      <div className="balance-container">
        <p className="title">{title}</p>
        <h1>{`Rs ${balance}`}</h1>
      </div>
    </li>
  )
}

MoneyDetails.defaultProps = {
  moneyDetails: {
    id: 1,
    title: 'Your Balance',
    url:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png ',
    backgroundColor: '#84cc16',
    alt: 'balance',
    balance: 40000,
  },
}

export default MoneyDetails
