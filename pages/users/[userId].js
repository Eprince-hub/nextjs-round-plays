import Cookies from 'js-cookie';
import Head from 'next/head';
import { useState } from 'react';
// import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';

// import { getParsedCookie, setParsedCookie } from '../../util/cookies';

// ###########################################

// We are going to use a library called js-cookie to
// set the cookies on the front end.
// we need to import the library and use its functions
// to get and set the cookies.

console.log(Cookies.get('following'));

export default function User(props) {
  const [following, setFollowing] = useState(
    getParsedCookie('following') || [],
  );
  // #############################################

  const userCookieObj = following.find((cookieObj) => {
    return cookieObj.id === Number(props.singleUser.id);
  });

  const initialClapCount = userCookieObj ? userCookieObj.clapCount : 0;

  // we are creating the state variable to start
  // recording the clap and increase it anytime we click the clap for me button.
  const [clapCount, setClapCount] = useState(initialClapCount);

  // We need to create a click handler that adds and
  // removes from the array of following and it will
  // update the users accordingly.

  // ##########################
  // click handler starts here

  function followClickHandler() {
    // the button need to check the current state
    // of the cookie,
    // it needs to update the cookie state,
    // by adding if it is not there and remove if its
    // there
    // and then update the state of the application
    // we are using the empty arrays to catch the error
    // that would crash our application in case someone
    // have deleted the cookies. So instead of our
    // application crashing because it couldn't parse an undefine,, then it would parse an empty array
    // and then create the cookies once the user clicks the button.

    const currentCookie = getParsedCookie('following') || []; // we get the current state of the cookie as the browser loads.
    const isUserFollowed = currentCookie.some((cookieObj) => {
      return cookieObj.id === Number(props.singleUser.id);
    });

    // when we find the matching user with the number
    // in the following array,, We need to either delete or add it according to if the cookie already exists or not. and we use filter to find
    // them and work on them

    let newCookie;

    if (isUserFollowed) {
      // if the user is being followed, then remove

      newCookie = currentCookie.filter((cookieObj) => {
        return cookieObj.id !== Number(props.singleUser.id);
      });
      // If the user is unfollowed then reset the clapCount back to Zero
      setClapCount(0);
    } else {
      // if the user is not being followed then follow

      newCookie = [
        ...currentCookie,
        { id: Number(props.singleUser.id), clapCount: 0 },
      ];
    }

    setParsedCookie('following', newCookie);
    setFollowing(newCookie);
  }

  // Follow click handler ends here

  // ###############################

  function clapClickHandler() {
    // add one to the clap property
    // 1. Get the old version of the array

    const currentCookie = getParsedCookie('following') || [];
    // 2. get the object in the array

    const cookieObjFound = currentCookie.find((cookieObj) => {
      return cookieObj.id === Number(props.singleUser.id);
    });

    cookieObjFound.clapCount += 1;
    // 3. get the new version of the array

    setParsedCookie('following', currentCookie);
    setClapCount(cookieObjFound.clapCount);
  }

  return (
    <Layout>
      <Head>
        <title>single user</title>
      </Head>
      <div>Personal user page of {props.singleUser.name}</div>
      <div>his/her favorite color is {props.singleUser.favoriteColor}</div>

      {/* Inside the button we need to check if the id of our single user is equal to any number that is inside the following array and then use some to match them and return that user when the button is clicked.. So it means that when the button is clicked then we will follow the user if we are not following the user already.. but if we are following them already then we will unfollow them when we click the button. */}
      <button onClick={followClickHandler}>
        {following.some(
          (cookieObj) => Number(props.singleUser.id) === cookieObj.id,
        )
          ? 'unfollow'
          : 'follow'}
      </button>

      {/* From here we are trying to create a clap for each user to try and record each time we have clapped for the user,, It means that we will be transforming our cookies data structure from an array of numbers to an array of objects that can record more than one properties for each user */}

      <div>
        <h1>Clapping starts here</h1>
      </div>

      {following.some(
        (cookieObj) => Number(props.singleUser.id) === cookieObj.id,
      ) ? (
        <>
          <h3>Clap: {clapCount}</h3>

          <button onClick={clapClickHandler}>Clap for me!</button>
        </>
      ) : null}
    </Layout>
  );

  // #################################
  // bellow was the original code,,
  // i am doing as i follow Jose's with the code
  // above.

  /*






  const [following, setFollowing] = useState(
    getParsedCookie('following') || [],
  );

  function clickHandler() {
    // 1. check the current state of the cookie
    const currentCookie = getParsedCookie('following') || [];
    // [5,7]

    const isUserFollowed = currentCookie.some((id) => {
      return id === Number(props.singleUser.id); // id that comes from the URL
    });

    let newCookie;
    if (isUserFollowed) {
      // remove the user
      newCookie = currentCookie.filter(
        (id) => id !== Number(props.singleUser.id),
      );
    } else {
      // add the user
      newCookie = [...currentCookie, Number(props.singleUser.id)];
    }

    console.log(newCookie);

    setParsedCookie('following', newCookie);
    setFollowing(newCookie);
  }




  return (
    <Layout>
      <Head>
        <title>single user</title>
      </Head>
      <div>Personal user page of {props.singleUser.name}</div>
      <div>his/her favourite color is {props.singleUser.favoriteColor}</div>
      <button onClick={clickHandler}>
        {following.some((id) => Number(props.singleUser.id) === id)
          ? 'unfollow'
          : 'follow'}
      </button>
    </Layout>
  ); */
}

// ###################################

// ##########################################
// server side code here

/* export async function getServerSideProps(context) {
  const { users } = await import('../../util/database');

  const idFromUrl = context.query.userId; // 6

  const singleUser = users.find((user) => {
    return idFromUrl === user.id;
  });

  //  { id: '6', name: 'Andrea', favoriteColor: 'purple' },

  console.log(singleUser);
  return {
    props: {
      singleUser,
    },
  };
}
 */

// ###################################
// following Jose's Video Tutorial

export async function getServerSideProps(context) {
  const { users } = await import('../../util/database');

  const idFromUrl = context.query.userId; // 6

  const singleUser = users.find((user) => {
    return idFromUrl === user.id;
  });

  //  { id: '6', name: 'Andrea', favoriteColor: 'purple' },

  console.log(singleUser);
  return {
    props: {
      singleUser,
    },
  };
}
