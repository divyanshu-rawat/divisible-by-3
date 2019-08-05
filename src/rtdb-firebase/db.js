import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyAjWmaRBbmhzHBuLsdeBUhVNDsN8m-OzAU",
  authDomain: "gameof3-bc47a.firebaseapp.com",
  databaseURL: "https://gameof3-bc47a.firebaseio.com",
  projectId: "gameof3-bc47a",
  storageBucket: "gameof3-bc47a.appspot.com/",
  messagingSenderId: "43754730450",
  appId: "1:43754730450:web:d3b7d56456bbf021"
});

/* 
    In Vuefire, Subscriptions to changes are handled transparently, that's why we always talk about binding,
    you only provide the key of the state where to bind as well as the Source (Collection, Query or Document) and Vuefire takes care of the rest!
*/

export const database = app.database();
export const playerRef = database.ref('playerRef');
export const databaseURL = "https://gameof3-bc47a.firebaseio.com/.json"















