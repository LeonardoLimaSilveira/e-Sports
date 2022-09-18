import React from 'react'
import axios from 'axios'
import './styles/main.css'
import logoImg from './assets/nlw-logo.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import CreateAdModal from './components/CreateAdModal'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}
// teste
function App() {
  const [games, setGames] = React.useState<Game[]>([])

  React.useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        esta aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(({ title, bannerUrl, _count, id }) => {
          return (
            <GameBanner
              key={id}
              title={title}
              bannerUrl={bannerUrl}
              adsCount={_count.ads}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
