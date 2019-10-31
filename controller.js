(function (app) {
    app.controller = {
        init: init
    };

    function init() {
        // filter=   0:all   1:active   2:completed
        app.model = { todos: [], filter: 0 };
        app.view.init(addTodo, completeTodo, filterTodos);
    }

    function addTodo(value) {
        if (!value) return;
        app.model.todos.push({ title: value });
        render();
    }

    function completeTodo(todo) {
        todo.completed = !todo.completed;
        render();
    }

    function filterTodos(filter) {
        app.model.filter = +filter;
        render();
    }

    // ==================================================================

    function render() {
        var filter = app.model.filter,
            filteredTodos = app.model.todos.filter(function (t) {
                if (filter === 0) return true;
                return filter === 1 ? !t.completed : t.completed
            });
        app.view.render(filteredTodos);
    }

}(app = { model: {} }));