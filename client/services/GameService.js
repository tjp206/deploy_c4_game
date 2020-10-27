const baseURL = 'http://localhost:3000/c4'

export default {
    getGame() {
        return fetch(baseURL)
        .then(res => res.json())
    },

    postGame(payload) {
        return fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
    },

    updateGame(payload, id) {
        return fetch(baseURL + id, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
    },

    deleteGame(id) {
        return fetch(baseURL + id, {
            method: 'DELETE'
        })
    }
}