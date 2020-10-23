const TaskController = (function () {
    const Goal = function (id, task, hour, min, time, finished = false) {
        this.id = id;
        this.task = task;
        this.hour = hour;
        this.min = min;
        this.time = time;
        this.finished = finished;
    };

    let appData = {
        goals: [],
        tot: 0,
        finished: [],
        percentage: -1,
    };
    const storeLocalStorage = () => {
        localStorage.setItem("goalify", JSON.stringify(appData));
    };
    const updateAppData = () => {
        const tot = appData.goals.length;

        if (tot > 0) {
            appData.goals.forEach((goal) => {
                if (goal.finished === true) {
                    const index = appData.finished.findIndex((finished) => finished.id === goal.id);
                    if (index === -1) {
                        appData.finished.push(goal);
                    }
                } else if (goal.finished === false) {
                    const index = appData.finished.findIndex((finished) => finished.id === goal.id);
                    if (index !== -1) {
                        appData.finished.splice(index, 1);
                    }
                }
            });
        }

        let percentage = (appData.finished.length / tot) * 100;
        appData.percentage = isNaN(percentage) ? (percentage = 0) : Math.round(percentage);
        appData.tot = tot;
        storeLocalStorage();
    };
    return {
        addInputData: function (data) {
            let id, newGoal;
            id = Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
            data.task = data.task.charAt(0).toUpperCase() + data.task.slice(1);

            newGoal = new Goal(id, data.task, data.hour, data.min, data.time);
            appData.goals.push(newGoal);

            return newGoal;
        },
        updateState: function () {
            updateAppData();
        },
        getState: () => {
            return {
                goals: appData.goals,
                tot: appData.tot,
                finished: appData.finished.length,
                percentage: appData.percentage,
            };
        },

        updateFinished: (id) => {
            appData.goals.forEach((goal) => {
                if (goal.id === id) {
                    goal.finished === false ? (goal.finished = true) : (goal.finished = false);
                }
            });
        },
        deleteItem: (id) => {
            const index = appData.goals.findIndex((goal) => goal.id === id);

            const indexFinish = appData.finished.findIndex((goal) => goal.id === id);
            if (index > -1 || indexFinish > -1) {
                appData.goals.splice(index, 1);
                appData.finished.splice(indexFinish, 1);
            }
        },
        restoreData: () => {
            const data = JSON.parse(localStorage.getItem("goalify"));
            if (data !== null) {
                appData = data;
            }
        },
    };
})();

const UIController = (function () {
    const DOMs = {
        input: ".statistics__form-input",
        hour: ".statistics__form-hour",
        min: ".statistics__form-min",
        time: ".statistics__form-time",
        btn: ".btn",
        list: ".goals__list",
        total: "#total",
        finished: "#finished",
        percentage: "#percentage",
        date: "#today",
    };
    return {
        getDOM: () => {
            return DOMs;
        },
        getData: () => {
            return {
                task: document.querySelector(DOMs.input).value,
                hour: document.querySelector(DOMs.hour).value,
                min: document.querySelector(DOMs.min).value,
                time: document.querySelector(DOMs.time).value,
            };
        },
        clearInput: () => {
            document.querySelector(DOMs.input).value = "";
        },
        showItem: (item) => {
            let markup;
            markup = `
            <li class="goals__item ${item.finished ? "finished" : ""}" data-id=${item.id}>
            <div class="goals__time"><span>${item.hour}:${item.min}</span>${item.time}</div>
            <div class="goals__title">${item.task}</div>
            <div class="goals__btns">
                <button class="goals__btns-finished" data-type="finished">
                    <svg>
                        <use
                            href="./assets/icons/symbol-defs.svg#icon-check-square-o"
                        ></use>
                    </svg>
                </button>
                <button class="goals__btns-deleted" data-type="deleted">
                    <svg>
                        <use href="./assets/icons/symbol-defs.svg#icon-trash"></use>
                    </svg>
                </button>
            </div>
        </li>
            `;

            document.querySelector(DOMs.list).insertAdjacentHTML("afterbegin", markup);
        },

        displayState: (data) => {
            document.querySelector(DOMs.total).innerHTML = `Task: ${data.tot}`;
            document.querySelector(DOMs.finished).innerHTML = `Finished: ${data.finished}`;
            document.querySelector(DOMs.percentage).innerHTML = `Percentage: ${data.percentage}`;
        },
        displayDate: () => {
            const today = new Date();
            console.log(today);
            document.querySelector(DOMs.date).innerHTML = `Today: ${today.getDate()}-${
                today.getMonth() + 1
            }-${today.getFullYear()}`;
        },
        displayFinished: (element) => {
            element.classList.toggle("finished");
        },
        deleteItem: (element) => {
            element.parentElement.removeChild(element);
        },
    };
})();

const MainController = (function (task, UI) {
    const DOMs = UI.getDOM();

    const updateStatus = () => {
        task.updateState();
        const status = task.getState();
        UI.displayState(status);
    };
    const addItemHandler = () => {
        let data, newItem;
        data = UI.getData();
        if (!data.task) {
            document.querySelector(DOMs.input).focus();
        } else {
            newItem = task.addInputData(data);
            UI.showItem(newItem);

            UI.clearInput();

            updateStatus();
        }
    };
    const finishedItemHandler = (parent, id) => {
        UI.displayFinished(parent);
        task.updateFinished(id);
        updateStatus();
    };
    const setEventListener = () => {
        document.querySelector(DOMs.btn).addEventListener("click", (e) => {
            e.preventDefault();
            addItemHandler();
        });

        document.querySelector(DOMs.list).addEventListener("click", (e) => {
            const element = e.target.closest("button");
            const parent = element.parentElement.parentElement;
            const type = element.dataset.type;
            const id = element.closest("li").dataset.id;

            if (type === "finished") {
                finishedItemHandler(parent, id);
            } else if (type === "deleted") {
                task.deleteItem(id);
                UI.deleteItem(parent);
                updateStatus();
            }
        });
        // window.addEventListener("keypress", (e) => {
        //     if (e.keyCode === 13 || e.which === 13) {
        //         addItemHandler();
        //     }
        // });
    };
    const setData = () => {
        task.restoreData();
        const status = task.getState();
        UI.displayState(status);
        status.goals.forEach((goal) => {
            UI.showItem(goal);
        });
        updateStatus();
    };
    return {
        init: () => {
            UI.displayState({
                tot: 0,
                finished: 0,
                percentage: 0,
            });
            setEventListener();
            UI.displayDate();
            setData();
        },
    };
})(TaskController, UIController);

MainController.init();
