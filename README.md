# CardiologsInterview

This project is my solution to 
[Cardiologs Interview Homwork](https://github.com/CardioLogs/card-triage).

This is my first Angular project and my first time with TypeScript. I've tried
to write idiomatic code in respect with those technologies, please be lenient
if I failed 👼.

## Development server

Run the [server project](https://github.com/CardioLogs/card-triage) on
`http://localhost:3000/` (this should be the default if you `npm run api`).

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Data Flow

The project structure strictly follows
[The Elm Architecture (fr)](http://besnier.se/elm-workshop/#the-elm-architecture)
(which sensibily influenced the `Redux Pattern` in the JS/React world).

The basic idea is to store all the application state in a central place
and purely derive the view from this state. Then, the view can generate some
*messages* (or *events*, or *actions*) which updates the state (and the 
view automatically is updated from this new state).

## TDD

I've used the *Types Driven Development* technique to develop this application,
trying to make 
["impossible states impossible"](https://www.youtube.com/watch?v=IcgmSRJHu_8)
as much as possible.

E.g., the `patients` field of my model is not a an array of patients. This
is either `LoadingPatient`, `ErrorPatient` or `LoadedPatient`. Only the 
`LoadedPatient` type has a patients array and TypeScript prevent us to
access this array if the data are not loaded.

The data coming from the server are "unsafe": we are not sure they are in
the shape we expect. That is why I've build `decode` functions to translate
from this "unsafe" world to the "safe" one (a.k.a TypeScript types). I should
write tests for thoses functions, since they are really error prone (but, hey!
I've already consumed all the time budget for this homework!). (In elm,
[it is really easy and safe to write such functions](https://functional.christmas/2019/8),
but it didn't find such similar *wide adopted* lib in TS.)

Those `decode` functions represent failure by returning `null`. It would be 
more appropriate to use some kind of
[`Result`](https://en.wikipedia.org/wiki/Result_type)
type to express what made the decoding fail, but it seems a bit complicated
to use in practice since each TS lib use its own `Result` version, so I use
`null` 🤷‍♂️.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

