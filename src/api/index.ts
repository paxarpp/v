import axios from "axios";

const testURL = 'http://localhost:8081/media/all';
	const myInit = {
		method: 'GET',
		mode: 'no-cors' as const,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    },
	};

export const getInfo = async () => {
  const myRequest = new Request(testURL, myInit);

  return await fetch(myRequest)
  // return await fetch('http://localhost:8081/media/all', {
	// 	method: 'GET',
	// 	mode: 'no-cors' as const,
  //   headers: {
  //     "Cache-Control": "no-cache",
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "Access-Control-Allow-Origin": "*",
  //   },
	// })
}