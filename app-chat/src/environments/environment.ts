// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // firebase config
  firebaseConfig: {
    apiKey: "AIzaSyBbM1A0v4VJY5Ly5ib2Og_zDSw-abrBfq0",
    authDomain: "bessenger-6b25f.firebaseapp.com",
    databaseURL: "https://bessenger-6b25f-default-rtdb.firebaseio.com",
    projectId: "bessenger-6b25f",
    storageBucket: "bessenger-6b25f.appspot.com",
    messagingSenderId: "23435073727",
    appId: "1:23435073727:web:a2b3d58888a5df49d4ce0a",
    measurementId: "G-WWR7ES6LYB"
  },
  // Websocket config
  CHAT_URL: 'ws://203.113.148.132:23023/chat/chat'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
