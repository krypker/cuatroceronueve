import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MintGallery from "./components/MintGallery";

function App() {
  return (
    <div className='bg-white h-screen container mx-auto'>
      <main>
        <Header />
        <Hero
          header='409 AMIGOS'
          message={
            <React.Fragment>
              <p className='mb-4'>
                AMIGOS are 409 friends, artists and enthusiasts who love IDM,
                glitch, experimental techno, noise and the like. Some of them
                may like 409 music and everyone is taking part in his music
                quest.
              </p>
              <p className='mb-4'>
                This is a private slow mint. The allow list will be updated from
                time to time and people in the list will be able to mint one
                AMIGO of their choice...
              </p>
              <p className='mb-5'>
                You can have more info and apply for an AMIGO &nbsp;
                <a
                  className='text-pink-600 cursor-pointer font-bold'
                  rel='noreferrer'
                  href='https://409.gitbook.io/409-amigos/'
                  target='_blank'
                >
                  here.
                </a>
              </p>
            </React.Fragment>
          }
        />
        <MintGallery />
      </main>
    </div>
  );
}

export default App;
