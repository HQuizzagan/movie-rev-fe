import './styles/style.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'

Axios.defaults.baseURL = 'https://movie-rev-mysql-v1.herokuapp.com/';

function App() {

  const [movieName, setMovieName] = useState(null)
  const [movieReview, setMovieReview] = useState(null)
  const [movieReviewList, setmovieReviewList] = useState([])
  const [newReview, setnewReview] = useState('')

  useEffect(() => {
    Axios.get("/api/get").then((response) => {
      console.log(response.data)

      setmovieReviewList(response.data)
    })
  }, [])

  const submitReview = () => {

    Axios.post("/api/insert", {movieName: movieName, movieReview: movieReview})
    .then((response) => {
      alert('Successul insert!')
      console.log(response)
    })

    setmovieReviewList([...movieReviewList, {
      movieName: movieName,
      movieReview: movieReview
    }])


    // .catch(error => {
    //   console.log(error)
    // })
  }

  const deleteReview = (movie) => {
    Axios.delete(`/api/delete/${movie}`)

    alert('Movie review was deleted successfully!')
  }

  const updateReview = (movie) => {
    Axios.put("http://localhost:3301/api/update", {
      movieName: movie,
      movieReview: newReview
    })

    setnewReview('')

    alert('Movie review was successfully UPDATED!')
  }

  return (
    <div className="App">
      <h1>CRUD Application</h1>

      <div className="form">
        <label htmlFor="">Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }} />

        <label htmlFor="">Review</label>
        <input type="text" name="review" onChange={(e) => {
          setMovieReview(e.target.value)
        }} />

        <button className="submit" onClick={submitReview}>SUBMIT</button>
        {/* <button className="submit" onClick={getData}>Get Data</button> */}
      </div>

      

      <div className="saved-reviews">
        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <div className="control-buttons">
                <button onClick={() => deleteReview(val.movieName)}>DELETE</button>
                <input type="text" className="text" onChange={(e) => setnewReview(e.target.value)} />
                <button onClick={() => updateReview(val.movieName)}>UPDATE</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
