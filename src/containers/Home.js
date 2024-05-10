import { useEffect } from "react";
import Post from "../components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { selectorError, selectorIsLoading, selectorPosts } from "../redux/selectors/readPostsSelectors";
import { readPosts } from "../redux/actions/readPostsActions";
import { Button, Spinner } from "react-bootstrap";
import "animate.css";


function Home() {

  // Use redux selectors.
  const dispatch = useDispatch();
  const posts = useSelector(selectorPosts);
  const isLoading = useSelector(selectorIsLoading);
  const error = useSelector(selectorError);




  useEffect(() => {
    dispatch(readPosts());
  }, [dispatch]);



  if (error) {
    alert(error);
  }


  function handleReadPosts() {
    const numOldPosts = posts.length;
    dispatch(readPosts(numOldPosts));
  }


  const postComponents = posts.map((p) => <Post key={p.id} post={p} />);

  const showMorePostsSection = (
    <div className="d-flex justify-content-center" style={{ padding: "20px" }}>
      {
        isLoading
          ? (<Spinner animation="border" variant="primary" className="animate__animated animate__fadeIn" data-testid="theSpinner" />)
          : (<Button onClick={handleReadPosts} className="animate__animated animate__fadeIn">Show More Posts</Button>)
      }
    </div>
  );


  return (
    <div>
      {postComponents}
      {showMorePostsSection}
    </div>
  );
}


export default Home;