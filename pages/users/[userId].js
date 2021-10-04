// import Cookies from 'js-cookie';
import Head from 'next/head';
import { useState } from 'react';
// import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';

export default function User(props) {
  // this could be the items that are already in the cart!.. need to check later to be sure
  const [cartInside, setCartInside] = useState(
    getParsedCookie('cartInside') || [],
  );

  const itemCookieObj = cartInside.find((cookieObj) => {
    return cookieObj.id === Number(props.singleUser.id); // this finds the cookie object that has the same id as the single user obj
  });

  const initialQuantityCount = itemCookieObj ? itemCookieObj.quantityCount : 1;

  const [quantityCount, setQuantityCount] = useState(initialQuantityCount);

  function quantityClickHandler() {
    const currentCookie = getParsedCookie('cartInside') || [];

    const cookieObjFound = currentCookie.find((cookieObj) => {
      return cookieObj.id === Number(props.singleUser.id);
    });

    cookieObjFound.quantityCount += 1;

    setParsedCookie('cartInside', currentCookie);
    setQuantityCount(cookieObjFound.quantityCount);
  }

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
  // Cart Tutorial Starts HERE

  // #####################################################
  // This add to cart button is working how i want it now.
  function addToCartHandler() {
    const currentCookie = getParsedCookie('cartInside') || []; // we get the current state of the cookie as the browser loads.
    const isItemInCart = currentCookie.some((cookieObj) => {
      return cookieObj.id === Number(props.singleUser.id);
    });

    let newCookie;

    if (!isItemInCart) {
      // if the user is not being followed then follow

      newCookie = [
        ...currentCookie,
        { id: Number(props.singleUser.id), quantityCount: 1 },
      ];

      setParsedCookie('cartInside', newCookie);
      setCartInside(newCookie);
    } else {
      const cookieObjFound = currentCookie.find((cookieObj) => {
        return cookieObj.id === Number(props.singleUser.id);
      });
      cookieObjFound.quantityCount += 1;

      setParsedCookie('cartInside', currentCookie);
      setQuantityCount(cookieObjFound.quantityCount);
    }
  }

  // The Add To Cart button above is working like i want it!

  // ############################################################

  // ############################################################

  // Implement remove from Cart

  // This function is working how i want it to work right now
  function removeItemFromCartClickHandler() {
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
      setParsedCookie('cartInside', newCookie);
      setCartInside(newCookie);
    } /*  else {
      // if the user is not being followed then follow

      newCookie = [
        ...currentCookie,
        { id: Number(props.singleUser.id), quantityCount: 1 },
      ];
    }

    setParsedCookie('cartInside', newCookie);
    setCartInside(newCookie); */
  }

  // #######################################
  // Implemented a working remove from cart.

  return (
    <Layout>
      <Head>
        <title>single user</title>
      </Head>
      <div>Personal user page of {props.singleUser.name}</div>
      <div>his/her favorite color is {props.singleUser.favoriteColor}</div>

      <button onClick={addToCartClickHandler}>
        {cartInside.some(
          (cookieObj) => Number(props.singleUser.id) === cookieObj.id,
        )
          ? 'Remove From Cart'
          : 'Add To Cart'}
      </button>

      <div>
        <h1>The Item Quantity Starts Here</h1>
      </div>

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

      {/* From cart tutorial */}
      {/* New add to cart */}
      <button onClick={addToCartHandler}>ADD TO CART</button>
      <button onClick={removeItemFromCartClickHandler}>REMOVE FROM CART</button>
    </Layout>
  );
}

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
