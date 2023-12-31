import { useEffect, useState, require } from 'react'
import './App.css'
import './index.css'

function App() {
  const [pizzaToppings, setPizzaToppings] = useState([])
  let oneToppingArray = []
  let top20ToppingNames = []

  useEffect(() => {
    toppings()
    setTimeout(() => {
      document.querySelector('.individual-topping')?.classList.add('most-popular-combo')
    }, 1000)
  }, [])

  const toppings = async () => {
    const response = await fetch('../Pizza-exercise/orders.json')
    setPizzaToppings(await response.json())
  }

  for (let i = 0; i < pizzaToppings.length; i++) {
    oneToppingArray.push(pizzaToppings[i].toppings.sort((a, b) => a.localeCompare(b)))
  }

  //top 20 combinations that are ordered the most, more than one ingredient
  const top20Combinations = oneToppingArray.reduce((acc, curr) => {
    if (curr.length > 1) {
      acc[curr] = (acc[curr] || 0) + 1
    }
    return acc
  }, {})
  let sortedTop20Combinations = Object.entries(top20Combinations).sort((a, b) => b[1] - a[1])


  sortedTop20Combinations.slice(0,20).forEach((item) => {
    //Capitalize the first letter of each word
    top20ToppingNames.push(item[0].concat().replace(/\s*,\s*/g, ", ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))))
  })

  return (
    <div className="main-content-container">
    <div className="project-header">
      <h1>🍕Most Loved Pizza Topping Combos🍕</h1>
      <span style={{fontSize:"0.75rem", paddingTop: "1%"}}>Data Provided by <a href="https://olo.com">Olo</a></span>
    </div>
      <div className="toppings-container">
        <div className="topping">
          <div className="topping-title"><h2>Combinations</h2></div>
          <div className="individual-topping-names">
          {
            top20ToppingNames.map((topping, index) => {
              return (
                <>
                  <div key={index} className="individual-topping">{index+1}. {topping}</div>
                </>
              )
            })
          }
          </div>
        </div>

        <div className="topping">
          <div className="count-title"><h2>Ordered</h2></div>
          <div className="individual-topping-numbers">
            {
              sortedTop20Combinations.slice(0,20).map((item, index) => {
                return (
                  <>
                    <div key={index} className="individual-topping-count">{item[1]}</div>
                  </>
                )
              })
            }
          </div>  
        </div>
      </div>
    </div>
  )
}

export default App