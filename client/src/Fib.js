import { useState, useEffect} from 'react'
import axios from 'axios'

const Fib = props => {
    const [seenIndexes, setSeenIndexes] = useState([])
    const [values, setValues] = useState({})
    const [index, setIndex] = useState('')

    const fetchValues = async () => {
        const values = await axios.get('/api/values/current')
        setValues(values.data)
    }

    const fetchIndexes = async () => {
        const seenIndexes = await axios.get('/api/values/all')
        setSeenIndexes(seenIndexes.data)
    }
    const renderSeenIndexes = () => {
        return seenIndexes.map(({number}) => number).join(', ')
    }
     const handleSubmit = async event => {
        event.preventDefault()
         await axios.post('/api/values', {
             index: index
         })
         setIndex('')
     }

    const renderValues = () => {
        const entries = [];

        for (let key in values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {values[key]}
                </div>
            )

        }
        return entries
    }

    useEffect(() => {
        fetchValues().then(r => {
            console.log(r)}).catch(e => {
            console.log(e)})
        fetchIndexes().then(r => {
            console.log(r)}).catch(e => {
            console.log(e)})
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input
                    value={index}
                    onChange={e => setIndex(e.target.value)}
                />
                <button>Submit</button>
            </form>
            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}
            <h3>Calculated values:</h3>
            {renderValues()}
        </div>
    )
}

export default Fib