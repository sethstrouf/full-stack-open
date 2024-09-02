const Notification = ({ message, type }) => {
  const notificationStyle = type === 'success'
  ?
    {
      color: 'green',
      fontSize: 20,
      background: 'lightgrey',
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 5,
      marginBottom: 10
    }
  :
    {
      color: 'red',
      fontSize: 20,
      background: 'lightgrey',
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 5,
      marginBottom: 10
    }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification