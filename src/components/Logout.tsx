
const Logout = () => {
    const token = localStorage.removeItem('token')
    console.log('Token: ' + token)
    return <>  </>
}

export default Logout
