// export const API_ENDPOINT = process.env.NODE_ENV === "development"? "https://localhost:49153" : "http://localhost:6011";
console.log("node env is:" + process.env.NODE_ENV)
console.log("node env is:" + process.env.REACT_APP_API_URL)
export const API_ENDPOINT = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL: "https://localhost:44323";
// export const API_ENDPOINT = "https://api.letschess.nl";
