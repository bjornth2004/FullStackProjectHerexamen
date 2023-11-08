import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kot meester</title>
        <meta name="description" content="Kot meester" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={styles.main}>
        <span>
          {/* <Image 
          src="/../public/images/courses.png"
          alt='Kot meester logo'
          width={50}
          height={50}
          /> */}
          <h1>Welkom bij Kot meester!</h1>
        </span>
        <div className={styles.decoration}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iste commodi nihil error dolores consequatur illo cupiditate repellat ex ducimus sed quae sit, eligendi asperiores vel perspiciatis voluptatibus quos maxime necessitatibus neque maiores aliquid? Tenetur recusandae adipisci itaque, quis doloremque exercitationem animi illo expedita, blanditiis nisi accusamus aliquam, sapiente quos. Neque, reprehenderit! Non, dolor perspiciatis dolorum totam aliquid vel soluta inventore suscipit, nostrum magnam magni adipisci placeat. Labore deserunt odio laborum quod? Non debitis ab doloribus ipsa, facere repellendus dignissimos quos id! Delectus omnis, atque quam neque error eligendi aliquam temporibus officia ab ex, consectetur dolore sint tempore ea pariatur!
          </p>
        </div>
      </main>
      
    </>
  )
}

export default Home;
