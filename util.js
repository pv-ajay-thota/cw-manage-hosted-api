"use strict";
function loadJSON(path, success, error) {
  // function to load JSON file as input
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

function removeTaskListDrop() {
  //   var parentNodeEle = document.getElementById("dd");
  var oldmenu = document.getElementById("task-list");
  //   parentNodeEle.removeChild(oldmenu);
  var optns = oldmenu.getElementsByTagName("option");
  length = optns.length;

  for (var i = length - 1; i > 0; i--) {
    if (optns[i].value != "") {
      //   console.log("inside: " + optns[i].text);
      optns[i].remove();
    }
  }

  document.getElementById("id-link").innerHTML = "";

  document.getElementById("id-title").innerHTML = "";

  document.getElementById("id-task-desc").innerHTML = "";

  // oldmenu.innerHTML = '';
}

function showDesc(ele) {
  var taskId = ele.options[ele.selectedIndex].value;
  var divTag = document.getElementById("desc");

  var task = myData.taskList.filter(function (item) {
    return item.taskId == taskId;
  });

  document.getElementById("id-link").innerHTML =
    "<p>" + "<b>task url: </b>" + task[0].url + "</p>";

  document.getElementById("id-title").innerHTML =
    "<p>" + "<b>Selected: </b>" + task[0].name + "</p>";

  document.getElementById("id-task-desc").innerHTML =
    "<p>" + "<b>Decription: </b>" + task[0].description + "</p>";
}

function populateTaskList(ele) {
  removeTaskListDrop();

  if (myData.taskList.length < 1) {
    return;
  } else {
    //   first get the task list
    var totalTaskList = myData.taskList;
    var taskList = totalTaskList.filter(function (item) {
      return item.productCategory == ele.options[ele.selectedIndex].value;
    });

    if (null == taskList || taskList.length < 1) {
      console.log(
        "task list for " + ele.options[ele.selectedIndex].text + "is empty."
      );
      return;
    }

    var selectDropDown = document.getElementById("task-list");
    // var divTag = document.getElementById("id-taskList");
    // var selectDropDown = document.createElement("select");
    // selectDropDown.setAttribute("id", "task-list");
    // selectDropDown.setAttribute("onchange", "showDesc(this)");
    // var optnEle = document.createElement("option");
    // optnEle.setAttribute("value", "");
    // optnEle.text = "-- Select Task --";
    // selectDropDown.add(optnEle);

    for (var i = 0; i < taskList.length; i++) {
      var optnEle = document.createElement("option");
      optnEle.setAttribute("value", taskList[i].taskId);
      optnEle.text = taskList[i].name;

      selectDropDown.add(optnEle);
    }
    // divTag.appendChild(selectDropDown);
    
  }
}

function populateProd() {
  // var doc = document.getElementById("dd");
  try{
    if (myData.products.length < 1) {
      return;
    } else {
      var productsList = myData.products;
      var selectDropDown = document.getElementById("product-list");
  
      for (var i = 0; i < productsList.length; i++) {
        var optnEle = document.createElement("option");
        optnEle.setAttribute("value", productsList[i]);
        optnEle.text = productsList[i];
        selectDropDown.add(optnEle);
      }
    }
  }
  catch{
    console.log("some exception occured.")
  }

}
