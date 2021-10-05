import { css } from '@emotion/react';
// import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
// import { useState } from 'react';
// import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { getParsedCookie } from '../../../util/cookies';

const cartStyling = css`
  width: 100vw;
  min-height: 50vh;
  background: red;

  ul li img {
    height: 300px;
  }
`;

// import { getParsedCookie, setParsedCookie } from '../../util/cookies';

// import { getParsedCookie, setParsedCookie } from '../../util/cookies';

// ###########################################

// We are going to use a library called js-cookie to
// set the cookies on the front end.
// we need to import the library and use its functions
// to get and set the cookies.

// when i get the cookies that is already set by adding to the cart and setting the quantity,
// i want to make sure that the id of the cookie matches the id of the item and then
// display them on the cart page.

// console.log(Cookies.get('cartInside'));

export default function Cart(props) {
  /* export default function Cart({ users }) */ // i created this function like this before, Its same like i did it now

  const users = props.users;

  // getting the cookies from the browser!

  const shoppingCartCookie = getParsedCookie('cartInside') || [];

  // ########################################
  // This did not totally work so i am using the version bellow it
  /*  shoppingCartCookie.map((individualCookie) => {
    const itemAndCookieMatch = users.find((user) => {
      return Number(user.id) === individualCookie.id;
    });

    return itemAndCookieMatch;
  }); */

  // This code snipet will find all the users or a user that matches the id of
  // the cookies that i have in my cookie cart in the browser.. This would be like
  // the product and adding them to cart. I will need to map over the foundUserWithCookies
  // variable so that i can display all its values in the cart.

  const foundUserWithCookies = shoppingCartCookie.map((individualCookie) => {
    const itemAndCookieMatch = users.find((user) => {
      return Number(user.id) === individualCookie.id;
    });

    return itemAndCookieMatch;
  });

  console.log(foundUserWithCookies);

  /*   const itemAndCookieMatch = users.find((user) => {
    shoppingCartCookie.map((individualCookie) => {
      return individualCookie.id === Number(user.id);
    });
  });
 */

  console.log('Users');
  console.log(users);

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);

  const emptyCart = 'Your Cart is Empty';

  return (
    <Layout>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <div css={cartStyling}>
        <h1>This is shopping cart page</h1>

        <h1>
          {foundUserWithCookies.length !== 0
            ? `You have ${foundUserWithCookies.length} item in your Cart`
            : `Your Cart is Empty`}
        </h1>

        <div>
          {foundUserWithCookies.length === 0 ? (
            <div>
              <Link href="/users">
                <a>View Products</a>
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>

        <ul>
          {foundUserWithCookies.map((userWithCookie) => {
            return (
              <li key={`user-li- ${userWithCookie.id}`}>
                <h1>{userWithCookie.name}</h1>
                <img src={userWithCookie.img} alt={userWithCookie.name} />
                <h4>{`${userWithCookie.price.amount} ${userWithCookie.price.currency}`}</h4>
                <p>{userWithCookie.favoriteColor}</p>
                <p style={{ backgroundColor: userWithCookie.colorChoice.red }}>
                  {userWithCookie.colorChoice.black}
                </p>
              </li>
            );
          })}
        </ul>

        <div>
          <h1>
            {foundUserWithCookies.map((itemPrices) => {
              // Do something here to add the price of the cart items
            })}
          </h1>
        </div>
      </div>
      <button
        onClick={() => {
          console.log('clicked');
        }}
      >
        REMOVE FROM CART
      </button>
    </Layout>
  );
}

// Getting the users from the database.. the user in this case is like the goods items
// and then pass it as props to my component up there.

export async function getServerSideProps(/* context */) {
  const { users } = await import('../../../util/database');

  /*  const idFromUrl = context.query.userId; // 6

  const singleUser = users.find((user) => {
    return idFromUrl === user.id;
  });
 */
  //  { id: '6', name: 'Andrea', favoriteColor: 'purple' },

  console.log('Users should be what i see bellow');
  console.log(users);

  return {
    props: {
      users,
    },
  };
}
