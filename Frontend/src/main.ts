import "./style.css"
import { API_URL } from "./config"

const counterOutputElement = document.querySelector<HTMLInputElement>(
  "#counter-section__output"
)
const counterIncrementButtonElement = document.querySelector<HTMLInputElement>(
  "#counter-section__increment-button"
)
const counterResetButtonElement = document.querySelector<HTMLInputElement>(
  "#counter-section__reset-button"
)

function main() {
  if (counterIncrementButtonElement) {
    counterIncrementButtonElement.addEventListener("click", async () => {
      const response = await fetch(`${API_URL}/api/counter/increment`, {
        method: "POST"
      })

      const counter = await response.json()
      if (counterOutputElement) {
        counterOutputElement.value = counter.toString()
      }
    })
  }

  if (counterResetButtonElement) {
    counterResetButtonElement.addEventListener("click", async () => {
      const response = await fetch(`${API_URL}/api/counter/reset`, {
        method: "POST"
      })

      const counter = await response.json()
      if (counterOutputElement) {
        counterOutputElement.value = counter.toString()
      }
    })
  }
}

main()
