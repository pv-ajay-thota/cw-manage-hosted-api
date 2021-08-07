
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
  // xhr request
  xhr.open("GET", path, false /* wait till the request is complete */);
  xhr.send();
}

function removeTaskListDrop() {
  var oldmenu = document.getElementById("task-list");
  var optns = oldmenu.getElementsByTagName("option");
  length = optns.length;

  for (var i = length - 1; i > 0; i--) {
    if (optns[i].value != "") {
      optns[i].remove();
    }
  }

  document.getElementById("id-link").innerHTML = "";
  document.getElementById("id-title").innerHTML = "";
  document.getElementById("id-task-desc").innerHTML = "";
}

function showDesc(ele) {
  var taskId = ele.options[ele.selectedIndex].value;
  var divTag = document.getElementById("desc");

  var task = myData.taskList.filter(function (item) {
    return item.taskId == taskId;
  });

  // update fields
  document.getElementById("id-link").value = task[0].url;
  document.getElementById("id-title").value = task[0].name;
  document.getElementById("id-task-desc").value = task[0].description;
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

    for (var i = 0; i < taskList.length; i++) {
      var optnEle = document.createElement("option");
      optnEle.setAttribute("value", taskList[i].taskId);
      optnEle.text = taskList[i].name;

      selectDropDown.add(optnEle);
    }
  }
}

function populateProd() {
  try {
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
  } catch {
    console.log("some exception occured.");
  }
  
}

function initSelection(){
  populateProd();
  //future functions for initialization yet to be written.
}