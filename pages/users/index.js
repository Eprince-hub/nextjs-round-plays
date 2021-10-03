import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Users(props) {
  return (
    <Layout>
      <Head>
        <title>users</title>
      </Head>
      <h2>Users List</h2>
      <ul>
        {props.users.map((user) => {
          return (
            <li key={`user-li-${user.id}`}>
              {user.name}:
              <Link href={`/users/${user.id}`}>
                <a>{user.name} single page</a>
              </Link>
              <div>{user.cartInside ? '❤️' : '🖤'}</div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

/*
export async function getServerSideProps(context) {
  const { users } = await import('../../util/database');

  const cookies = context.req.cookies.cartInside || '[]';
  const cartInside = JSON.parse(cookies);

  console.log(cartInside);
  // [5,7]
  console.log(users);

  const itemInsideCart = users.map((user) => {
    return {
      ...user,
      cartInside: cartInside.some((id) => {
        return Number(user.id) === id;
      }),
    };
  });

  console.log(itemInsideCart);

  return {
    props: {
      users: itemInsideCart,
    },
  };
}
 */

// CARTINSIDE Jose's Video
// #############################

// The cartInside property is not with the users from
// the Data base but we need to get the user that
// is being given to us by the function bellow and
// add to it the cartInside property with any value
// that it has.

export async function getServerSideProps(context) {
  const { users } = await import('../../util/database');

  // this gives us access to the cookies we have
  // in our browsers from this webpage
  // and we are accesing the cookies from the backend

  // console.log(context.req.cookies); // as a Number 5,7
  // console.log(context.req.headers.cookie); // as a string "5" "7"

  // and then we can access the particular cookies
  // values that we want by accessing the name
  // with a dot notation like bellow:
  // console.log(context.req.cookies.cartInside);
  // console.log(context.req.cookies.Cart);

  // when cookie is undefined the the JSON.parse will through an error
  // in other to catch that error and don't let it crash our application.. we need to assign the cookie variable to either the correct value or an empty array.

  const cookies = context.req.cookies.cartInside || '[]';
  const cartInside = JSON.parse(cookies);
  // console.log(cartInside);

  // the users object that comes from the database
  // has no property called cartInside so we need
  // to somehow transform that object as we get it
  // from the server into another object that will
  // then have the cartInside property.
  // we can transform an array of object into another
  // array of object using an array method called map
  // so we will map over the users and get each
  // individual user and inject the cartInside
  // property into each of them. like bellow.

  // ########################################

  const itemInsideCart = users.map((user) => {
    const isTheItemInCart = cartInside.some((userCookieObj) => {
      return Number(user.id) === userCookieObj.id;
    });

    // We need to find the id from the cartInside to
    // make sure that we can only quantity for someone
    // that we are cartInside:

    const userObj = cartInside.find((cookieObj) => {
      return cookieObj.id === Number(user.id);
    });

    // ###################
    return {
      // This is the new object that we are returning
      // from the users object and then store it in
      // a variable called itemInsideCart.
      // we use the spread operator to return all
      // the already included property of the users
      // and then add the new one we want to add
      // example bellow.

      // after getting the users and inserting the
      // cartInside property or any property that we want,
      // Then we need to match the user id to
      // only the values that are present in the
      // cartInside array which means that we are
      // cartInside the user with this ID
      // to do this we will need to use an array
      // method called some and we will use it to
      // iterate over the cartInside array and check
      // if the numbers in the array is matching the
      // id of any of the users object we have.
      // ...user,
      // cartInside: cartInside.some((id) => {
      // the id of the user in our data base is a
      // string and we need to change it back
      // to a number so that we can compare it to
      // the id that we will get from our cartInside
      // array.
      // return Number(user.id) === id;

      // In other to transform the above data structure to get the new object data structure that we need for storing both the quantity and the cartInside which was just an array of numbers,, We would need to reorganize the above data structure to the one we have bellow: The id that we are getting from the cartInside which was in form of true or false in our itemInsideCart variable and as an array of numbers in our cartInside cookies would need to be transformed into an array of object and the id we are getting from the user would remain the same as we need it for the comparison.:
      // We moved the code that checked the condition
      // up and assigned it into a variable called
      // isTheItemInCart!

      ...user,
      cartInside: isTheItemInCart,

      // here we would need to check if the cartInside is true which means we are cartInside the person and then we can start quantityping for the person. If the cartInside is false then the quantity should be zero.

      quantity: isTheItemInCart ? userObj.quantityCount : 0,
    };
  });

  // console.log(itemInsideCart);

  // console.log(users);

  return {
    props: {
      users: itemInsideCart,
    },
  };
}
