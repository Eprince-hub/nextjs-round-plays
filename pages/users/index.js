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
              <div>{user.following ? '❤️' : '🖤'}</div>
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

  const cookies = context.req.cookies.following || '[]';
  const following = JSON.parse(cookies);

  console.log(following);
  // [5,7]
  console.log(users);

  const glorifiedUsers = users.map((user) => {
    return {
      ...user,
      following: following.some((id) => {
        return Number(user.id) === id;
      }),
    };
  });

  console.log(glorifiedUsers);

  return {
    props: {
      users: glorifiedUsers,
    },
  };
}
 */

// FOLLOWING Jose's Video
// #############################

// The following property is not with the users from
// the Data base but we need to get the user that
// is being given to us by the function bellow and
// add to it the following property with any value
// that it has.

export async function getServerSideProps(context) {
  const { users } = await import('../../util/database');

  // this gives us access to the cookies we have
  // in our browsers from this webpage
  // and we are accesing the cookies from the backend

  console.log(context.req.cookies); // as a Number 5,7
  console.log(context.req.headers.cookie); // as a string "5" "7"

  // and then we can access the particular cookies
  // values that we want by accessing the name
  // with a dot notation like bellow:
  // console.log(context.req.cookies.following);
  // console.log(context.req.cookies.Cart);

  // when cookie is undefined the the JSON.parse will through an error
  // in other to catch that error and don't let it crash our application.. we need to assign the cookie variable to either the correct value or an empty array.

  const cookies = context.req.cookies.following || '[]';
  const following = JSON.parse(cookies);
  console.log(following);

  // the users object that comes from the database
  // has no property called following so we need
  // to somehow transform that object as we get it
  // from the server into another object that will
  // then have the following property.
  // we can transform an array of object into another
  // array of object using an array method called map
  // so we will map over the users and get each
  // individual user and inject the following
  // property into each of them. like bellow.

  // ########################################

  const glorifiedUsers = users.map((user) => {
    const isTheUserFollowed = following.some((userCookieObj) => {
      return Number(user.id) === userCookieObj.id;
    });

    // We need to find the id from the following to
    // make sure that we can only clap for someone
    // that we are following:

    const userObj = following.find((cookieObj) => {
      return cookieObj.id === Number(user.id);
    });

    // ###################
    return {
      // This is the new object that we are returning
      // from the users object and then store it in
      // a variable called glorifiedUsers.
      // we use the spread operator to return all
      // the already included property of the users
      // and then add the new one we want to add
      // example bellow.

      // after getting the users and inserting the
      // following property or any property that we want,
      // Then we need to match the user id to
      // only the values that are present in the
      // following array which means that we are
      // following the user with this ID
      // to do this we will need to use an array
      // method called some and we will use it to
      // iterate over the following array and check
      // if the numbers in the array is matching the
      // id of any of the users object we have.
      // ...user,
      // following: following.some((id) => {
      // the id of the user in our data base is a
      // string and we need to change it back
      // to a number so that we can compare it to
      // the id that we will get from our following
      // array.
      // return Number(user.id) === id;

      // In other to transform the above data structure to get the new object data structure that we need for storing both the clap and the following which was just an array of numbers,, We would need to reorganize the above data structure to the one we have bellow: The id that we are getting from the following which was in form of true or false in our glorifiedUsers variable and as an array of numbers in our following cookies would need to be transformed into an array of object and the id we are getting from the user would remain the same as we need it for the comparison.:
      // We moved the code that checked the condition
      // up and assigned it into a variable called
      // isTheUserFollowed!

      ...user,
      following: isTheUserFollowed,

      // here we would need to check if the following is true which means we are following the person and then we can start clapping for the person. If the following is false then the clap should be zero.

      clap: isTheUserFollowed ? userObj.clapCount : 0,
    };
  });

  console.log(glorifiedUsers);

  // console.log(users);

  return {
    props: {
      users: glorifiedUsers,
    },
  };
}
