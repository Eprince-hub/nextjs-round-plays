// import Cookies from 'js-cookie';
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

// console.log(Cookies.get('cartInside'));

export default function User(props) {
  // this could be the items that are already in the cart!.. need to check later to be sure
  const [cartInside, setCartInside] = useState(
    getParsedCookie('cartInside') || [],
  );
  // #############################################

  const itemCookieObj = cartInside.find((cookieObj) => {
    return cookieObj.id === Number(props.singleUser.id); // this finds the cookie object that has the same id as the single user obj
  });

  const initialQuantityCount = itemCookieObj ? itemCookieObj.quantityCount : 1;

  // we are creating the state variable to start
  // recording the quantity and increase it anytime we click the quantity for me button.
  const [quantityCount, setQuantityCount] = useState(initialQuantityCount);

  // We need to create a click handler that adds and
  // removes from the array of cartInside and it will
  // update the users accordingly.

  // ##########################
  // click handler starts here

  // I am commenting this out to try to modify it to work like i want

  /* function addToCartClickHandler() {
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

    const currentCookie = getParsedCookie('cartInside') || []; // we get the current state of the cookie as the browser loads.
    const isItemInCart = currentCookie.some((cookieObj) => {
      return cookieObj.id === Number(props.singleUser.id);
    });

    // when we find the matching user with the number
    // in the cartInside array,, We need to either delete or add it according to if the cookie already exists or not. and we use filter to find
    // them and work on them

    let newCookie;

    if (isItemInCart) {
      // if the user is being followed, then remove

      newCookie = currentCookie.filter((cookieObj) => {
        return cookieObj.id !== Number(props.singleUser.id);
      });
      // If the user is unfollowed then reset the quantityCount back to Zero
      setQuantityCount(0);
    } else {
      // if the user is not being followed then follow

      newCookie = [
        ...currentCookie,
        { id: Number(props.singleUser.id), quantityCount: 1 },
      ];
    }

    setParsedCookie('cartInside', newCookie);
    setCartInside(newCookie);
  }

  // Follow click handler ends here

  // ###############################

  function quantityClickHandler() {
    // add one to the quantity property
    // 1. Get the old version of the array

    const currentCookie = getParsedCookie('cartInside') || [];
    // 2. get the object in the array

    const cookieObjFound = currentCookie.find((cookieObj) => {
      return cookieObj.id === Number(props.singleUser.id);
    });

    cookieObjFound.quantityCount += 1;
    // 3. get the new version of the array

    setParsedCookie('cartInside', currentCookie);
    setQuantityCount(cookieObjFound.quantityCount);
  }

  function reduceQuantityClickHandler() {
    // add one to the quantity property
    // 1. Get the old version of the array

    const currentCookie = getParsedCookie('cartInside') || [];
    // 2. get the object in the array

    const cookieObjFound = currentCookie.find((cookieObj) => {
      return cookieObj.id === Number(props.singleUser.id);
    });

    cookieObjFound.quantityCount -= 1;
    // 3. get the new version of the array

    setParsedCookie('cartInside', currentCookie);
    setQuantityCount(cookieObjFound.quantityCount);
  }

  function handleQuantityError() {
    console.log("can't go bellow 0 ");
  } */

  // Demo trying to make the above function work for me in a way that i want.

  // ###############################

  function quantityClickHandler() {
    // add one to the quantity property
    // 1. Get the old version of the array

    const currentCookie = getParsedCookie('cartInside') || [];
    // 2. get the object in the array

    const cookieObjFound = currentCookie.find((cookieObj) => {
      return cookieObj.id === Number(props.singleUser.id);
    });

    cookieObjFound.quantityCount += 1;
    // 3. get the new version of the array

    setParsedCookie('cartInside', currentCookie);
    setQuantityCount(cookieObjFound.quantityCount);
  }

  // ###############################################################
  // function that handles the add to cart

  function addToCartClickHandler() {
    const currentCookie = getParsedCookie('cartInside') || []; // we get the current state of the cookie as the browser loads.
    const isItemInCart = currentCookie.some((cookieObj) => {
      return cookieObj.id === Number(props.singleUser.id);
    });

    let newCookie;

    if (isItemInCart) {
      // if the user is being followed, then remove

      newCookie = currentCookie.filter((cookieObj) => {
        return cookieObj.id !== Number(props.singleUser.id);
      });
      // If the user is unfollowed then reset the quantityCount back to Zero
      setQuantityCount(0);
    } else {
      // if the user is not being followed then follow

      newCookie = [
        ...currentCookie,
        { id: Number(props.singleUser.id), quantityCount: 1 },
      ];
    }

    setParsedCookie('cartInside', newCookie);
    setCartInside(newCookie);
  }

  // Function that reduces the quantity number of the items
  function reduceQuantityClickHandler() {
    // add one to the quantity property
    // 1. Get the old version of the array

    const currentCookie = getParsedCookie('cartInside') || [];
    // 2. get the object in the array

    const cookieObjFound = currentCookie.find((cookieObj) => {
      return cookieObj.id === Number(props.singleUser.id);
    });

    cookieObjFound.quantityCount -= 1;
    // 3. get the new version of the array

    setParsedCookie('cartInside', currentCookie);
    setQuantityCount(cookieObjFound.quantityCount);
  }

  // handle the invalid input decrease error
  function handleQuantityError() {
    console.log("can't go bellow 0 ");
  }

  // ################################
  // ################################
  // ################################
  // ################################

  return (
    <Layout>
      <Head>
        <title>single user</title>
      </Head>
      <div>Personal user page of {props.singleUser.name}</div>
      <div>his/her favorite color is {props.singleUser.favoriteColor}</div>

      {/* Inside the button we need to check if the id of our single user is equal to any number that is inside the cartInside array and then use some to match them and return that user when the button is clicked.. So it means that when the button is clicked then we will follow the user if we are not cartInside the user already.. but if we are cartInside them already then we will unfollow them when we click the button. */}
      <button onClick={addToCartClickHandler}>
        {cartInside.some(
          (cookieObj) => Number(props.singleUser.id) === cookieObj.id,
        )
          ? 'Remove From Cart'
          : 'Add To Cart'}
      </button>

      {/* From here we are trying to create a quantity for each user to try and record each time we have quantityped for the user,, It means that we will be transforming our cookies data structure from an array of numbers to an array of objects that can record more than one properties for each user */}

      <div>
        <h1>The Item Quantity Starts Here</h1>
      </div>

      {/* The bellow button was always hidden when there are no item in the cart but i don't want them hidden,, so I make the second button down this very one.  */}

      {/* {cartInside.some(
        (cookieObj) => Number(props.singleUser.id) === cookieObj.id,
      ) ? (
        <>
          <h3>Quantity: {quantityCount}</h3>

          <button onClick={quantityClickHandler}>Add Quantity</button>
        </>
      ) : null} */}

      <h3>Quantity: {quantityCount}</h3>

      <button onClick={quantityClickHandler}>Add Quantity</button>

      {/* Clicking to remove quantity */}
      <button
        onClick={
          quantityCount > 1 ? reduceQuantityClickHandler : handleQuantityError
        }
      >
        Remove Quantity
      </button>
    </Layout>
  );

  // #################################
  // bellow was the original code,,
  // i am doing as i follow Jose's with the code
  // above.

  /*






  const [cartInside, setCartInside] = useState(
    getParsedCookie('cartInside') || [],
  );

  function clickHandler() {
    // 1. check the current state of the cookie
    const currentCookie = getParsedCookie('cartInside') || [];
    // [5,7]

    const isItemInCart = currentCookie.some((id) => {
      return id === Number(props.singleUser.id); // id that comes from the URL
    });

    let newCookie;
    if (isItemInCart) {
      // remove the user
      newCookie = currentCookie.filter(
        (id) => id !== Number(props.singleUser.id),
      );
    } else {
      // add the user
      newCookie = [...currentCookie, Number(props.singleUser.id)];
    }

    console.log(newCookie);

    setParsedCookie('cartInside', newCookie);
    setCartInside(newCookie);
  }




  return (
    <Layout>
      <Head>
        <title>single user</title>
      </Head>
      <div>Personal user page of {props.singleUser.name}</div>
      <div>his/her favourite color is {props.singleUser.favoriteColor}</div>
      <button onClick={clickHandler}>
        {cartInside.some((id) => Number(props.singleUser.id) === id)
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
// cartInside Jose's Video Tutorial

export async function getServerSideProps(context) {
  const { users } = await import('../../util/database');

  const idFromUrl = context.query.userId; // 6

  const singleUser = users.find((user) => {
    return idFromUrl === user.id;
  });

  //  { id: '6', name: 'Andrea', favoriteColor: 'purple' },

  // console.log(singleUser);
  return {
    props: {
      singleUser,
    },
  };
}
