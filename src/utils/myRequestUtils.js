import My from "./My";
import MyJsonLocalStorage from "./MyJsonLocalStorage";

export async function myFetch({ url, method = "GET", body, onSuccess, onFailure, onValidationErrors }) {
  
  // Log fetch info.
  logMyFetchInfo(url, method)

  const token = getToken();


  try {
    url = process.env.REACT_APP_BACKEND_URL + url;

    const response = await fetch(url, {
      method: method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();


    if (response.status === 200 || response.status === 201) {      
      onSuccess ? onSuccess(data) : onDefaultSuccess(data);
    } else {
      const errorMsg = data?.error?.friendlyErrorMessage ?? "";
      throw new Error(errorMsg);      
    }

  } catch (e) {
    onFailure ? onFailure(e.message) : onDefaultFailure(e.message);    
  }

}


function getToken() {
  const storedAuth = MyJsonLocalStorage.get("auth");

  if (storedAuth) {
    return storedAuth.token;
  }

  return null;
}


function onDefaultFailure(errorMsg) {
  My.log("Oops, error in METHOD: onDefaultFailure()...");
  My.log(`Error: ${errorMsg}`);
}


function logMyFetchInfo(url, method) {
  My.log("\n###########################################");
  My.log("myFetch Info:");
  My.log(`${method} request to url: ${url}`);
  My.log("###########################################\n");  
}


function onDefaultSuccess(data) {
  My.log("METHOD: onDefaultSuccess()...");
  My.log("data ==> ...");
  My.displayJsonContents(data);
}