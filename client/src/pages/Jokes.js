import React, {useEffect, useState} from 'react';
import './styles.css'


function Joke({joke}) {
    return <>
        <div className="card">
            <p>
                <b>{joke}</b>
            </p>
        </div>
    </>;
}

const Jokes = (props) => {
    const [jokes, setJokesList] = useState([]);
    useEffect(() => {


            fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&type=single&amount=9')
                .then((response) => response.json())
                .then((data) =>{
                    setJokesList(data.jokes)
                });

    }, []);

    return (
        <div>
        <h1>Funny Jokes To Lighten Up Your Mood from JokesAPI </h1>
            <div className="gallery">
                {jokes.map((joke) => {
                    return (
                        <Joke
                            joke={joke.joke}
                            key={joke.id}
                        />
                    );
                })}
            </div>
         
        </div>
    );
}

export default Jokes