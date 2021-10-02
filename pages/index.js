import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';

export default function Home() {
  const myDarkMode = getLocalStorage('darkMode') || false;

  const [darkMode, setDarkMode] = useState(myDarkMode);

  function clickHandler() {
    const newDarkMode = !getLocalStorage('darkMode');

    setLocalStorage('darkMode', newDarkMode);

    setDarkMode(newDarkMode);
  }

  // 1. Local Storage is string only
  // 2. Local Storage have methods to set remove and get
  // 3. Local Storage values are independent of the browser and the domain

  return (
    <Layout>
      <Head>
        <title>UpLeveled next.js</title>
      </Head>
      <div>Local Storage Test</div>
      <div>dark mode : {JSON.stringify(darkMode)}</div>
      <button onClick={clickHandler}>dark mode</button>
    </Layout>
  );
}

// I followed the Video from Jose And then we did
// the better verson which is the on on top.
// ###########################################

// export default function Home() {
//   const [background, setBackground] = useState('white');

//   // 1. Local Storage is string only
//   // 2. Local Storage have methods to set remove and get
//   // 3. Local Storage values are independent of the browser and the domain

//   // bellow code would throw an error because window.local Storage is not available on the back-end.
//   // and because our application is being also rendered at the back end by nextjs,, we will get
//   // a window not defined error because when the program runs on the backend.. the local storage was still undefined. so to fix this we need to give it a condition.
//   // const myDarkMode = window.localStorage;
//   // console.log(myDarkMode);

//   // this code below is the fix of the above error.

//   const myDarkMode =
//     typeof window === 'undefined'
//       ? true
//       : JSON.parse(window.localStorage.getItem('darkMode'));

//   const [darkMode, setDarkMode] = useState(myDarkMode);

//   console.log(myDarkMode);

//   // We are trying to make a darkmode that would be stored in a local
//   // storage and persist so that whenever the user visits our website
//   // they don't have to reset the wepage back to their prefred mode..
//   // either dark mode or light mode.

//   // Note: If i want to show javasrcipt primitive variables on the screen like false, true, undefined,, i must stringify it in other to be able
//   // to show in react on the screen.

//   function clickHandler() {
//     if (typeof window === 'undefined') return;

//     const newDarkMode = !JSON.parse(window.localStorage.getItem('darkMode'));

//     // console.log(JSON.parse(myDarkMode.getItem('darkMode')));

//     window.localStorage.setItem('darkMode', newDarkMode);
//     setDarkMode(newDarkMode);

//     // trying to make the background change when the button is clicked
//     // according to the value of the dark mode

//     /*   if (darkMode) {
//       setBackground('black');
//     } else {
//       setBackground('white');
//     } */
//   }

//   return (
//     <Layout>
//       <Head>
//         <title>UpLeveled next.js</title>
//       </Head>
//       <div>Local Storage Test</div>
//       {/* We are rendering the Them property of the local storage,, I created the Them on the local storage and assigned it Victor.E.
//       This can be used to store the user's information on the browser and display it to them when ever they visit the page or product cart.
//       It is useful for : storing if the person have accepted the cookies or not and when it is stored in the local storage then you don't have to ask the user to keep accepting the cookies.*/}
//       <div>info from local storage:</div>
//       <div>p2</div>
//       <h1 style={{ backgroundColor: background }}>Background Tester</h1>
//       <div>Dark Mode: {JSON.stringify(darkMode)}</div>
//       <button onClick={clickHandler}>Toggle Darkmode</button>
//     </Layout>
//   );
// }
