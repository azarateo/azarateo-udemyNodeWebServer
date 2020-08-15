console.log('Javascript files loaded.');


const form = document.getElementById('weatherForm')
const searchBox = document.getElementById('searchBox')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const requestString = 'http://localhost:3000/weather?address=' + searchBox.value
    fetch(requestString).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log('Error:' + data.error)
            } else {
                console.log(data.location)
                console.log(data.data)
                console.log(data.address)
            }
        })
    })
})