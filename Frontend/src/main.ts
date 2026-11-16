import "./style.css"
import { startApp } from "./app"
import { queryAppElements } from "./ui/elements"

function main(): void {
  const elements = queryAppElements()
  startApp(elements)
}

main()
