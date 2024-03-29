// BUDGET CONTROLLER
var budgetController = (function(){

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // var allExpenses = [];
    // var allIncomes = [];
    // var totalExpenses = 0;

    var calculateTotal = function(type){
        var sum = 0;

        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return{
        addItem: function(type, des, val){
            var newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0 && undefined !== data.allItems[type]) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // push intp the new data structure
            data.allItems[type].push(newItem)

            // return new element
            return newItem;
        },

        calculateBudget: function(){

            // Calculate total income & expenses
            

            // Calc budget: income - epxpensess

            // Calc percentage of income spent

        },

        testing: function(){
            console.log(data);
        },
    }

})();

// UI CONTROLLER
var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    };

     var hello;
     hello = "Hello world";
     console.log(hello);
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type){
            var html, newHtml, element;

            //  create html string with placehlder text
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            };

            // replace placeholder text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // insert html into dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml); 
        },

        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
        
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });        

            fieldsArr[0].focus();
        },

        getDOMstrings: function() {
            return DOMstrings;
        }

    };

})();

// GLOBAL APP CONTROLLER66
var controller = (function(budgetCtrl, UICtrl){

    setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
                if(event.keyCode === 13 || event.which === 13){ // .which is for older browsers
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function(){

        // 1. Calculate budget

        // 2. Return budget

        // 3. Display budget

    };

    var ctrlAddItem = function(){
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. Add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add item to UI
            UICtrl.addListItem(newItem, input.type);    

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate & update budget
            updateBudget();
        }
    };

    return {
        init: function(){
            console.log('App has started!');
            setupEventListeners();  
        }
    }

})(budgetController, UIController);

controller.init();