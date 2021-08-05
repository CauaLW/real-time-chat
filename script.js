const socket = io()

        const messages = document.querySelector('.chat-window')
        const form = document.querySelector('.chat-form')
        const input = document.querySelector('.chat-input')
        const nickForm = document.querySelector('.nick-form')
        const nickname = document.querySelector('.nickname')

        nickForm.addEventListener('submit', event => {
            event.preventDefault()
            nickname.disabled = true
        })

        input.addEventListener('focus', () => {
            if(nickname.value) {
                socket.emit('user typing', nickname.value)
            }
        })

        form.addEventListener('submit', event => {
            event.preventDefault()

            if(input.value && nickname.value) {
                socket.emit('chat message', { msg: input.value, nickname:  nickname.value })
                input.value = ''
            }
        })

        socket.on('chat message', (data) => {
            const item = document.createElement('p')
            item.innerHTML = `${data.nickname}: ${data.msg}`

            messages.appendChild(item)

            const chatHeight = messages.scrollHeight
            messages.scroll(0, chatHeight)
        })

        socket.on('user typing', nickname => {
            const item = document.createElement('p')
            item.innerHTML = `${nickname} está digitando`

            messages.appendChild(item)

            window.setTimeout(() => {
                item.parentNode.removeChild(item)
            }, 1000)
        })

        socket.on('user connected', () => {
            const item = document.createElement('p')
            item.innerHTML = 'Um usuário conectou'

            messages.appendChild(item)
        })

        socket.on('user disconnected', () => {
            const item = document.createElement('p')
            item.innerHTML = 'Um usuário desconectou'
        
            messages.appendChild(item)
        })