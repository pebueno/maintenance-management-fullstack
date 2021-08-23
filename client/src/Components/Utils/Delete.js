import axios from "axios";
//Id number of default items that should not be deleted
const assetArray = [
  "612354174e814e4a4838ef38",
  "6123561a6c684914f081acfa",
  "6123579538a9cc28244829a7",
  "612358531ae5c50c3c8aafc0 ",
  "6123591cb815d33ef8ad5092",
  "612359fe5152f20604483c81",
  "61235a800e8e1344e0bb0628",
  "61235af70e8e1344e0bb0631",
  "61235bd0984a2d23bc8cb9ec",
  "61235c4d31c2732bd0944ff9",
];

//Delete Company
export function onDeleteCompany(id, history) {
  if (id === "61234bb94b983c45e4300490") {
    return;
  } else {
    axios
      .delete(process.env.REACT_APP_API_URL + "/companies/" + id)
      .then((res) => {
        if (history) {
          history.push("/");
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowCompanyDetails_deleteClick");
      });
  }
}

//Delete User
export function onDeleteUser(id, history) {
  if (id === "61234f85abcd0949a89c7f6e" || id === "61234fa76c21d54728f6a15b") {
    return;
  } else {
    axios
      .delete(process.env.REACT_APP_API_URL + "/users/" + id)
      .then((res) => {
        if (history) {
          history.push("/");
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowUserDetails_deleteClick");
      });
  }
}

export function onDeleteUnit(id, history) {
  if (id === "61235253607dd51998c9f545" || id === "6123527e2f8e831f70eff2d9") {
    return;
  } else {
    axios
      .delete(process.env.REACT_APP_API_URL + "/units/" + id)
      .then((res) => {
        if (history) {
          history.push("/");
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowUnitDetails_deleteClick");
      });
  }
}

export function onDeleteAsset(id, history) {
  if (assetArray.indexOf(id) > -1) {
    return;
  } else {
    axios
      .delete(process.env.REACT_APP_API_URL + "/assets/" + id)
      .then((res) => {
        if (history) {
          history.push("/");
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error form ShowAssetDetails_deleteClick");
      });
  }
}
export function teste() {
  console.log("teste");
}
