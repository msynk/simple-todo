(function (app) {
    app.view = {
        init: init,
        render: render
    };

    var _elements, _listeners = {};

    function init(listeners) {
        _listeners.add = listeners[0];
        _listeners.complete = listeners[1];
        _listeners.filter = listeners[2];

        var el = document.getElementById.bind(document);
        _elements = {
            form: el('todoForm'),
            input: el('todoInput'),
            list: el('todoList'),
            filters: el('filterButtons')
        };

        _elements.form.addEventListener('submit', submitForm);
        _elements.filters.addEventListener('click', filter);

        _elements.input.focus();
    }

    function render(todos) {
        _elements.list.innerHTML = '';
        (todos || []).forEach(function (t) {
            _elements.list.prepend(createLi(t));
        });
    }

    // ====================================================================

    function submitForm(e) {
        e.preventDefault();
        var value = _elements.input.value;
        if (!value) return;

        _listeners.add(value);
        _elements.input.value = '';
        _elements.input.focus();
    }

    function filter(e) {
        _listeners.filter(e.target.getAttribute('value'));
    }

    function createLi(todo) {
        var cr = document.createElement.bind(document),
            li = cr('li'),
            titleSpan = cr('span'),
            completeButton = cr('button');

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