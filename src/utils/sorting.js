// export let paginationFun = (_brake, _page, _showAllData) => {
//   let limit = "";
//   let skip = "";

//   if (_showAllData !== "true") {
//     limit = _brake || "10";
//     skip = `${(Number(_page || "1") - 1) * Number(_brake || "10")}`;
//   } else {
//     limit = "";
//     skip = "";
//   }

//   return { limit, skip };
// };

// export let selectingFunc = (_select) => {
//   let select = "";
//   //_select = email,fistName
//   if (_select) {
//     let selectArr = _select.split(",");
//     select = selectArr.join(" ");
//   } else {
//     select = "";
//   }

//   return select;
// };
