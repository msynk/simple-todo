(function (app) {
    app.view = {
        init: init,
        render: render
    };

    var _elements = {},
        _listeners = {};

    function init(addTodo, completeTodo, filterTodos) {
        _listeners.add = addTodo;
        _listeners.complete = completeTodo;
        _listeners.filter = filterTodos;

        var el = document.getElementById.bind(document);
        ['todoForm', 'todoInput', 'todoList', 'filterButtons'].forEach(function (e) {
            _elements[e] = el(e);
        });
        _elements.todoForm.addEventListener('submit', submitForm);
        _elements.filterButtons.addEventListener('click', filter);
        _elements.todoInput.focus();
    }

    function render(todos) {
        _elements.todoList.innerHTML = '';
        (todos || []).forEach(function (t) {
            _elements.todoList.prepend(createLi(t));
        });
    }

    // ====================================================================

    function submitForm(e) {
        e.preventDefault();
        var value = _elements.todoInput.value;
        if (!value) return;

        _listeners.add(value);
        _elements.todoInput.value = '';
        _elements.todoInput.focus();
    }

    function filter(e) {
        _listeners.filter(e.target.getAttribute('value'));
    }

    function createLi(todo) {
        var ce = document.createElement.bind(document),
            li = ce('li'),
            titleSpan = ce('span'),
            completeButton = ce('button');

        li.append(titleSpan);
        li.append(completeButton);
        li.className = 'todo-li ' + (todo.completed ? 'completed' : '');

        titleSpan.className = 'todo-title';
        titleSpan.textContent = todo.title;

        completeButton.className = 'todo-btn-complete';
        completeButton.textContent = todo.completed ? 'undo' : 'do';
        completeButton.addEventListener('click', function (e) {
            _listeners.complete(todo);
        });

        return li;
    }

}(app));