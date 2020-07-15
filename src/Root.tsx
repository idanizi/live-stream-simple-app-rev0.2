import React, { useEffect, useState } from 'react'


const REACT_APP_GIPHY_API_KEY="hBVO7d2gvoriQK1BOJQ11sVOdzW0FMbl"
const url = `https://api.giphy.com/v1/gifs/random?api_key=${REACT_APP_GIPHY_API_KEY}`;

const increment = 36

function parseData({ data, meta }) {
    const src = data?.images?.downsized_large?.url ?? '';
    console.log('[parseImageFromData]', src)
    return src;
}

export default function Root() {

    const text = "Welcome To React - Developing Application From Scratch!"
    const [imageSource, setImageSource] = useState('')
    const [degrees, setDegrees] = useState(0)

    const handleClick = () => {
        setDegrees((degrees + increment) % 360)
    }

    useEffect(() => {
        (async () => {
            try {
                console.log('fetching data from url', url)
                const response = await fetch(url)

                if (response.ok) {
                    console.log('parsing data...')
                    const newImageSource = parseData(await response.json())
                    setImageSource(newImageSource)
                } else {
                    console.log('response not ok', response)
                }

            } catch (error) {
                console.error('useEffect', error)
            }
        })()
    }, [])

    return (
        <main>
            <header>
                <h1>
                    {text}
                </h1>
            </header>
            <section>
                <article style={{transform: `rotate(${degrees}deg)`, cursor: 'pointer'}} onClick={handleClick}>
                    <img src={imageSource} style={{ width: '100%', height: 'auto' }} />
                </article>
            </section>
        </main>
    )
}
