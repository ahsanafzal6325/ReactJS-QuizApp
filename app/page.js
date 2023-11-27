import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
          <div className='container'>
            <h1>Quiz App</h1>
            <Link href='/quiz'>
                <buton>Start Quizz</buton>
            </Link>
          </div>
    </main>
  )
}
