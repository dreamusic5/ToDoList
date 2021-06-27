let data = [];
const btn_add = document.querySelector(".btn_add");
const btn_all = document.querySelector(".btn_all");
const btn_unfinished = document.querySelector(".btn_unfinished");
const btn_finished = document.querySelector(".btn_finished");
const todoList = document.querySelector(".todoList");
const filter = document.querySelector(".filter");
const unfinished_num = document.querySelector(".unfinished_num");
const input_list = document.querySelector(".input_list");
const clearDone_btn = document.querySelector(".clearDone_btn");


function calc_unfinished_num() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        if (!data[i].checked) {
            sum++;
        }
    }
    unfinished_num.textContent = sum + "個待完成項目";
}

function render() {
    let str = "";
    data.forEach(function (item, index) {
        let content;
        if (data[index].checked) {
            content = `<li>
            <label data-num="${index}" ><input data-num="${index}" class="checkBox" type="checkbox" checked><span >✔</span>
            <p>${item.todoList}</p>
            </label><input class="delete" type="button" value="X"></li>`;
        } else {
            content = `<li>
            <label data-num="${index}"><input data-num="${index}" class="checkBox" type="checkbox"><span >✔</span>
            <p>${item.todoList}</p>
            </label><input class="delete" type="button" value="X"></li>`;
        }
        str += content
    })
    todoList.innerHTML = str;
    calc_unfinished_num()

    //判斷cursor在哪
    const cursor = filter.querySelector(".cursor");
    refresh_filter(cursor);
}

function refresh_filter(tag) {
    const checkBox = todoList.querySelectorAll(".checkBox");

    if (tag.value === "已完成") {
        btn_unfinished.classList.remove("cursor");
        btn_all.classList.remove("cursor");
        for (let i = 0; i < data.length; i++) {
            if (data[i].checked) {
                checkBox[i].parentNode.parentNode.style.display = 'flex';
            } else {
                checkBox[i].parentNode.parentNode.style.display = 'none';
            }
        }
    } else if (tag.value === "待完成") {
        btn_all.classList.remove("cursor");
        btn_finished.classList.remove("cursor");
        for (let i = 0; i < data.length; i++) {
            if (data[i].checked) {
                checkBox[i].parentNode.parentNode.style.display = 'none';
            } else {
                checkBox[i].parentNode.parentNode.style.display = 'flex';
            }
        }

    } else {
        btn_finished.classList.remove("cursor");
        btn_unfinished.classList.remove("cursor");
        for (let i = 0; i < data.length; i++) {
            checkBox[i].parentNode.parentNode.style.display = 'flex';
        }
    }

}

render()

// check and uncheck 
todoList.addEventListener("click", function (e) {
    let num = e.target.dataset.num;
    let checkBox = todoList.querySelectorAll(".checkBox");
    if (e.target.nodeName !== "INPUT" || e.target.className === "delete") {
        return
    }
    // console.log(checkBox[num].checked);
    if (checkBox[num].checked) {
        data[num].checked = true;
    } else {
        data[num].checked = false;
    }
    calc_unfinished_num()
    let cursor = filter.querySelector(".cursor");
    refresh_filter(cursor);
})

// add new todoList
btn_add.addEventListener("click", function (e) {
    let content = input_list.value.trim();
    if (content === "") {
        return
    }
    data.push({
        checked: false,
        todoList: content
    });
    render()
    input_list.value = "";
})

input_list.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        btn_add.click();
    }
});


filter.addEventListener("click", function (e) {
    e.target.classList.add("cursor");
    refresh_filter(e.target)

})

clearDone_btn.addEventListener("click", function () {
    for (let i = data.length - 1; i > -1; i--) {
        if (data[i].checked) {
            data.splice(i, 1);
        }
    }
    render()
})


todoList.addEventListener("click", function (e) {
    if (e.target.className !== "delete") {
        return
    }
    let num = e.target.previousSibling.dataset.num;
    data.splice(num, 1);
    render()

})