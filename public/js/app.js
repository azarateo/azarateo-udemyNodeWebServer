const form = document.getElementById('weatherForm')
const searchBox = document.getElementById('searchBox')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

form.addEventListener('submit', (e) => {
   
    e.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('/weather?address=' + searchBox.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location + ":" 
                message2.textContent = data.data
            }
        })
    })
})