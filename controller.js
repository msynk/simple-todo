(function (app) {
    app.controller = {
        init: init
    };

    var _model;
    function init() {
        _model = { todos: [], filter: 0 };
        // filter=   0:all   1:active   2:completed
        app.view.init([addTodo, completeTodo, filterTodos]);
    }

    function addTodo(value) {
        if (!value) return;
        _model.todos.push({ title: value });
        render();
    }

    function completeTodo(todo) {
        todo.completed = !todo.completed;
        render();
    }

    function filterTodos(filter) {
        _model.filter = +filter;
        render();
    }

    // ==================================================================

    function render() {
        var filter = _model.filter,
            filteredTodos = _model.todos.filter(function (t) {
                if (filter === 0) return true;
                return filter === 1 ? !t.completed : t.completed
            });
        app.view.render(filteredTodos);
    }

}(app));