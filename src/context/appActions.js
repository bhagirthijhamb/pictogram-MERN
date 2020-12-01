// import { useCallback, useEffect, useContext } from 'react';
// import { LOADING_DATA, SET_POSTS } from './types';
// import { AppContext } from './../context/appContext';


// // Get all posts
// export const getPosts = () => {
//     const [state, dispatch] = useContext(AppContext); 

//     const refresh = useCallback( async() => {
//         dispatch({ type: LOADING_DATA });
//         try {
//             const response = await fetch('/api/posts');
//             const postRes = await response.json();
//             console.log(postRes);
//             dispatch({ type: SET_POSTS, payload: postRes })
//         } catch(err) {
//             console.log(err)
//             dispatch({ type: SET_POSTS, payload: [] })
//         }
//     }, []);
// }  