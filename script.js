let data_csv = $.ajax({
  url: "MOCK_DATA.csv",
  typeFile: '*.csv',
  dataType: "text",
})
  .done(successFunction)
  .error(errorFunc);

function errorFunc() {
  let span = document.getElementById("wrong");
  span.innerHTML = "File format is not correct";
  span.style.display = "block";
}

let arr1 = [],
    arrEm = [];

function successFunction(data) {
  let span = document.getElementById("wrong");

  let allRows = data.split(/\r?\n|\r/);

  let table = '<table id = "tabl">';

  for (let singleRow = 0; singleRow < allRows.length - 1; singleRow++) {
    if (singleRow === 0) {
      table += "<thead>";
      table += "<tr>";
    } else {
      table += "<tr>";
    }
    let rowCells = allRows[singleRow].split(",");

    arr1.push(rowCells[2]);
    arrEm.push(rowCells[3]);

    table += rowCells.reduce((acc, item, index) => {
      if (singleRow === 0) {
        acc += "<th>";
        acc += item;
        acc += "</th>";
      } else {
        let style = "";

        if (index == 1) {
          style = !item.match(/[a-zA-Z]/gim)
            ? 'style = "background-color: #EF9898"'
            : "";
          if (item == "") {
            span.innerHTML = "File format is not correct";
            span.style.display = "block";
            $(tabl).attr("display", "none");
          }
        }

        if (index == 2) {
          style = !item.match(/(\+1\d{10})|(1\d{10})|(\d{10})/gim)
            ? 'style = "background-color: #EF9898"'
            : "";
          if (item.match(/^1\d{10}/gim)) {
            item = "+" + item;
          }
          if (item.match(/^\d{10}/gim)) {
            item = "+1" + item;
          }
          if (item == "") {
            span.innerHTML = "File format is not correct";
            span.style.display = "block";
            $(tabl).attr("display", "none");
          }
        }

        if (index == 3) {
          style = !item.match(
            /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/gim
          )
            ? 'style = "background-color: #EF9898"'
            : "";
          if (item == "") {
            span.innerHTML = "File format is not correct";
            span.style.display = "block";
            $(tabl).attr("display", "none");
          }
        }

        if (index == 4) {
          style = !(item.match(/^[]?\d+$/gim) && item >= 21)
            ? 'style = "background-color: #EF9898"'
            : "";
        }

        if (index == 5) {
          style = !(item >= 0 && item <= 21)
            ? 'style = "background-color: #EF9898"'
            : "";
        }

        if (index == 6) {
          style = !(item.match(/\d+/gim) && item >= 0 && item <= 1000000000)
            ? 'style = "background-color: #EF9898"'
            : "";
          let item_split = item.split(".");
          if (item_split[1] === undefined) {
            item = item + ".00";
          } else if (item_split[1].length == 1) {
            item = item + "0";
          } else item = Math.round(item * 100) / 100;
        }

        if (index == 7) {
          style = !(item == "true" || item == "false" || item == "")
            ? 'style = "background-color: #EF9898"'
            : "";
          if (item == "") {
            item = "false";
          }
        }

        if (index == 8) {
          style = !item.match(/^[a-zA-Z]+\|?[a-zA-Z]+?\|?[a-zA-Z]+?$/gim)
            ? 'style = "background-color: #EF9898"'
            : "";

          let it_split = item.split("|").map((element) => {
            return element.toUpperCase().slice(0, 2);
          });
          item = it_split;
        }

        if (index == 9) {
          style = !item.match(/(2\d{3}\-((0[1-9]{1})|(1[0-2]{1}))\-((0[1-9]{1})|(1[1-9]{1})|(2[0-9]{1})|(3[0-1]{1})))|(((0[1-9]{1})|(1[0-2]{1}))\/((0[1-9]{1})|(1[1-9]{1})|(2[0-9]{1})|(3[0-1]{1}))\/2\d{3})/gim)
            ? 'style = "background-color: #EF9898"'
            : "";

          let now_date = new Date();
          const now_date_year = now_date.getFullYear();
          const now_date_month = now_date.getMonth() + 1;
          const now_date_day = now_date.getDate();

          const it_spl1 = item.split("/");
          if (it_spl1[2] < now_date_year) {
            style = 'style = "background-color: #EF9898"';
          } else if (it_spl1[2] >= now_date_year && it_spl1[0] < now_date_month) {
            style = 'style = "background-color: #EF9898"';
          } else if (it_spl1[2] >= now_date_year && it_spl1[0] >= now_date_month && it_spl1[1] < now_date_day) {
            style = 'style = "background-color: #EF9898"';
          }

          const it_spl2 = item.split("-");
          if (it_spl2[0] < now_date_year) {
            style = 'style = "background-color: #EF9898"';
          } else if (it_spl2[0] >= now_date_year && it_spl2[1] < now_date_month) {
            style = 'style = "background-color: #EF9898"';
          } else if (it_spl2[0] >= now_date_year && it_spl2[1] >= now_date_month && it_spl2[2] < now_date_day) {
            style = 'style = "background-color: #EF9898"';
          }
        }

        if (index == 10) {
          style = !item.match(/^[a-zA-Z0-9]{6}$/gim)
            ? 'style = "background-color: #EF9898"'
            : "";
        }

        acc += `<td ${style}>`;
        acc += item;
        acc += "</td>";
      }
      return acc;
    }, "");

    if (singleRow === 0) {
      table += "</tr>";
      table += "</thead>";
      table += "<tbody>";
    } else {
      table += "</tr>";
    }
  }
  table += "</tbody>";
  table += "</table>";

  $("body").append(table);

  const indexOfEl = (arr, val) =>
    arr.reduce((acc, el, i) => (el.toLowerCase() === val.toLowerCase() ? [...acc, i] : acc), []);

  const phoneAll = document.querySelectorAll("#tabl td:nth-child(3)");
  const emailAll = document.querySelectorAll("#tabl td:nth-child(4)");
  for (let i = 0; i < phoneAll.length; i++) {
    let text = phoneAll[i].textContent; 
    let ind = indexOfEl(arr1, text)[1];
    const dupl = document.querySelectorAll("#tabl td:nth-child(12)");

    if (ind == undefined) {
      dupl[i].innerHTML = "";
    } else if (!dupl[i].textContent) {
      dupl[i].innerHTML = ind;
      dupl[ind - 1].innerHTML = i + 1;
      phoneAll[i].style.backgroundColor = '#EF9898';
      phoneAll[ind - 1].style.backgroundColor = '#EF9898';
    }
  }

  for (let i = 0; i < emailAll.length; i++) {
    let textEmail = emailAll[i].textContent;
    let indEm = indexOfEl(arrEm, textEmail)[1];
    const dupl = document.querySelectorAll("#tabl td:nth-child(12)");

    if (indEm == undefined && !dupl[i].textContent) {
      dupl[i].innerHTML = "";
    } else if (!dupl[i].textContent) {
      dupl[i].innerHTML = indEm;
      dupl[indEm - 1].innerHTML = i + 1;
      emailAll[i].style.backgroundColor = '#EF9898';
      emailAll[indEm - 1].style.backgroundColor = '#EF9898';
    }
  }
}

